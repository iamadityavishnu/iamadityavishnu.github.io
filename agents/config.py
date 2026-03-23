import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Paths (relative to project root, resolved at runtime)
CACHE_FILE = os.path.join(os.path.dirname(__file__), "cache", "news_cache.json")
BLOG_OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "agents", "blog")
NEWS_OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "agents", "news")

# RSS feeds for daily news fetching
NEWS_FEEDS = [
    "https://techcrunch.com/feed/",
    "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    "https://www.technologyreview.com/feed/",
]

# Curated AI/agentic blog feeds for weekly curation
BLOG_FEEDS = [
    "https://simonwillison.net/atom/everything/",
    "https://www.latent.space/feed",
    "https://www.interconnects.ai/feed",
    "https://lilianweng.github.io/index.xml",
]

# Max items to pull per feed per run
MAX_ITEMS_PER_FEED = 5

# Only keep items published within this many days
MAX_ITEM_AGE_DAYS = 7

# Max total items to keep in cache per category (oldest dropped first)
MAX_CACHE_NEWS = 20
MAX_CACHE_BLOGS = 15

# OpenAI models — matched to task complexity
OPENAI_MODEL_MINI = "gpt-4o-mini"   # fetcher, publisher (tool dispatch only)
OPENAI_MODEL = "gpt-4o"             # curator (judgment), writer (quality)
