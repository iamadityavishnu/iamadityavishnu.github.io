import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export async function getStaticPaths() {
    const paths = getAllPostSlugs();
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const post = await getPostBySlug(params.slug);
    return { props: { post } };
}

export default function Post({ post }) {
    return (
        <Layout>
            <main className="max-w-3xl mx-auto px-6 py-20">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest mb-12"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Link>

                <article>
                    <header className="mb-12">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, i) => (
                                <span
                                    key={tag}
                                    className="text-xs font-bold uppercase tracking-widest text-primary"
                                >
                                    {tag}
                                    {i < post.tags.length - 1 && " /"}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </header>

                    <div
                        className="prose prose-lg prose-slate dark:prose-invert max-w-none
                            prose-headings:font-extrabold prose-headings:tracking-tight
                            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                            prose-p:font-light prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400
                            prose-li:font-light prose-li:text-slate-600 dark:prose-li:text-slate-400
                            prose-strong:font-bold prose-strong:text-slate-900 dark:prose-strong:text-slate-100
                            prose-code:text-primary prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-slate-900 prose-pre:text-slate-200 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-none
                            [&_pre_code]:text-slate-200 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{
                            __html: post.contentHtml,
                        }}
                    />
                </article>
            </main>
        </Layout>
    );
}
