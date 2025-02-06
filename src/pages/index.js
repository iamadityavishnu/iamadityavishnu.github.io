import Image from "next/image";
import { Inter } from "next/font/google";
import { Github, Linkedin, Mail } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header/Hero Section */}
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="min-w-0 flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 sm:truncate">
                                ADITYA VISHNU
                            </h1>
                            <p className="mt-1 text-lg text-gray-600">
                                R&D Engineer | ASAP Certified Trainer
                            </p>
                            <p className="mt-1 text-gray-500">Kochi, Kerala</p>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-4">
                            <a
                                href="https://github.com/iamadityavishnu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Github className="h-5 w-5 mr-2" />
                                GitHub
                            </a>
                            <a
                                href="https://linkedin.com/in/aditya-vishnu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Linkedin className="h-5 w-5 mr-2" />
                                LinkedIn
                            </a>
                            <a
                                href="mailto:reachadityavishnu@gmail.com"
                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Mail className="h-5 w-5 mr-2" />
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Objective Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Objective
                    </h2>
                    <p className="text-gray-600">
                        Driven by a keen desire to make a meaningful impact on
                        the world, I seek an exciting opportunity in a dynamic
                        and socially influential company. My goal is to
                        collaborate with a passionate team, dedicated to
                        creating groundbreaking and innovative products that
                        resonate with the public.
                    </p>
                </section>

                {/* Experience Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Professional Experience
                    </h2>

                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        R&D Engineer
                                    </h3>
                                    <p className="text-gray-600">
                                        Digital University Kerala
                                    </p>
                                </div>
                                <span className="text-gray-500">
                                    AUG 2024 - Present
                                </span>
                            </div>
                            <ul className="mt-4 space-y-2">
                                <li className="text-gray-600">
                                    • Leading a 3-person team to design,
                                    develop, and deploy an online sports and
                                    drills management web dashboard using NextJS
                                    and Supabase
                                </li>
                                <li className="text-gray-600">
                                    • Co-developing hardware solution to monitor
                                    activities of kid&apos;s play rooms in
                                    schools with live updates
                                </li>
                                <li className="text-gray-600">
                                    • Developed a DL model to detect physical
                                    education drill activity using pose
                                    estimation
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Junior Software Engineer
                                    </h3>
                                    <p className="text-gray-600">
                                        Inker Robotic Solutions Pvt Ltd
                                    </p>
                                </div>
                                <span className="text-gray-500">
                                    JUL 2020 – SEP 2021
                                </span>
                            </div>
                            <ul className="mt-4 space-y-2">
                                <li className="text-gray-600">
                                    • Created Python package for e-learning
                                    division to support students with AI course
                                </li>
                                <li className="text-gray-600">
                                    • Developed course videos using manim
                                    library for programmatic animations
                                </li>
                                <li className="text-gray-600">
                                    • Conducted Python coding and AI/ML
                                    one-to-one mentoring sessions
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Technical Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Programming Languages
                            </h3>
                            <p className="text-gray-600">
                                Python, JavaScript, C++
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-gray-900 mb-3">
                                AI/ML
                            </h3>
                            <p className="text-gray-600">
                                PyTorch, TensorFlow, scikit-learn, Keras,
                                Pandas, TinyML
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Web Technologies
                            </h3>
                            <p className="text-gray-600">
                                React, NextJS, Node.js, FastAPI, Tailwind CSS
                            </p>
                        </div>
                    </div>
                </section>

                {/* Education Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Education
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        M.Tech in Computer Science & Engineering
                                    </h3>
                                    <p className="text-gray-600">
                                        Digital University Kerala
                                    </p>
                                    <p className="text-gray-500">
                                        Specialization in Connected Systems &
                                        Intelligence
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-500">
                                        2021-2023
                                    </span>
                                    <p className="text-gray-600">CGPA: 7.56</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        B.Tech in Computer Science & Engineering
                                    </h3>
                                    <p className="text-gray-600">
                                        APJ Abdul Kalam Technological University
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-500">
                                        2016-2020
                                    </span>
                                    <p className="text-gray-600">CGPA: 7.65</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800">
                <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-300">
                        © 2024 Aditya Vishnu. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
