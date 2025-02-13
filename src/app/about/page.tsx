import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const aboutMeContent = `
## About Me

I'm Nick Cardamone, an electrical engineer and RF design master's student with a passion for electronics design, embedded systems, and data driven control systems/ AI. I specialize in PCB design, scripting, FPGA development, and RF/microwave circuit design. My projects range from high-frequency power amplifiers to machine learning-based control systems.

I enjoy working on hardware and software projects, from developing Python instrument drivers for automated lab testing to creating a transmission line autorouter script for RF filters using shape synthesis as my masters thesis. My work includes hands-on prototyping, simulation, and algorithm optimization across platforms like MATLAB, Simulink, C++, Python, and VHDL.

Beyond engineering, I'm a musician, playing drums and piano in jazz and big band setups for over 10 years.  
I also enjoy 3D printing, woodworking, and automation projects—constantly exploring new ways to blend technology and creativity.
`;

export default function AboutPage() {
    return (
        <section className="py-20 bg-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6 text-center">About Me</h2>

                <div className="bg-white shadow-md rounded p-6 text-gray-900">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h2: ({ node, ...props }) => <h2 className="text-3xl font-extrabold text-gray-900 mt-8 mb-4" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-3" {...props} />,
                            p: ({ node, ...props }) => <p className="text-lg leading-7 my-4" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-inside my-5 space-y-2 text-lg" {...props} />,
                            li: ({ node, ...props }) => <li className="ml-4 text-lg leading-7" {...props} />
                        }}
                    >
                        {aboutMeContent}
                    </ReactMarkdown>
                </div>

                {/* Links to Other Sections */}
                <div className="mt-8 text-center flex flex-col md:flex-row md:justify-center space-y-4 md:space-y-0 md:space-x-6">
                    <Link href="/experience">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            Experience
                        </button>
                    </Link>
                    <Link href="/education">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            Education
                        </button>
                    </Link>
                    <Link href="/projects">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            Projects
                        </button>
                    </Link>
                    <Link href="/skills">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            Skills
                        </button>
                    </Link>
                    <Link href="/hobbies">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            Hobbies
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
