"""
Curator Agent — runs weekly.
Reads the cache and picks the top 1-2 blog posts and top news items
based on relevance, quality, and novelty signals.
"""

import json
import os

from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from config import OPENAI_API_KEY, CACHE_FILE, OPENAI_MODEL


@tool
def load_cached_items(category: str) -> str:
    """
    Load cached items for a given category ('news' or 'blogs').
    Returns a JSON list of items.
    """
    if not os.path.exists(CACHE_FILE):
        return json.dumps([])
    with open(CACHE_FILE, "r", encoding="utf-8") as f:
        cache = json.load(f)
    return json.dumps(cache.get(category, []))


@tool
def save_curated_selection(selection_json: str) -> str:
    """
    Save the curator's selection back to the cache under 'curated' key.
    selection_json should be a JSON object with keys 'blog' and 'news',
    each containing a list of selected items.
    """
    with open(CACHE_FILE, "r", encoding="utf-8") as f:
        cache = json.load(f)
    cache["curated"] = json.loads(selection_json)
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)
    return "Curated selection saved to cache."


def run_curator() -> dict:
    llm = ChatOpenAI(model=OPENAI_MODEL, api_key=OPENAI_API_KEY)
    tools = [load_cached_items, save_curated_selection]

    system_prompt = (
        "You are a tech content curator. Your job is to:\n"
        "1. Load all cached blog items (category: 'blogs').\n"
        "2. Load all cached news items (category: 'news').\n"
        "3. Select the TOP 1-2 blog posts that are:\n"
        "   - Most relevant to agentic AI, LLMs, or software engineering\n"
        "   - Highest quality and insightful\n"
        "   - From the past week if possible\n"
        "4. Select the TOP 3-5 news items that are:\n"
        "   - Most significant and widely discussed\n"
        "   - Related to AI, tech, or engineering\n"
        "5. Save your selection using save_curated_selection with this JSON shape:\n"
        '   {"blog": [...selected blog items...], "news": [...selected news items...]}\n'
        "Only include the full item objects from the cache, no modifications."
    )

    agent = create_agent(llm, tools, system_prompt=system_prompt)

    agent.invoke({
        "messages": [("human", "Curate the best blog posts and news items from this week's cache.")]
    })

    # Return curated selection for the writer
    with open(CACHE_FILE, "r", encoding="utf-8") as f:
        cache = json.load(f)
    curated = cache.get("curated", {"blog": [], "news": []})
    print(f"\n[curator] Selected {len(curated.get('blog', []))} blog(s) and {len(curated.get('news', []))} news item(s).")
    return curated


if __name__ == "__main__":
    run_curator()
