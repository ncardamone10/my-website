"use client";

import { useState, useEffect } from "react";

export default function ShowImagesButton({ imageDirectory }: { imageDirectory: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Fetch images from API
    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch(`/api/getImages?dir=${imageDirectory}`);
                const data = await response.json();

                if (data.success) {
                    setImages(data.images);
                } else {
                    console.error("Error fetching images:", data.error);
                }
            } catch (error) {
                console.error("Failed to load images:", error);
            }
        }

        fetchImages();
    }, [imageDirectory]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            {/* Show Images Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
            >
                Show Me Pictures
            </button>

            {/* Image Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500"
                        >
                            &times;
                        </button>

                        {/* Image Display */}
                        {images.length > 0 && (
                            <div className="relative flex items-center justify-center w-full">
                                {/* Left Arrow */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 text-white text-3xl p-4 hover:text-blue-300"
                                >
                                    &#10094;
                                </button>

                                {/* Image */}
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`Project Image ${currentImageIndex + 1}`}
                                    className="max-h-[80vh] max-w-full object-contain"
                                />

                                {/* Right Arrow */}
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 text-white text-3xl p-4 hover:text-blue-300"
                                >
                                    &#10095;
                                </button>
                            </div>
                        )}

                        {/* Image Counter */}
                        <p className="text-center text-white mt-4">
                            {currentImageIndex + 1} / {images.length}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
