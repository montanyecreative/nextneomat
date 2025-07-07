"use client";

import { useState, useRef, TouchEvent, useEffect } from "react";
import Image from "next/image";

interface ImageGalleryProps {
	images: string[];
	alt?: string;
}

export default function ImageGallery({ images, alt = "Gallery image" }: ImageGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);
	const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
	const [animationKey, setAnimationKey] = useState(0);
	const [isMobile, setIsMobile] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

	// Detect mobile device
	useEffect(() => {
		const checkMobile = () => {
			const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
			const isSmallScreen = window.innerWidth <= 768;
			setIsMobile(isTouchDevice && isSmallScreen);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Scroll to active thumbnail when currentIndex changes
	useEffect(() => {
		const activeThumbnail = thumbnailRefs.current[currentIndex];
		const thumbnailContainer = activeThumbnail?.parentElement;

		if (activeThumbnail && thumbnailContainer) {
			const containerWidth = thumbnailContainer.offsetWidth;
			const thumbnailWidth = activeThumbnail.offsetWidth;
			const thumbnailLeft = activeThumbnail.offsetLeft;

			// Calculate scroll position to left-align the active thumbnail
			const scrollPosition = thumbnailLeft - (containerWidth - thumbnailWidth) / 2;

			thumbnailContainer.scrollTo({
				left: Math.max(0, scrollPosition),
				behavior: "smooth",
			});
		}
	}, [currentIndex]);

	const nextImage = () => {
		if (isMobile) {
			setSlideDirection("left");
			setAnimationKey((prev) => prev + 1);
		}
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevImage = () => {
		if (isMobile) {
			setSlideDirection("right");
			setAnimationKey((prev) => prev + 1);
		}
		setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
	};

	const goToImage = (index: number) => {
		if (isMobile) {
			setSlideDirection(index > currentIndex ? "left" : "right");
			setAnimationKey((prev) => prev + 1);
		}
		setCurrentIndex(index);
	};

	// Minimum swipe distance (in px)
	const minSwipeDistance = 50;

	const onTouchStart = (e: TouchEvent) => {
		if (!isMobile) return;
		setTouchEnd(0); // Reset the end touch
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e: TouchEvent) => {
		if (!isMobile) return;
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const onTouchEnd = () => {
		if (!isMobile || !touchStart || !touchEnd) return;

		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;

		if (isLeftSwipe) {
			nextImage();
		}
		if (isRightSwipe) {
			prevImage();
		}
	};

	// Reset slide direction after animation
	const handleTransitionEnd = () => {
		setSlideDirection(null);
	};

	// Get transform style based on slide direction
	const getTransformStyle = () => {
		if (!isMobile || !slideDirection) return {};

		const startTransform = slideDirection === "left" ? "translateX(100%)" : "translateX(-100%)";
		return {
			transform: startTransform,
			opacity: 0,
			transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
		};
	};

	// Apply final transform after a brief delay
	useEffect(() => {
		if (isMobile && slideDirection) {
			const timer = setTimeout(() => {
				const element = containerRef.current?.querySelector("img");
				if (element) {
					element.style.transform = "translateX(0)";
					element.style.opacity = "1";
				}
			}, 10);
			return () => clearTimeout(timer);
		}
	}, [slideDirection, animationKey, isMobile]);

	return (
		<div className="relative w-full mx-auto">
			{/* Main Image */}
			<div
				ref={containerRef}
				className={`relative aspect-video rounded-lg overflow-hidden ${isMobile ? "touch-pan-y" : ""}`}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<Image
					key={`${currentIndex}-${animationKey}`}
					src={images[currentIndex]}
					alt={`${alt} ${currentIndex + 1}`}
					fill
					className="object-contain select-none"
					style={getTransformStyle()}
					priority={currentIndex === 0}
					draggable={false}
					onTransitionEnd={handleTransitionEnd}
				/>

				{/* Navigation Arrows */}
				<button
					onClick={prevImage}
					className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 z-10"
					aria-label="Previous image"
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<button
					onClick={nextImage}
					className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 z-10"
					aria-label="Next image"
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>

				{/* Image Counter */}
				<div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
					{currentIndex + 1} / {images.length}
				</div>
			</div>

			{/* Thumbnail Navigation */}
			<div className="mt-4 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => goToImage(index)}
						ref={(el) => (thumbnailRefs.current[index] = el)}
						className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
							index === currentIndex ? "border-white border-2" : "border-white"
						}`}
					>
						<Image src={image} alt={`${alt} thumbnail ${index + 1}`} fill className="object-cover" />
					</button>
				))}
			</div>
		</div>
	);
}
