"use client"; // ✅ This must run on the client side

import { useEffect, useState } from "react";
import ExperienceImageViewer from "./ExperienceImageViewer";
import { getExperience } from "./getExperience"; // ✅ Import the fixed function

export default function ExperiencePage() {
    const [experienceData, setExperienceData] = useState<{ experience: { items: any[] } }>({ experience: { items: [] } });
    const [modalImages, setModalImages] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ Load Experience Data on Client Side
    useEffect(() => {
        async function fetchExperience() {
            const data = await getExperience();
            setExperienceData(data);
        }
        fetchExperience();
    }, []);

    const openImageModal = async (imagesDirectory: string) => {
        try {
            const response = await fetch(`/api/getImages?dir=${imagesDirectory}`);
            const data = await response.json();
            if (data.success) {
                setModalImages(data.images);
                setIsModalOpen(true);
            } else {
                console.error("Error fetching images:", data.error);
            }
        } catch (error) {
            console.error("Failed to load images:", error);
        }
    };

    return (
        <section className="py-20 bg-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6 text-center">Experience</h2>
                <div className="space-y-6">
                    {experienceData.experience.items.map((exp, index) => (
                        <div key={index} className="bg-white bg-opacity-90 shadow-md rounded p-6">
                            {/* Header: Title and Show Pictures Button */}
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold">{exp.title}</h3>
                                {exp.imagesDirectory && (
                                    <button
                                        onClick={() => openImageModal(exp.imagesDirectory)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105"
                                    >
                                        Show Me Pictures
                                    </button>
                                )}
                            </div>

                            <p className="text-gray-700">
                                {exp.organization}, {exp.location} ({exp.date})
                            </p>
                            <ul className="list-disc ml-6 mt-2 text-gray-700">
                                {exp.details.map((detail, i) => (
                                    <li key={i}>
                                        <strong>{detail.category}:</strong> {detail.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Viewer Modal */}
            {isModalOpen && (
                <ExperienceImageViewer
                    images={modalImages}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </section>
    );
}
