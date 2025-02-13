import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const thesisSummary = `
## Shape Synthesis in RF and Microwave Engineering

Shape synthesis is a computational design method used in RF and microwave engineering to determine an optimal geometry for circuits and antennas based on desired performance metrics. Unlike conventional design approaches that rely on predefined structures from a design library, shape synthesis generates a family of candidate layouts and the iteratively adjusts the physical geometry in response to electromagnetic performance evaluations to converge to a single optimal layout solution.

Traditionally, RF engineers manually piece together transmission lines, T-junctions, and other known elements, refining the design using optimization techniques and computational electromagnetics (CEM) simulations. However, this approach is limited by the need for prior knowledge of circuit structures and available design templates. Shape synthesis overcomes this limitation by allowing electromagnetic physics and an optimization algorithm to dictate the optimal layout, effectively broadening the design space.

### Types of Shape Synthesis
There are two primary categories of shape synthesis:

1. **Pixelation-Based Methods:**  
   The permissible region that Cu can occupy is divided into discrete elements (pixels), which can either be conducting (Cu) or non-conducting (a cut out/ dielectric). The synthesis process iteratively adjusts the spatial distribution of conducting material to achieve the required electrical performance.

2. **Geometric Object-Based Methods:**  
   Instead of pixels, predefined geometric shapes (e.g., rectangles, ellipses) are manipulated in position and size to create an optimal layout. This approach reduces the number of optimization variables while maintaining design flexibility.

### **Subtractive Shape Synthesis**
Subtractive shape synthesis is a design approach where the process starts with a fully filled conductive area, and material is selectively removed to achieve the desired RF or microwave circuit layout. 

### **Additive Shape Synthesis**
Additive shape synthesis begins with an empty design space, where conductive elements can be incrementally added or present from the begining to construct the optimal RF layout. Instead of removing material from a full-metal sheet, the synthesis process places conducting shapes (such as rectangles, ellipses, or arbitrary polygons) to form transmission lines, resonators, or other circuit elements.

### **Thesis Objective**
The point of this thesis is to combined elements of additive and subtractive shape synthesis to create a software tool that will allow a user to implement this design approach. This tool will need to implement and refine the shaping approach to be usable in industry and produce robust solutions to meet RF and microwave design requirements (such as multilayer filters, matching networks and duplexers).
`;

export default function ThesisPage() {
    return (
        <section className="py-20 bg-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6 text-center">Thesis</h2>

                <div className="bg-white shadow-md rounded p-6 text-gray-900">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h2: ({ node, ...props }) => <h2 className="text-3xl font-extrabold text-gray-900 mt-8 mb-4" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-3" {...props} />,
                            p: ({ node, ...props }) => <p className="text-lg leading-7 my-4" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-inside my-5 space-y-2 text-lg" {...props} />,
                            li: ({ node, ...props }) => <li className="ml-4 text-lg leading-7" {...props} />,
                            strong: ({ node, ...props }) => <strong className="text-gray-900 font-bold" {...props} />
                        }}
                    >
                        {thesisSummary}
                    </ReactMarkdown>
                </div>

                {/* Buttons to Education & Publications */}
                <div className="mt-8 flex justify-center space-x-6">
                    <Link href="/education">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            ⬅ Back to Education
                        </button>
                    </Link>
                    <Link href="/education/thesis/publications">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            📄 View Publications
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
