const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = "https://iamadityavishnu.github.io";
const postsDirectory = path.join(process.cwd(), "src/content/posts");
const councilDirectory = path.join(process.cwd(), "src/content/agents/council");

function getSlugsFromDir(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((name) => name.endsWith(".md"))
        .map((fileName) => {
            const fullPath = path.join(dir, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);
            return {
                slug: fileName.replace(/\.md$/, ""),
                title: data.title || fileName.replace(/\.md$/, ""),
                date: data.date || new Date().toISOString(),
            };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function generateSitemap() {
    const posts = getSlugsFromDir(postsDirectory);
    const councilEpisodes = getSlugsFromDir(councilDirectory);

    const staticPages = [
        { url: `${SITE_URL}/`, changefreq: "monthly", priority: "1.0" },
        { url: `${SITE_URL}/blog`, changefreq: "weekly", priority: "0.8" },
        { url: `${SITE_URL}/agents`, changefreq: "weekly", priority: "0.8" },
    ];

    const postPages = posts.map(({ slug, date }) => ({
        url: `${SITE_URL}/blog/${slug}`,
        lastmod: new Date(date).toISOString().split("T")[0],
        changefreq: "yearly",
        priority: "0.6",
    }));

    const councilPages = councilEpisodes.map(({ slug, date }) => ({
        url: `${SITE_URL}/agents/council/${slug}`,
        lastmod: new Date(date).toISOString().split("T")[0],
        changefreq: "yearly",
        priority: "0.6",
    }));

    const allPages = [...staticPages, ...postPages, ...councilPages];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
    .map(
        ({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("\n")}
</urlset>
`;

    fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), xml);
    console.log(`Sitemap generated with ${allPages.length} URL(s).`);
}

function generateLlmsTxt() {
    const posts = getSlugsFromDir(postsDirectory);
    const councilEpisodes = getSlugsFromDir(councilDirectory);

    const blogLines = posts
        .map(({ slug, title }) => `- [${title}](${SITE_URL}/blog/${slug})`)
        .join("\n");

    const councilLines = councilEpisodes
        .map(({ slug, title }) => `- [${title}](${SITE_URL}/agents/council/${slug})`)
        .join("\n");

    const content = `# Aditya Vishnu

> Full-stack AI Engineer building intelligent systems at the intersection of AI, IoT, and web technologies.

Aditya Vishnu is a Software Engineer specialising in generative AI, agentic pipelines, and full-stack web development. He currently works at Thinking Code Technologies building AI-powered tools for the insurance domain, RAG-based agentic systems using MCP, and prompt-to-video generation engines.

## Pages

- [Home](${SITE_URL}/): Portfolio and professional profile
- [Blog](${SITE_URL}/blog): Technical writing on AI, software engineering, and emerging technology
- [The Council](${SITE_URL}/agents): Weekly AI panel — five personas debate the most significant tech story of the week

## Blog

${blogLines || "- No posts yet."}

## The Council

The Council is an autonomous AI panel that debates the week's most significant tech story. Five AI personas — Nexus (moderator), Atlas (engineer), Meridian (investor), Horizon (futurist), and Anchor (whistleblower) — discuss implications, risks, and opportunities in a structured panel format. All views are AI-generated and do not represent the author's opinions.

${councilLines || "- No episodes yet."}

## Contact

- Email: reachadityavishnu@gmail.com
- GitHub: https://github.com/iamadityavishnu
- LinkedIn: https://linkedin.com/in/aditya-vishnu
`;

    fs.writeFileSync(path.join(process.cwd(), "public/llms.txt"), content);
    console.log(`llms.txt generated with ${posts.length} blog post(s) and ${councilEpisodes.length} council episode(s).`);
}

generateSitemap();
generateLlmsTxt();
