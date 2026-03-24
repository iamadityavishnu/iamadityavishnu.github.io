"""
Publisher — runs weekly after The Council.
Saves the council episode markdown to the correct content directory.
No LLM needed — just writes files directly.
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from config import COUNCIL_OUTPUT_DIR


def run_publisher(posts: list[dict]):
    if not posts:
        print("[publisher] No posts to publish.")
        return

    for post in posts:
        slug = post["slug"]
        markdown = post["markdown"]

        os.makedirs(COUNCIL_OUTPUT_DIR, exist_ok=True)
        file_path = os.path.join(COUNCIL_OUTPUT_DIR, f"{slug}.md")

        if os.path.exists(file_path):
            print(f"[publisher] Skipped (already exists): {file_path}")
            continue

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(markdown)
        print(f"[publisher] Published: {file_path}")

    print("[publisher] Done.")
