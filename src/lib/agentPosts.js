import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const agentContentDir = path.join(process.cwd(), "src/content/agents");

function getPostsFromDir(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((name) => name.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const { data } = matter(fs.readFileSync(path.join(dir, fileName), "utf8"));
            return { slug, ...data };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllAgentBlogPosts() {
    return getPostsFromDir(path.join(agentContentDir, "blog"));
}

export function getAllAgentNewsPosts() {
    return getPostsFromDir(path.join(agentContentDir, "news"));
}

export function getAllAgentBlogSlugs() {
    const dir = path.join(agentContentDir, "blog");
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((n) => n.endsWith(".md"))
        .map((fileName) => ({ params: { slug: fileName.replace(/\.md$/, "") } }));
}

export function getAllAgentNewsSlugs() {
    const dir = path.join(agentContentDir, "news");
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((n) => n.endsWith(".md"))
        .map((fileName) => ({ params: { slug: fileName.replace(/\.md$/, "") } }));
}

export async function getAgentPostBySlug(type, slug) {
    const dir = path.join(agentContentDir, type);
    const fullPath = path.join(dir, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html, { sanitize: false }).process(content);
    return { slug, contentHtml: processedContent.toString(), ...data };
}
