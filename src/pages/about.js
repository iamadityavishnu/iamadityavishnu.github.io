import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import Layout from "@/components/Layout";
import data from "@/data/portfolio.json";

const SITE_URL = "https://iamadityavishnu.github.io";
const pageTitle = "About — Aditya Vishnu";
const pageDescription =
    "Aditya Vishnu is a Full-stack AI Engineer specialising in generative AI, agentic pipelines, and full-stack web development. Based in Kerala, India.";
const pageUrl = `${SITE_URL}/about`;

export default function About() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: "About Aditya Vishnu",
        url: pageUrl,
        mainEntity: {
            "@type": "Person",
            name: "Aditya Vishnu",
            url: SITE_URL,
            image: `${SITE_URL}/profile.jpg`,
            jobTitle: "Full-stack AI Engineer",
            description: pageDescription,
            email: data.profile.email,
            sameAs: [
                data.profile.social.github,
                data.profile.social.linkedin,
                SITE_URL,
            ],
            knowsAbout: [
                "Generative AI",
                "Agentic AI",
                "Retrieval-Augmented Generation",
                "Large Language Models",
                "IoT",
                "Deep Learning",
                "Full-stack Web Development",
                "Python",
                "Next.js",
            ],
            worksFor: {
                "@type": "Organization",
                name: "Thinking Code Technologies Pvt. Ltd.",
            },
            alumniOf: [
                {
                    "@type": "EducationalOrganization",
                    name: "Digital University Kerala",
                },
                {
                    "@type": "EducationalOrganization",
                    name: "APJ Abdul Kalam Technological University",
                },
            ],
        },
    };

    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="author" content="Aditya Vishnu" />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:type" content="profile" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={`${SITE_URL}/profile.jpg`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={`${SITE_URL}/profile.jpg`} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>
            <main className="max-w-2xl mx-auto px-6 py-20">

                {/* Hero */}
                <section className="mb-20">
                    <div className="flex items-center gap-8 mb-8">
                        <div className="shrink-0 border border-slate-200 dark:border-slate-800 overflow-hidden w-20 md:w-28">
                            <Image
                                src="/profile.jpg"
                                alt="Aditya Vishnu"
                                width={192}
                                height={256}
                                className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                priority
                            />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-none mb-2">
                                Aditya <span className="text-primary">Vishnu.</span>
                            </h1>
                            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                Full-stack AI Engineer
                            </p>
                        </div>
                    </div>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-6">
                        I build intelligent systems at the intersection of AI, IoT, and web technologies.
                        My work spans generative AI pipelines, agentic reasoning systems, and full-stack
                        applications — with a focus on making complex AI practical and usable.
                    </p>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                        Currently at{" "}
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                            Thinking Code Technologies
                        </span>
                        , building AI-powered tools for the insurance domain, RAG-based agentic systems
                        using MCP, and prompt-to-video generation engines.
                    </p>
                </section>

                {/* What I work on */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">01</span>
                        <h2 className="text-2xl font-bold tracking-tight">What I work on</h2>
                        <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="space-y-6">
                        {[
                            {
                                title: "Generative AI & Agentic Pipelines",
                                body: "Designing multi-step agentic systems that use LLMs to reason, plan, and act — including RAG pipelines, tool-augmented agents, and MCP-based orchestration.",
                            },
                            {
                                title: "Full-stack Web Development",
                                body: "Building production web applications with Next.js, React, FastAPI, and Supabase. Comfortable across the stack from database design to deployment.",
                            },
                            {
                                title: "IoT & Embedded AI",
                                body: "Shipping TinyML and IoT systems that bring intelligence to the edge — from real-time monitoring hardware to deep learning models for physical activity recognition.",
                            },
                        ].map(({ title, body }) => (
                            <div key={title} className="border-l-2 border-primary pl-6">
                                <h3 className="font-extrabold text-base mb-1">{title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed text-sm">
                                    {body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">02</span>
                        <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
                        <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="space-y-8">
                        {data.skills.map((skill) => (
                            <div key={skill.category} className="editorial-grid gap-8 md:gap-12 items-start">
                                <div className="pt-1">
                                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                        {skill.category}
                                    </span>
                                </div>
                                <div className="editorial-line w-px bg-slate-200 dark:bg-slate-800 self-stretch" />
                                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-light">
                                    {skill.items}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">03</span>
                        <h2 className="text-2xl font-bold tracking-tight">Education</h2>
                        <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="space-y-12">
                        {data.education.map((edu) => (
                            <div key={`${edu.degree}-${edu.institution}`} className="editorial-grid gap-8 md:gap-12 items-start">
                                <div className="pt-2">
                                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                        {edu.period}
                                    </span>
                                </div>
                                <div className="editorial-line w-px bg-slate-200 dark:bg-slate-800 self-stretch" />
                                <div>
                                    <h3 className="text-xl font-extrabold mb-1">{edu.degree}</h3>
                                    <p className="text-base text-primary font-medium mb-3">{edu.institution}</p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-light leading-relaxed">
                                        {edu.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="pt-16 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">04</span>
                        <h2 className="text-2xl font-bold tracking-tight">Get in touch</h2>
                        <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-8">
                        Open to interesting projects, collaborations, and conversations about AI.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href={`mailto:${data.profile.email}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-all uppercase tracking-widest text-sm"
                        >
                            Email me
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                        <a
                            href={data.profile.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 font-bold hover:border-primary hover:text-primary transition-all uppercase tracking-widest text-sm"
                        >
                            <SiGithub size={14} />
                            GitHub
                        </a>
                        <a
                            href={data.profile.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 font-bold hover:border-primary hover:text-primary transition-all uppercase tracking-widest text-sm"
                        >
                            <SiLinkedin size={14} />
                            LinkedIn
                        </a>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
