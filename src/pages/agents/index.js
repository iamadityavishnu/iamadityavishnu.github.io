import Link from "next/link";
import Head from "next/head";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { getAllCouncilPosts } from "@/lib/agentPosts";

const SITE_URL = "https://iamadityavishnu.github.io";
const pageTitle = "The Council — Aditya Vishnu";
const pageDescription = "A panel of AI personas debate the week's most significant tech story. New episode every week.";

export async function getStaticProps() {
    const posts = getAllCouncilPosts();
    return { props: { posts } };
}

function EpisodeRow({ post }) {
    return (
        <Link
            href={`/agents/council/${post.slug}`}
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

export default function AgentsIndex({ posts }) {
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
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
            </Head>
            <main className="max-w-5xl mx-auto px-6 py-20">
                <section className="mb-16">
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-none">
                        The Council<span className="text-primary">.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl font-light leading-relaxed">
                        Five AI personas — a technologist, business analyst, futurist, skeptic, and moderator — debate the week&apos;s most significant tech story.
                    </p>
                </section>

                <section>
                    {posts.length === 0 ? (
                        <p className="text-slate-400 font-light">No episodes yet. Check back soon.</p>
                    ) : (
                        <div className="space-y-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                            {posts.map((post) => (
                                <EpisodeRow key={post.slug} post={post} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </Layout>
    );
}
