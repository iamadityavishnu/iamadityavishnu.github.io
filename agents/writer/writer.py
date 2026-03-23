"""
Writer Agent — runs weekly after curator.
Takes curated items and writes full markdown posts in the site's format.
"""

import json
import os
import re
from datetime import datetime, timezone

from langchain.tools import tool
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from config import OPENAI_API_KEY, OPENAI_MODEL

DISCLAIMER = """> **Disclaimer:** This post was researched and written by an AI agent as part of an automated weekly digest. \
All sources are linked. Content has been reviewed for accuracy but may not reflect the author's personal views. \
[Source]({source_url})
"""

FRONTMATTER = """\
---
title: {title}
date: "{date}"
excerpt: "{excerpt}"
tags: {tags}
source_url: "{source_url}"
generated: true
---

"""


def _slugify(title: str) -> str:
    slug = title.lower()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug[:80]


def _build_post(item: dict, post_type: str, body: str) -> dict:
    title = item["title"]
    date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    excerpt = item["summary"][:150].replace('"', "'")
    tags = '["AI", "Agentic AI", "Tech"]' if post_type == "blog" else '["Tech News", "AI", "Weekly Digest"]'
    source_url = item["url"]

    frontmatter = FRONTMATTER.format(
        title=json.dumps(title),
        date=date,
        excerpt=excerpt,
        tags=tags,
        source_url=source_url,
    )
    disclaimer = DISCLAIMER.format(source_url=source_url)
    markdown = frontmatter + disclaimer + "\n" + body
    return {"slug": _slugify(title), "markdown": markdown, "type": post_type}


@tool
def write_blog_post(item_json: str) -> str:
    """
    Given a curated blog item as JSON, write a full markdown blog post in the site format.
    Returns JSON with slug, markdown, and type fields.
    item_json fields: title, url, summary, source, published
    """
    item = json.loads(item_json)
    llm = ChatOpenAI(model=OPENAI_MODEL, api_key=OPENAI_API_KEY)

    response = llm.invoke(
        f"You are a tech writer. Write a detailed, insightful blog post (600-900 words) about the following article.\n"
        f"Title: {item['title']}\n"
        f"Source: {item['source']}\n"
        f"Summary: {item['summary']}\n"
        f"URL: {item['url']}\n\n"
        f"Requirements:\n"
        f"- Start directly with the content (no frontmatter, no title heading)\n"
        f"- Use markdown formatting with ## headings and bullet points\n"
        f"- Be analytical and insightful, not just a rewrite of the summary\n"
        f"- Discuss implications for developers and the AI/tech industry\n"
        f"- End with a '## Key Takeaways' section\n"
        f"- Do NOT include any disclaimer — that will be added separately\n"
    )
    post = _build_post(item, "blog", response.content)
    return json.dumps(post)


@tool
def write_news_post(item_json: str) -> str:
    """
    Given a curated news item as JSON, write a concise news summary post in the site format.
    Returns JSON with slug, markdown, and type fields.
    item_json fields: title, url, summary, source, published
    """
    item = json.loads(item_json)
    llm = ChatOpenAI(model=OPENAI_MODEL, api_key=OPENAI_API_KEY)

    response = llm.invoke(
        f"You are a tech journalist. Write a concise, clear news post (300-500 words) about the following.\n"
        f"Title: {item['title']}\n"
        f"Source: {item['source']}\n"
        f"Summary: {item['summary']}\n"
        f"URL: {item['url']}\n\n"
        f"Requirements:\n"
        f"- Start directly with a brief intro paragraph\n"
        f"- Use markdown formatting\n"
        f"- Include a '## What This Means' section with practical implications\n"
        f"- Keep it factual and neutral\n"
        f"- Do NOT include any disclaimer — that will be added separately\n"
    )
    post = _build_post(item, "news", response.content)
    return json.dumps(post)


def run_writer(curated: dict) -> list[dict]:
    """
    Takes curated dict with 'blog' and 'news' lists.
    Returns list of {slug, markdown, type} dicts ready for publishing.
    """
    llm = ChatOpenAI(model=OPENAI_MODEL, api_key=OPENAI_API_KEY)
    tools = [write_blog_post, write_news_post]

    system_prompt = (
        "You are a writing coordinator. For each item provided:\n"
        "- Use write_blog_post for blog items\n"
        "- Use write_news_post for news items\n"
        "Call each tool once per item. Do not skip any."
    )

    agent = create_agent(llm, tools, system_prompt=system_prompt)

    blog_items = curated.get("blog", [])
    news_items = curated.get("news", [])

    input_text = "Write posts for the following items:\n\n"
    if blog_items:
        input_text += f"BLOG ITEMS:\n{json.dumps(blog_items, indent=2)}\n\n"
    if news_items:
        input_text += f"NEWS ITEMS:\n{json.dumps(news_items, indent=2)}\n\n"

    result = agent.invoke({"messages": [("human", input_text)]})

    # Extract written posts from tool message contents
    written = []
    for msg in result.get("messages", []):
        if hasattr(msg, "type") and msg.type == "tool":
            try:
                written.append(json.loads(msg.content))
            except Exception:
                pass

    print(f"\n[writer] Wrote {len(written)} post(s).")
    return written


if __name__ == "__main__":
    sample = {
        "blog": [{
            "title": "The Rise of Agentic AI",
            "url": "https://example.com/agentic-ai",
            "summary": "Agentic AI systems are becoming more capable of autonomously completing complex tasks.",
            "source": "Example Blog",
            "published": "2026-03-24",
        }],
        "news": [],
    }
    posts = run_writer(sample)
    for p in posts:
        print(f"\n--- {p['type']}: {p['slug']} ---\n{p['markdown'][:200]}...")
