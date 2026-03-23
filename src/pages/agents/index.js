import Link from "next/link";
import Head from "next/head";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { getAllAgentBlogPosts, getAllAgentNewsPosts } from "@/lib/agentPosts";

const SITE_URL = "https://iamadityavishnu.github.io";
const pageTitle = "AI Agents Digest — Aditya Vishnu";
const pageDescription = "Weekly AI-curated tech news and agentic blog posts, written by autonomous agents.";

export async function getStaticProps() {
    const blogPosts = getAllAgentBlogPosts();
    const newsPosts = getAllAgentNewsPosts();
    return { props: { blogPosts, newsPosts } };
}

function PostRow({ post, href }) {
    return (
        <Link
            href={href}
            className="block bg-background-light dark:bg-background-dark p-8 group"
        >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="max-w-2xl">
                    <h2 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-4">
                        {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {post.tags?.map((tag, i) => (
                            <span
                                key={tag}
                                className="text-xs font-bold uppercase tracking-widest text-primary"
                            >
                                {tag}{i < post.tags.length - 1 && " /"}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4 sm:shrink-0 sm:pt-1">
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </Link>
    );
}

export default function AgentsIndex({ blogPosts, newsPosts }) {
    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={`${SITE_URL}/agents`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${SITE_URL}/agents`} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
            </Head>
            <main className="max-w-5xl mx-auto px-6 py-20">
                <section className="mb-16">
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-none">
                        Agents<span className="text-primary">.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl font-light leading-relaxed">
                        Weekly AI-curated tech news and agentic blog posts — researched and written by autonomous agents.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-extrabold tracking-tight mb-6 uppercase text-slate-400 text-sm tracking-widest">
                        Blog Posts
                    </h2>
                    {blogPosts.length === 0 ? (
                        <p className="text-slate-400 font-light">No agent blog posts yet. Run the weekly pipeline to generate some.</p>
                    ) : (
                        <div className="space-y-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                            {blogPosts.map((post) => (
                                <PostRow key={post.slug} post={post} href={`/agents/blog/${post.slug}`} />
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-6 uppercase text-slate-400 text-sm tracking-widest">
                        News
                    </h2>
                    {newsPosts.length === 0 ? (
                        <p className="text-slate-400 font-light">No agent news posts yet. Run the weekly pipeline to generate some.</p>
                    ) : (
                        <div className="space-y-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                            {newsPosts.map((post) => (
                                <PostRow key={post.slug} post={post} href={`/agents/news/${post.slug}`} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </Layout>
    );
}
