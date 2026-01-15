"use client";

import { useState, useEffect } from "react";
import AnimatedTextLines from "@/components/AnimatedTextLines";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface FeatureItem {
	src: string;
	alt: string;
	title: string;
	description: string;
	description2: string;
}

const featureItems: FeatureItem[] = [
	{
		src: "/website-development/websiteDesign.webp",
		alt: "Website and App Design",
		title: "Website Design",
		description:
			"We work with you to build a modern and user-friendly website that is optimized for your brand and will work on every device and screen size in a pixel perfect capacity.",
		description2: "We also offer app development services to help you get your app up and running quickly and efficiently.",
	},
	{
		src: "/website-development/digitalStrategyConsulting.webp",
		alt: "Site Speed Icon",
		title: "Digital Strategy",
		description:
			"We can help you get past roadblocks or help you generate ideas that will boost your business while maintaining your current vision.",
		description2:
			"We also offer digital strategy consulting services to help you get your business up and running quickly and efficiently.",
	},
	{
		src: "/website-development/costReduction.webp",
		alt: "Site Speed Icon",
		title: "Cost Reduction",
		description:
			"Over the years we've worked out the best ways to reduce costs for websites. Hosting is often free and can be bundled with many tools like web forms, analytics, admin portals, and more for very affordable if not free options.",
		description2:
			"We also offer cost reduction consulting services to help you get your business up and running quickly and efficiently.",
	},
	{
		src: "/website-development/seoOptimization.webp",
		alt: "Site Speed Icon",
		title: "SEO Optimization",
		description: "We help review the copy and layout of your website to ensure it is optimized for SEO and Google's latest algorithms.",
		description2:
			"We also offer SEO optimization consulting services to help you get your business up and running quickly and efficiently.",
	},
	{
		src: "/website-development/sitePerformance.webp",
		alt: "Site Speed Icon",
		title: "Website Performance",
		description:
			"You can expect Google Core Web Vitals and Lighthouse test scores to be 90% or higher giving you the fastest web experience possible regardless what device or internet connection your user is on.",
		description2:
			"We also offer website performance consulting services to help you get your business up and running quickly and efficiently.",
	},
	{
		src: "/website-development/toolLeverage.webp",
		alt: "Site Speed Icon",
		title: "Tool Leverage",
		description:
			"We have a cutting-edge industry grade knowledge of the latest tools and technologies to help you get the most out of your website and online presence.",
		description2:
			"We also offer tool leverage consulting services to help you get your business up and running quickly and efficiently.",
	},
];

export default function FeatureGrid() {
	const [selectedItem, setSelectedItem] = useState<FeatureItem | null>(null);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (selectedItem) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [selectedItem]);

	// Close modal on Escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && selectedItem) {
				setSelectedItem(null);
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [selectedItem]);

	if (!selectedItem) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-white">
				{featureItems.map((item, index) => (
					<div key={index} className="group hover:cursor-pointer text-center" onClick={() => setSelectedItem(item)}>
						<div className="flex mb-4 justify-center w-[75px] h-[75px] mx-auto">
							<img src={item.src} alt={item.alt} width="75" height="75" className="w-[75px] h-[75px] object-contain" />
						</div>
						<h3 className="text-xl font-semibold mb-3 proxima-nova-semibold animated-underline transition-colors">
							{item.title}
						</h3>
						<AnimatedTextLines className="aktiv-grotesk-regular transition-colors">{item.description}</AnimatedTextLines>
					</div>
				))}
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-white">
				{featureItems.map((item, index) => (
					<div key={index} className="group hover:cursor-pointer text-center" onClick={() => setSelectedItem(item)}>
						<div className="flex mb-4 justify-center w-[75px] h-[75px] mx-auto">
							<img src={item.src} alt={item.alt} width="75" height="75" className="w-[75px] h-[75px] object-contain" />
						</div>
						<h3 className="text-xl font-semibold mb-3 proxima-nova-semibold animated-underline transition-colors">
							{item.title}
						</h3>
						<AnimatedTextLines className="aktiv-grotesk-regular transition-colors">{item.description}</AnimatedTextLines>
					</div>
				))}
			</div>

			{/* Modal Overlay */}
			<div
				className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-in fade-in-0"
				onClick={() => setSelectedItem(null)}
			>
				{/* Modal Content */}
				<div
					className="glass-form-deep-blue border-white/15 text-white p-8 max-w-2xl w-full rounded-2xl relative animate-in zoom-in-95 slide-in-from-bottom-2"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Close Button */}
					<button
						onClick={() => setSelectedItem(null)}
						className="absolute right-4 top-4 rounded-full w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white opacity-70 hover:opacity-100 transition-all"
						aria-label="Close modal"
					>
						<X className="h-4 w-4" />
					</button>

					{/* Modal Content */}
					<div className="flex flex-col">
						<div className="flex mb-6">
							<img
								src={selectedItem.src}
								alt={selectedItem.alt}
								width="125"
								height="125"
								className="w-[125px] h-[125px] object-contain"
							/>
						</div>
						<h2 className="text-2xl mb-4 proxima-nova-semibold">{selectedItem.title}</h2>
						<p className="aktiv-grotesk-regular mb-5">{selectedItem.description}</p>
						<p className="aktiv-grotesk-regular mb-5">{selectedItem.description2}</p>
						<div className="mt-10 grid grid-cols-2 gap-4">
							<Button
								variant="outline"
								onClick={() => setSelectedItem(null)}
								aria-label="Close modal"
								className="rounded-full px-10 w-full text-white hover:bg-white hover:border-white hover:text-black cursor-pointer uppercase text-[12px]"
							>
								Close
							</Button>
							<Link href="/contact" aria-label="Go to the contact page" className="w-full">
								<Button
									variant="outline"
									className="rounded-full px-5 md:px-10 w-full text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
								>
									Contact Us
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
