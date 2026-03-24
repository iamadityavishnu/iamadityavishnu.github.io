"""
Weekly runner — curate the week's best story, run The Council, and publish.
Run this once a week: python run_weekly.py
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from curator.curator import run_curator
from council.council import run_council
from publisher.publisher import run_publisher

if __name__ == "__main__":
    print("=" * 50)
    print("[weekly] Step 1/3 — Curating this week's story...")
    print("=" * 50)
    story = run_curator()

    print("\n" + "=" * 50)
    print("[weekly] Step 2/3 — Convening The Council...")
    print("=" * 50)
    post = run_council(story)

    print("\n" + "=" * 50)
    print("[weekly] Step 3/3 — Publishing...")
    print("=" * 50)
    run_publisher([post])

    print("\n[weekly] Pipeline complete!")
    print("  Council episode → src/content/agents/council/")
    print("\nRun `npm run build` to include the new episode in the site.")
