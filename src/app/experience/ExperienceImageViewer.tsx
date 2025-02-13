"use client";

import { useState } from "react";

export default function ExperienceImageViewer({ images, onClose }: { images: string[], onClose: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={onClose} // Close when clicking outside
        >
            <div
                className="relative bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500"
                >
                    &times;
                </button>

                {/* Image Navigation */}
                <div className="relative w-full flex items-center justify-center">
                    <button
                        onClick={prevImage}
                        className="absolute left-4 text-white text-3xl p-4 hover:text-blue-300"
                    >
                        &#10094;
                    </button>

                    <img
                        src={images[currentIndex]}
                        alt={`Experience Image ${currentIndex + 1}`}
                        className="max-h-[80vh] max-w-full object-contain"
                    />

                    <button
                        onClick={nextImage}
                        className="absolute right-4 text-white text-3xl p-4 hover:text-blue-300"
                    >
                        &#10095;
                    </button>
                </div>

                {/* Image Counter */}
                <p className="text-center text-white mt-4">
                    {currentIndex + 1} / {images.length}
                </p>
            </div>
        </div>
    );
}
