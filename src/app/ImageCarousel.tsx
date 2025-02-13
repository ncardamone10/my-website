"use client"; // This component runs on the client side

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ImageCarousel({ images }: { images: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Duration of the CSS transition
    }
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 10000); // Auto-scroll every 10 seconds
    return () => clearInterval(interval);
  }, [nextImage]); // ✅ Added missing dependency

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Image Container */}
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 bg-gray-600 bg-opacity-30">
      
        <h2
          className="text-8xl font-bold"
          style={{
            color: "#1a73e8",
            textShadow: "2px 2px 5px rgba(255, 255, 255, 1)",
            WebkitTextStroke: "2px black",
          }}
        >
          Nick Cardamone
        </h2>
        <p
          className="mt-4 text-4xl font-bold"
          style={{
            color: "#1a73e8",
            textShadow: "2px 2px 5px rgba(255, 255, 255, 1)",
            WebkitTextStroke: "1px black",
          }}
        >
          Electrical Engineering Graduate and RF Design Master&apos;s Student
        </p>
        <p
          className="mt-0 text-4xl font-bold"
          style={{
            color: "#1a73e8",
            textShadow: "2px 2px 5px rgba(255, 255, 255, 1)",
            WebkitTextStroke: "1px black",
          }}
        >
          Expertise in PCB Design, Embedded Systems, and Electromagnetics.
        </p>
        <p
          className="mt-0 text-2xl font-bold"
          style={{
            color: "#1a73e8",
            textShadow: "2px 2px 5px rgba(255, 255, 255, 1)",
            WebkitTextStroke: "1px black",
          }}
        >
          Passionate about creating innovative solutions in electronics and exploring the intersection of hardware and software design.
        </p>
        <Link
          href="/projects"
          className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Explore My Work
        </Link>
      </div>
    </div>
  );
}
