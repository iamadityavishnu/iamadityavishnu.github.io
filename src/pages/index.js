import { ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import { useState, useRef } from "react";
import data from "@/data/portfolio.json";
import Layout from "@/components/Layout";

function ExperienceCard({ role }) {
    const [expanded, setExpanded] = useState(false);
    const contentRef = useRef(null);

    return (
        <div className="editorial-grid gap-2 md:gap-12 items-start relative">
            <div className="pt-2">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                    {role.period}
                </span>
                {role.current && (
                    <div className="mt-2 text-xs font-black text-primary uppercase">
                        Current Role
                    </div>
                )}
            </div>
            <div className="editorial-line w-px bg-slate-200 dark:bg-slate-800 self-stretch"></div>
            <div>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
                    {role.title}
                </h3>
                <p className="text-lg md:text-xl text-primary font-medium mb-4">
                    {role.company}
                </p>
                {role.bullets.length > 0 && (
                    <>
                        <div
                            style={{
                                maxHeight: expanded ? contentRef.current?.scrollHeight : 0,
                                overflow: "hidden",
                                transition: "max-height 0.4s ease",
                            }}
                        >
                            <ul ref={contentRef} className="space-y-4 text-slate-600 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-4">
                                {role.bullets.map((bullet) => (
                                    <li key={bullet} className="flex items-start gap-3">
                                        <ArrowRight className="h-5 w-5 text-primary mt-1 shrink-0" />
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mt-2"
                        >
                            {expanded ? "Show less" : "Read more"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <Layout>
            <main className="max-w-5xl mx-auto px-6 py-20">
                {/* Hero Section */}
                <section className="mb-24">
                    <div className="flex items-center gap-8 md:gap-12 mb-8">
                        <div className="shrink-0 border border-slate-200 dark:border-slate-800 overflow-hidden w-24 md:w-36">
                            <Image
                                src="/profile.jpg"
                                alt={`${data.profile.firstName} ${data.profile.lastName}`}
                                width={192}
                                height={256}
                                className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                priority
                            />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none">
                            {data.profile.firstName} <br />
                            <span className="text-primary">
                                {data.profile.lastName}.
                            </span>
                        </h1>
                    </div>
                    <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl font-light leading-relaxed">
                        {data.profile.tagline}
                    </p>
                </section>

                {/* Experience Section */}
                <section id="work" className="mb-32 scroll-mt-24">
                    <div className="flex items-center gap-4 mb-16">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                            01
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Experience
                        </h2>
                        <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800"></div>
                    </div>

                    <div className="space-y-0">
                        {data.experience.map((role, i) => (
                            <div key={`${role.title}-${role.company}`}>
                                {i > 0 && (
                                    <div className="block md:hidden h-px bg-slate-200 dark:bg-slate-800 my-10" />
                                )}
                                <div className="md:mt-20">
                                    <ExperienceCard role={role} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="mb-32 scroll-mt-24">
                    <div className="flex items-center gap-4 mb-16">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                            02
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Projects
                        </h2>
                        <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                        {data.projects.map((project) => (
                            <div
                                key={project.title}
                                className="bg-background-light dark:bg-background-dark p-8 group"
                            >
                                <h3 className="text-xl font-extrabold mb-3 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-bold uppercase tracking-widest text-primary"
                                        >
                                            {tag}
                                            {i < project.tags.length - 1 &&
                                                " /"}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-6">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest"
                                    >
                                        <SiGithub size={14} />
                                        Code
                                    </a>
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills Section */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-16">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                            03
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Skills
                        </h2>
                        <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800"></div>
                    </div>

                    <div className="space-y-12">
                        {data.skills.map((skill) => (
                            <div
                                key={skill.category}
                                className="editorial-grid gap-8 md:gap-12 items-start"
                            >
                                <div className="pt-1">
                                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                        {skill.category}
                                    </span>
                                </div>
                                <div className="editorial-line w-px bg-slate-200 dark:bg-slate-800 self-stretch"></div>
                                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light">
                                    {skill.items}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-16">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                            04
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Education
                        </h2>
                        <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800"></div>
                    </div>

                    <div className="space-y-20">
                        {data.education.map((edu) => (
                            <div
                                key={`${edu.degree}-${edu.institution}`}
                                className="editorial-grid gap-8 md:gap-12 items-start relative"
                            >
                                <div className="pt-2">
                                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                        {edu.period}
                                    </span>
                                </div>
                                <div className="editorial-line w-px bg-slate-200 dark:bg-slate-800 self-stretch"></div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-lg md:text-xl text-primary font-medium mb-4">
                                        {edu.institution}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                                        {edu.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact CTA */}
                <section
                    id="contact"
                    className="py-24 border-t border-slate-200 dark:border-slate-800 text-center scroll-mt-24"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tighter">
                        Interested in working together?
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold hover:bg-primary/90 transition-all uppercase tracking-widest text-sm"
                            href={`mailto:${data.profile.email}`}
                        >
                            Get in touch
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
