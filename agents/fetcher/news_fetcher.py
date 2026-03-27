"""
News Fetcher Agent — runs daily.
Fetches items from RSS feeds and stores them in the cache.
"""

import json
import os
import hashlib
from datetime import datetime, timezone, timedelta

import feedparser
from filelock import FileLock
from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain_core.callbacks import BaseCallbackHandler

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from config import OPENAI_API_KEY, CACHE_FILE, NEWS_FEEDS, BLOG_FEEDS, MAX_ITEMS_PER_FEED, MAX_CACHE_NEWS, MAX_CACHE_BLOGS, MAX_ITEM_AGE_DAYS, OPENAI_MODEL_MINI


class VerboseCallback(BaseCallbackHandler):
    def on_chat_model_start(self, serialized, messages, **kwargs):
        print("  [agent] Calling LLM...", flush=True)

    def on_llm_end(self, response, **kwargs):
        print("  [agent] LLM responded.", flush=True)

    def on_tool_start(self, serialized, input_str, **kwargs):
        name = serialized.get("name", "?")
        print(f"  [tool]  → {name}({input_str[:80]}...)" if len(input_str) > 80 else f"  [tool]  → {name}({input_str})", flush=True)

    def on_tool_end(self, output, **kwargs):
        preview = str(output)[:100]
        print(f"  [tool]  ← {preview}{'...' if len(str(output)) > 100 else ''}", flush=True)


CACHE_LOCK = FileLock(CACHE_FILE + ".lock")


def _load_cache() -> dict:
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"news": [], "blogs": []}


def _save_cache(cache: dict):
    os.makedirs(os.path.dirname(CACHE_FILE), exist_ok=True)
    tmp = CACHE_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)
    os.replace(tmp, CACHE_FILE)


def _item_id(url: str) -> str:
    return hashlib.md5(url.encode()).hexdigest()


def _fetch_and_cache(feed_urls: list[str], category: str) -> str:
    """Fetch RSS feeds and save directly to cache — no large JSON passed through LLM."""
    items = []
    cutoff = datetime.now(timezone.utc) - timedelta(days=MAX_ITEM_AGE_DAYS)
    for url in feed_urls:
        print(f"    [rss] Fetching {url} ...", flush=True)
        try:
            feed = feedparser.parse(url)
            count = 0
            for entry in feed.entries[:MAX_ITEMS_PER_FEED]:
                # Parse published date; skip if older than cutoff
                published_str = entry.get("published", "")
                try:
                    published_dt = datetime(*entry.published_parsed[:6], tzinfo=timezone.utc) if entry.get("published_parsed") else None
                except Exception:
                    published_dt = None
                if published_dt and published_dt < cutoff:
                    continue
                items.append({
                    "id": _item_id(entry.get("link", entry.get("id", ""))),
                    "title": entry.get("title", ""),
                    "url": entry.get("link", entry.get("id", "")),
                    "summary": entry.get("summary", entry.get("description", ""))[:500],
                    "published": published_str or datetime.now(timezone.utc).isoformat(),
                    "source": feed.feed.get("title", url),
                    "fetched_at": datetime.now(timezone.utc).isoformat(),
                })
                count += 1
            print(f"    [rss] Got {count} recent items from {feed.feed.get('title', url)}", flush=True)
        except Exception as e:
            print(f"    [rss] FAILED {url}: {e}", flush=True)

    with CACHE_LOCK:
        cache = _load_cache()
        # Purge expired items already in the cache
        from email.utils import parsedate_to_datetime
        def _parse_published(s):
            try:
                return parsedate_to_datetime(s)
            except Exception:
                try:
                    return datetime.fromisoformat(s)
                except Exception:
                    return None
        cache[category] = [
            item for item in cache.get(category, [])
            if _parse_published(item.get("published", "")) and _parse_published(item.get("published", "")) >= cutoff
        ]
        existing_ids = {item["id"] for item in cache[category]}
        new_items = [i for i in items if i["id"] not in existing_ids]
        cache[category].extend(new_items)
        limit = MAX_CACHE_NEWS if category == "news" else MAX_CACHE_BLOGS
        cache[category] = cache[category][-limit:]
        _save_cache(cache)
    msg = f"Fetched {len(items)} items, added {len(new_items)} new to '{category}' cache."
    print(f"  {msg}", flush=True)
    return msg


@tool
def fetch_and_cache_news(feed_urls: list[str]) -> str:
    """Fetch items from news RSS feed URLs and save them to the 'news' cache."""
    return _fetch_and_cache(feed_urls, "news")


@tool
def fetch_and_cache_blogs(feed_urls: list[str]) -> str:
    """Fetch items from blog RSS feed URLs and save them to the 'blogs' cache."""
    return _fetch_and_cache(feed_urls, "blogs")


def run_fetcher():
    print("[fetcher] Initialising LLM...", flush=True)
    llm = ChatOpenAI(model=OPENAI_MODEL_MINI, api_key=OPENAI_API_KEY)

    tools = [fetch_and_cache_news, fetch_and_cache_blogs]
    callbacks = [VerboseCallback()]

    system_prompt = (
        "You are a news fetcher agent. Your job is to:\n"
        "1. Call fetch_and_cache_news with the provided news feed URLs.\n"
        "2. Call fetch_and_cache_blogs with the provided blog feed URLs.\n"
        "Both tools fetch and save in one step. Complete both calls."
    )

    print("[fetcher] Building agent...", flush=True)
    agent = create_agent(llm, tools, system_prompt=system_prompt)

    print("[fetcher] Invoking agent (this may take a moment)...", flush=True)
    result = agent.invoke(
        {
            "messages": [(
                "human",
                f"Fetch and cache today's tech news and blog posts.\n"
                f"News feeds: {NEWS_FEEDS}\n"
                f"Blog feeds: {BLOG_FEEDS}"
            )]
        },
        config={"callbacks": callbacks},
    )

    last_message = result["messages"][-1]
    print("\n[fetcher] Done:", last_message.content)


if __name__ == "__main__":
    run_fetcher()
