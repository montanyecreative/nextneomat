"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
	images: string[];
	alt?: string;
}

export default function ImageGallery({ images, alt = "Gallery image" }: ImageGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextImage = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevImage = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
	};

	const goToImage = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<div className="relative w-full mx-auto">
			{/* Main Image */}
			<div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
				<Image
					src={images[currentIndex]}
					alt={`${alt} ${currentIndex + 1}`}
					fill
					className="object-contain"
					priority={currentIndex === 0}
				/>

				{/* Navigation Arrows */}
				<button
					onClick={prevImage}
					className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
					aria-label="Previous image"
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<button
					onClick={nextImage}
					className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
					aria-label="Next image"
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>

				{/* Image Counter */}
				<div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
					{currentIndex + 1} / {images.length}
				</div>
			</div>

			{/* Thumbnail Navigation */}
			<div className="mt-4 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => goToImage(index)}
						className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
							index === currentIndex ? "border-white ring-2 ring-blue-500" : "border-gray-600 hover:border-gray-400"
						}`}
					>
						<Image src={image} alt={`${alt} thumbnail ${index + 1}`} fill className="object-cover" />
					</button>
				))}
			</div>
		</div>
	);
}
