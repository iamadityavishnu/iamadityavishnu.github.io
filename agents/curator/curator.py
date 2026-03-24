"""
Curator Agent — runs weekly.
Reads the cache and picks the single most debatable/significant story
of the week for The Council to discuss.
"""

import json
import os

from langchain_openai import ChatOpenAI

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from config import OPENAI_API_KEY, CACHE_FILE, OPENAI_MODEL


def run_curator() -> dict:
    """
    Picks the single best story from the cache for The Council.
    Returns one item dict: {title, url, summary, source, published}.
    """
    if not os.path.exists(CACHE_FILE):
        raise FileNotFoundError("Cache not found. Run the daily fetcher first.")

    with open(CACHE_FILE, "r", encoding="utf-8") as f:
        cache = json.load(f)

    all_items = cache.get("news", []) + cache.get("blogs", [])
    if not all_items:
        raise ValueError("Cache is empty. Run the daily fetcher first.")

    print(f"[curator] {len(all_items)} items in cache ({len(cache.get('news', []))} news, {len(cache.get('blogs', []))} blogs).", flush=True)
    print("[curator] Asking LLM to pick the best story...", flush=True)

    llm = ChatOpenAI(model=OPENAI_MODEL, api_key=OPENAI_API_KEY)

    items_text = "\n\n".join(
        f"[{i}] {item['title']} ({item['source']})\n{item['summary'][:200]}"
        for i, item in enumerate(all_items)
    )

    prompt = (
        "You are a tech editor choosing the single best story for a panel debate.\n\n"
        "Pick the ONE story that is:\n"
        "- Most significant or controversial in AI, tech, or software\n"
        "- Most likely to spark genuine disagreement among experts\n"
        "- Recent and relevant\n\n"
        f"Stories:\n{items_text}\n\n"
        "Reply with ONLY the index number (e.g. 3) of the best story. Nothing else."
    )

    response = llm.invoke(prompt)
    try:
        index = int(response.content.strip())
        story = all_items[index]
    except (ValueError, IndexError):
        print("[curator] Could not parse LLM response, falling back to first item.", flush=True)
        story = all_items[0]

    print(f"[curator] Selected: \"{story['title']}\" ({story['source']})", flush=True)
    return story


if __name__ == "__main__":
    print(run_curator())
