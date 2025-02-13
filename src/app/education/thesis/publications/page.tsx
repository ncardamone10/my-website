import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const publicationsContent = `
## Published Work

### IEEE AP-S Conference Paper (July 2025)
**Title:** An Additive Approach to the Shape Synthesis of Microstrip Circuits and Antennas  
**Authors:** Nick Cardamone, Amal Mohammed, Igor Aćimović, and Derek A. McNamara  
**Conference:** IEEE Antennas and Propagation Symposium (AP-S), 2025  

#### Overview:
This paper introduces an **additive shape synthesis** approach for designing microstrip circuits and antennas. Instead of relying on predefined elements, this method builds RF/microwave layouts dynamically by iteratively adding conducting shapes within a defined space. 

An **evolutionary algorithm** optimizes these layouts based on **full-wave Computational Electromagnetics (CEM) simulations**, refining the geometry to meet performance targets. The approach was successfully applied to a bandpass filter, demonstrating its effectiveness in generating high-performance layouts **without traditional RF design heuristics**.

Future work will extend this method to **matching networks, power dividers, and arbitrary transmission line structures**, making **data-driven RF circuit synthesis** more accessible.

---

### Class Paper: Neural Network Buck Converter Control (Winter 2022)
**Title:** Controlling a Buck Converter with a Neural Network  
**Author:** Nick Cardamone  
**Course:** Modern Control Systems, University of Ottawa  

#### Overview:
This paper explores the feasibility of **controlling a buck converter using a neural network** instead of traditional PID control. A **NARMA L2 controller** from MATLAB's Deep Learning Toolbox was used in simulation, showing that an intelligent control system is possible. 

Key insights:
- **Recurrent Neural Networks (RNNs)** proved more effective than **feedforward networks** for controlling a dynamic system.
- **Power consumption** is a critical factor when implementing NN-based control on hardware like microcontrollers, FPGAs, or ASICs.
- The NARMA L2 controller was functional but required **significant tuning**, and further research is needed to improve **practical implementation**.

---

### Class Paper: SEPIC Converter LED Driver (Fall 2022)
**Title:** SEPIC Converter as a Constant Current Controller for a LED Desk Lamp  
**Author:** Nick Cardamone  
**Course:** Electronics III, University of Ottawa  

#### Overview:
This project involved designing and building a **constant current LED driver** using a **Single-Ended Primary Inductor Converter (SEPIC)**. The converter was optimized through:
- **MATLAB scripting** for numerical component selection.
- **LTSPICE simulations** for validation.
- **PCB prototyping and experimental testing**.

Results showed the SEPIC converter successfully regulated LED current, but challenges included **undesirable frequency deviation** and **suboptimal efficiency (max 72%)**. Future improvements could focus on reducing **switching losses** and **enhancing thermal management**.

`;

export default function PublicationsPage() {
    return (
        <section className="py-20 bg-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6 text-center">Publications</h2>

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
                            strong: ({ node, ...props }) => <strong className="text-gray-900" {...props} />
                        }}
                    >
                        {publicationsContent}
                    </ReactMarkdown>
                </div>

                {/* Download Buttons */}
                <div className="mt-6 text-center space-y-4">
                    <a
                        href="/publications/AddShapeSynthPaper.pdf"
                        download="AddShapeSynthPaper.pdf"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
                    >
                        📄 Download AP-S Paper
                    </a>

                    <a
                        href="/publications/Buck%20NN%20Final%20Paper.pdf"
                        download="Buck NN Final Paper.pdf"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
                    >
                        ⚡ Download Buck NN Paper
                    </a>

                    <a
                        href="/publications/sepicControllerFinalPaperFormatted.pdf"
                        download="sepicControllerFinalPaperFormatted.pdf"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
                    >
                        🔋 Download SEPIC Converter Paper
                    </a>
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <Link href="/education/thesis">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            ⬅ Back to Thesis
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
