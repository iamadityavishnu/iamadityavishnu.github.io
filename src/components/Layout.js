import { Manrope } from "next/font/google";
import { Mail, Sun, Moon, Menu, X } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import data from "@/data/portfolio.json";

const manrope = Manrope({ subsets: ["latin"] });

export default function Layout({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (
            stored === "dark" ||
            (!stored &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    return (
        <div
            className={`min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300 ${manrope.className}`}
        >
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-lg">
                            {data.profile.initials}
                        </div>
                        <span className="font-extrabold tracking-tight text-xl hidden sm:inline">
                            {data.profile.firstName} {data.profile.lastName}
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest" href="/#work">Work</Link>
                        <Link className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest" href="/#projects">Projects</Link>
                        <Link className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest" href="/blog">Blog</Link>
                        <Link className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest" href="/#contact">Contact</Link>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 hover:text-primary transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    </nav>

                    {/* Mobile: dark mode toggle + hamburger */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 hover:text-primary transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 hover:text-primary transition-colors"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

            </header>

            {/* Mobile menu overlay */}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 top-20 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md">
                    <nav className="flex flex-col items-center justify-center gap-8 pt-20">
                        <Link onClick={closeMenu} className="text-2xl font-extrabold tracking-tight hover:text-primary transition-colors" href="/#work">Work</Link>
                        <Link onClick={closeMenu} className="text-2xl font-extrabold tracking-tight hover:text-primary transition-colors" href="/#projects">Projects</Link>
                        <Link onClick={closeMenu} className="text-2xl font-extrabold tracking-tight hover:text-primary transition-colors" href="/blog">Blog</Link>
                        <Link onClick={closeMenu} className="text-2xl font-extrabold tracking-tight hover:text-primary transition-colors" href="/#contact">Contact</Link>
                    </nav>
                </div>
            )}

            {children}

            <footer className="bg-white dark:bg-slate-950 py-12 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-slate-400 text-sm font-medium">
                        © {new Date().getFullYear()}{" "}
                        {data.profile.firstName} {data.profile.lastName}. Built
                        with precision.
                    </div>
                    <div className="flex gap-8">
                        <a
                            className="text-slate-500 hover:text-primary text-sm font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
                            href={data.profile.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <SiLinkedin size={14} />
                            LinkedIn
                        </a>
                        <a
                            className="text-slate-500 hover:text-primary text-sm font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
                            href={data.profile.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <SiGithub size={14} />
                            GitHub
                        </a>
                        <a
                            className="text-slate-500 hover:text-primary text-sm font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
                            href={`mailto:${data.profile.email}`}
                        >
                            <Mail className="h-3.5 w-3.5" />
                            Email
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
