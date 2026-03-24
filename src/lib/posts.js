import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames
        .filter((name) => name.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);

            return {
                slug,
                ...data,
            };
        });

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames
        .filter((name) => name.endsWith(".md"))
        .map((fileName) => ({
            params: {
                slug: fileName.replace(/\.md$/, ""),
            },
        }));
}

export async function getPostBySlug(slug) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        ...data,
    };
}
