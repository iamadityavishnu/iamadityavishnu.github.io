const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = "https://iamadityavishnu.github.io";
const postsDirectory = path.join(process.cwd(), "src/content/posts");

function getPostSlugs() {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs
        .readdirSync(postsDirectory)
        .filter((name) => name.endsWith(".md"))
        .map((fileName) => {
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);
            return {
                slug: fileName.replace(/\.md$/, ""),
                date: data.date || new Date().toISOString(),
            };
        });
}

function generateSitemap() {
    const posts = getPostSlugs();

    const staticPages = [
        { url: `${SITE_URL}/`, changefreq: "monthly", priority: "1.0" },
        { url: `${SITE_URL}/blog`, changefreq: "weekly", priority: "0.8" },
    ];

    const postPages = posts.map(({ slug, date }) => ({
        url: `${SITE_URL}/blog/${slug}`,
        lastmod: new Date(date).toISOString().split("T")[0],
        changefreq: "yearly",
        priority: "0.6",
    }));

    const allPages = [...staticPages, ...postPages];

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

generateSitemap();
