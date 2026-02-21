import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { getAllPosts } from "@/lib/posts";

export async function getStaticProps() {
    const posts = getAllPosts();
    return { props: { posts } };
}

export default function Blog({ posts }) {
    return (
        <Layout>
            <main className="max-w-5xl mx-auto px-6 py-20">
                <section className="mb-16">
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-none">
                        Blog<span className="text-primary">.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl font-light leading-relaxed">
                        Thoughts on AI, engineering, and some stories.
                    </p>
                </section>

                <div className="space-y-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block bg-background-light dark:bg-background-dark p-8 group"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="max-w-2xl">
                                    <h2 className="text-2xl font-extrabold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag, i) => (
                                            <span
                                                key={tag}
                                                className="text-xs font-bold uppercase tracking-widest text-primary"
                                            >
                                                {tag}
                                                {i < post.tags.length - 1 &&
                                                    " /"}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:shrink-0 sm:pt-1">
                                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                        {new Date(post.date).toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            }
                                        )}
                                    </span>
                                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </Layout>
    );
}
