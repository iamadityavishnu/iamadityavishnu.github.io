"""
Daily runner — fetch and cache the latest tech news and blog posts.
Run this every day: python agents/run_daily.py
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from fetcher.news_fetcher import run_fetcher

if __name__ == "__main__":
    print("=" * 50)
    print("[daily] Starting news fetch...")
    print("=" * 50)
    run_fetcher()
    print("\n[daily] Complete. Cache updated.")
