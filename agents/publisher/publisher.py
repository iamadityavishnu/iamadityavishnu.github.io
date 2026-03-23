"""
Publisher — runs weekly after writer.
Saves written markdown files to the correct content directories.
No LLM needed — just writes files directly.
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from config import BLOG_OUTPUT_DIR, NEWS_OUTPUT_DIR


def run_publisher(written_posts: list[dict]):
    if not written_posts:
        print("[publisher] No posts to publish.")
        return

    for post in written_posts:
        slug = post["slug"]
        markdown = post["markdown"]
        post_type = post["type"]

        output_dir = BLOG_OUTPUT_DIR if post_type == "blog" else NEWS_OUTPUT_DIR
        os.makedirs(output_dir, exist_ok=True)
        file_path = os.path.join(output_dir, f"{slug}.md")

        if os.path.exists(file_path):
            print(f"[publisher] Skipped (already exists): {file_path}")
            continue

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(markdown)
        print(f"[publisher] Published: {file_path}")

    print("[publisher] Done.")
