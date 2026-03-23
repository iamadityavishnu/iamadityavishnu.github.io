"""
Weekly runner — curate, write, and publish the best posts from the week's cache.
Run this once a week: python agents/run_weekly.py
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from curator.curator import run_curator
from writer.writer import run_writer
from publisher.publisher import run_publisher

if __name__ == "__main__":
    print("=" * 50)
    print("[weekly] Step 1/3 — Curating best items from cache...")
    print("=" * 50)
    curated = run_curator()

    if not curated.get("blog") and not curated.get("news"):
        print("\n[weekly] No items curated. Make sure run_daily.py has been run at least once.")
        sys.exit(1)

    print("\n" + "=" * 50)
    print("[weekly] Step 2/3 — Writing posts...")
    print("=" * 50)
    written = run_writer(curated)

    if not written:
        print("\n[weekly] Writer produced no posts.")
        sys.exit(1)

    print("\n" + "=" * 50)
    print("[weekly] Step 3/3 — Publishing posts...")
    print("=" * 50)
    run_publisher(written)

    print("\n[weekly] Pipeline complete!")
    print(f"  Blog posts → src/content/agents/blog/")
    print(f"  News posts → src/content/agents/news/")
    print("\nRun `npm run build` to include new posts in the site.")
