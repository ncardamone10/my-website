"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RandomImageCarousel from "../components/RandomImageCarousel"; // ✅ Import the background carousel

// ✅ Toggle background images ON/OFF
const ENABLE_BACKGROUND_IMAGES = false; // Change to `true` to enable images

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch("/api/getProjects");
                const data = await response.json();
                if (data.success) {
                    setProjects(data.projects.projects.items);
                } else {
                    setError("Failed to load projects.");
                }
            } catch (err) {
                console.error(err);
                setError("An error occurred while fetching projects.");
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    return (
        <section className={`relative min-h-screen ${ENABLE_BACKGROUND_IMAGES ? "bg-gray-900" : "bg-gray-200"}`}>
            {/* Conditional Background: Carousel or Default Background */}
            {ENABLE_BACKGROUND_IMAGES ? <RandomImageCarousel /> : null}

            {/* Project Content */}
            <div className={`relative z-10 py-20 ${ENABLE_BACKGROUND_IMAGES ? "bg-gray-900 bg-opacity-80 text-white" : "bg-transparent text-gray-900"}`}>
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6 text-center">My Projects</h2>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading projects...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <Link key={index} href={`/projects/${project.slug}`} className="group">
                                    <div className={`relative flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg rounded-lg p-6 h-[400px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-blue-50 ${ENABLE_BACKGROUND_IMAGES ? "bg-white bg-opacity-70" : "bg-white"}`}>
                                        
                                        {/* Project Title */}
                                        <h3 className="text-2xl font-bold text-blue-700">{project.title}</h3>
                                        
                                        {/* Description (Limited to 3 lines) */}
                                        <p className="text-gray-700 mt-2 line-clamp-3 overflow-hidden">{project.shortDescription}</p>
                                        
                                        {/* Spacer (Fills up remaining space) */}
                                        <div className="flex-grow"></div>

                                        {/* Date */}
                                        <p className="text-gray-500 text-sm mt-2">📅 {project.date}</p>

                                        {/* Tags */}
                                        <div className="mt-3 flex flex-wrap">
                                            {project.tags.map((tag: string, i: number) => (
                                                <span key={i} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-3 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Overlay Indicator - Clickable Feedback */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                                            <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                → View Project
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
