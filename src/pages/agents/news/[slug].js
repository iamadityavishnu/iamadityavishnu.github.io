import Link from "next/link";
import Head from "next/head";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { getAllAgentNewsSlugs, getAgentPostBySlug } from "@/lib/agentPosts";

const SITE_URL = "https://iamadityavishnu.github.io";

export async function getStaticPaths() {
    const paths = getAllAgentNewsSlugs();
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const post = await getAgentPostBySlug("news", params.slug);
    return { props: { post } };
}

function getReadingTime(contentHtml) {
    const text = contentHtml.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 238));
}

export default function AgentNewsPost({ post }) {
    const postUrl = `${SITE_URL}/agents/news/${post.slug}`;
    const postTitle = `${post.title} — Aditya Vishnu`;
    const readingTime = getReadingTime(post.contentHtml);

    return (
        <Layout>
            <Head>
                <title>{postTitle}</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={postUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={postUrl} />
                <meta property="og:title" content={postTitle} />
                <meta property="og:description" content={post.excerpt} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={postTitle} />
                <meta name="twitter:description" content={post.excerpt} />
            </Head>
            <main className="max-w-2xl mx-auto px-6 py-20">
                <Link
                    href="/agents"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest mb-12"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Agents
                </Link>

                <article>
                    <header className="mb-10">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags?.map((tag, i) => (
                                <span
                                    key={tag}
                                    className="text-xs font-bold uppercase tracking-widest text-primary"
                                >
                                    {tag}{i < post.tags.length - 1 && " /"}
                                </span>
                            ))}
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">
                                AI Generated
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 leading-snug">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                            <span>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            <span>·</span>
                            <span>{readingTime} min read</span>
                        </div>
                    </header>

                    <hr className="border-slate-200 dark:border-slate-800 mb-10" />

                    <div
                        className="prose prose-lg prose-slate dark:prose-invert max-w-none
                            [&]:font-[system-ui,_-apple-system,_sans-serif]
                            prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:font-display
                            prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-4
                            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3
                            prose-p:leading-[1.85] prose-p:text-slate-700 dark:prose-p:text-slate-300
                            prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:leading-[1.85]
                            prose-strong:font-semibold prose-strong:text-slate-900 dark:prose-strong:text-slate-100
                            prose-code:text-primary prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-slate-900 prose-pre:text-slate-200 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-none prose-pre:overflow-x-auto
                            [&_pre_code]:text-slate-200 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                            prose-blockquote:border-primary prose-blockquote:text-slate-500 dark:prose-blockquote:text-slate-400 prose-blockquote:font-normal prose-blockquote:not-italic"
                        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />
                </article>
            </main>
        </Layout>
    );
}
