import { getProjects } from "../getProjects";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ProjectImageCarousel from "@/app/components/ProjectImageCarousel";
import ShowImagesButton from "./ShowImagesButton"; // ✅ Import image button

export default function ProjectPage({ params }: { params?: { slug?: string } }) {
    if (!params || !params.slug) {
        return notFound();
    }

    const projects = getProjects();
    const project = projects.projects.items.find((p) => p.slug === params.slug);

    if (!project) return notFound();

    return (
        <section className="relative min-h-screen">
            {/* Background Image Carousel */}
            <ProjectImageCarousel imageDirectory={project.imageDirectory} />

            {/* Project Content */}
            <div className="relative z-10 py-16 bg-gray-900 bg-opacity-60 text-white">
                <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
                    <h1 className="text-6xl font-extrabold text-center">{project.title}</h1>

                    {/* Row for Back Button, Date, and Show Images Button */}
                    <div className="flex items-center justify-center space-x-4 mt-4">
                        {/* Back to Projects Button (Styled to Match) */}
                        <a
                            href="/projects"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
                        >
                            ⬅ Back to Projects
                        </a>

                        {/* Project Date */}
                        <p className="text-gray-300 text-lg font-medium">📅 {project.date}</p>

                        {/* Show Images Button (Styled to Match) */}
                        <ShowImagesButton imageDirectory={project.imageDirectory} />
                    </div>

                    <div className="mt-8 prose prose-lg lg:prose-xl mx-auto text-gray-100 leading-relaxed">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                h2: ({ node, ...props }) => (
                                    <h2 className="text-3xl font-extrabold text-white mt-10 mb-4 pb-2 border-b-4 border-blue-500" {...props} />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3 className="text-2xl font-bold text-white mt-8 mb-3 pb-2 border-b-2 border-gray-400" {...props} />
                                ),
                                p: ({ node, ...props }) => <p className="text-lg leading-7 my-4" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside my-5 space-y-2 text-lg" {...props} />,
                                li: ({ node, ...props }) => <li className="ml-4 text-lg leading-7" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                            }}
                        >
                            {project.longDescription}
                        </ReactMarkdown>
                    </div>

                    {/* Tags */}
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {project.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Bottom Back to Projects Button (Styled to Match) */}
                    <div className="mt-12 text-center">
                        <a href="/projects" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            ⬅ Back to Projects
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
