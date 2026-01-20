"use client";

import { useRef } from "react";
import { useFadeInFromLeftOnScroll } from "@/components/animations";

export default function PlatformsAndTechnologies() {
	const contentRef = useRef<HTMLDivElement>(null);
	const title = "Platforms & technologies";
	const description =
		"Over the past 8 years, we've worked with technologies that are powering some of the world's most successful businesses. From Vercel, Shopify, GitHub, and several other platforms, we have an unparalleled understanding of the best solution for your unique business needs.";
	const images = [
		{ src: "website-development/vercel-logo.webp", alt: "Vercel Logo" },
		{ src: "website-development/contentful-logo.webp", alt: "Contentful Logo" },
		{ src: "website-development/github-logo.webp", alt: "GitHub Logo" },
		{ src: "website-development/shopify-logo.webp", alt: "Shopify Logo" },
	];

	const contentStyles = useFadeInFromLeftOnScroll(contentRef);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div ref={contentRef} style={contentStyles.style} className="text-center md:text-left">
				<h3 className="mt-10 mb-5 md:pt-unset text-white text-[32px] proxima-nova-semibold">{title}</h3>
				<p className="text-white/90 aktiv-grotesk-regular">{description}</p>
			</div>
			<div className="md:col-span-2 flex items-center justify-center">
				<div className="grid grid-cols-2 gap-10 mt-10">
					{images.map((image, index) => (
						<div key={index} className="flex items-center justify-center">
							<img src={image.src} alt={image.alt} width="275" height="55" className="w-[275px] h-[55px] object-contain" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
