"use client"; // Runs on the client side

import { useState, useEffect } from "react";

export default function RandomImageCarousel() {
    const [images, setImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch("/api/getRandomImages");
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
    }, []);

    useEffect(() => {
        if (images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000); // Change image every 7 seconds
        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {images.length > 0 ? (
                <div
                    className="h-full w-full bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
                />
            ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-900 text-white">
                    Loading images...
                </div>
            )}
        </div>
    );
}
