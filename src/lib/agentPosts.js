import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

const councilDir = path.join(process.cwd(), "src/content/agents/council");

export function getAllCouncilPosts() {
    if (!fs.existsSync(councilDir)) return [];
    return fs
        .readdirSync(councilDir)
        .filter((name) => name.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const { data } = matter(fs.readFileSync(path.join(councilDir, fileName), "utf8"));
            return { slug, ...data };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllCouncilSlugs() {
    if (!fs.existsSync(councilDir)) return [];
    return fs
        .readdirSync(councilDir)
        .filter((n) => n.endsWith(".md"))
        .map((fileName) => ({ params: { slug: fileName.replace(/\.md$/, "") } }));
}

export async function getCouncilPostBySlug(slug) {
    const fullPath = path.join(councilDir, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const processedContent = await remark()
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);
    return { slug, contentHtml: processedContent.toString(), ...data };
}
