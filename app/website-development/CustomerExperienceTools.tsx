"use client";

import { useRef } from "react";
import { useFadeInFromLeftOnScroll } from "@/components/animations";

export default function CustomerExperienceTools() {
	const contentRef = useRef<HTMLDivElement>(null);
	const title = "Customer experience, acquisition & retention tools";
	const description =
		"The digital user experience is enhanced with tools that provide for site search optimization, personalization, SEO, ADA compliance, and more.";
	const images = [
		{ src: "/placeholder-image.webp", alt: "Image 1" },
		{ src: "/placeholder-image.webp", alt: "Image 2" },
		{ src: "/placeholder-image.webp", alt: "Image 3" },
		{ src: "/placeholder-image.webp", alt: "Image 4" },
	];

	const contentStyles = useFadeInFromLeftOnScroll(contentRef);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div ref={contentRef} style={contentStyles.style} className="text-center md:text-left">
				<h3 className="mt-10 mb-5 md:pt-unset text-white text-[32px] proxima-nova-semibold">{title}</h3>
				<p className="text-white/90 aktiv-grotesk-regular">{description}</p>
			</div>
			<div className="md:col-span-2 flex items-center justify-center">
				<div className="grid grid-cols-2 gap-4">
					{images.map((image, index) => (
						<div key={index} className="flex items-center justify-center">
							<img src={image.src} alt={image.alt} width="100" height="30" className="w-[100px] h-[30px] object-contain" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
