"use client";

import { useState, useEffect } from "react";
import AnimatedTextLines from "@/components/AnimatedTextLines";
import { X } from "lucide-react";
import { Button } from "../../components/ui/button";
import Link from "next/link";

interface FeatureItem {
	src: string;
	alt: string;
	title: string;
	description: string;
	description2: string;
	description3: string;
	featuresTitle: string;
	features: string[];
}

const featureItems: FeatureItem[] = [
	{
		src: "/website-development/websiteDesign.webp",
		alt: "Learn more about our website design services",
		title: "Website Design",
		description:
			"We work with you to build a modern and user-friendly website that is optimized for your brand and will work on every device and screen size in a pixel-perfect capacity.",
		description2:
			"Our designer/developer has 8+ years of creating pixel-perfect, intentional user experiences with internationally recognized brands such as New Balance and Citizen and Bulova Watches",
		description3:
			"We build your design iteratively, meaning that you get to see each page and section as it's created and can give feedback every step of the way.",
		featuresTitle: "",
		features: ["Responsively Designed", "ADA Compliant", "Speed Optimized"],
	},
	{
		src: "/website-development/digitalStrategyConsulting.webp",
		alt: "Learn more about our digital strategy services",
		title: "Digital Strategy",
		description:
			"Creating a digital footprint is essential for any business in today's world. From creating a brand style guide, managing a Google Business page, or increasing social media presence, we can help you grow while maintaining your goals and vision.",
		description2:
			"With 8+ years of industry knowledge, we can direct you to a clear and scalable goal while providing you insights and data on how users interact with your online presence.",
		description3: "We have experience in many fundamental digital strategy tools",
		featuresTitle: "Including:",
		features: [
			"Brand Style Guides",
			"Google Analytics/Tag Manager",
			"Conversion Rates",
			"Google Business",
			"Facebook, Instagram, and more",
		],
	},
	{
		src: "/website-development/costReduction.webp",
		alt: "Learn more about our cost reduction services",
		title: "Cost Reduction",
		description:
			"Over the years we've worked out the best ways to reduce costs for websites using companies that are trusted and reliable. Your online presence should not be hemorrhaging your revenue.",
		description2:
			"If you're not planning on making money from your website, hosting and included tools like web forms, analytics, admin portals, and more are free.",
		description3:
			"If you are making money from your website, hosting costs are only $240/year with web forms costing an additional $15-$35/month.",
		featuresTitle: "Hosting Compliances",
		features: ["SOC 2 Type 2", "PCI DSS", "ISO 27001", "EU-U.S. DPF", "HIPAA BAA"],
	},
	{
		src: "/website-development/seoOptimization.webp",
		alt: "Learn more about our SEO optimization services",
		title: "SEO Optimization",
		description: "We help review the copy and layout of your website to ensure it is optimized for SEO and Google's latest algorithms.",
		description2:
			"SEO tools and optimizations change on a seemingly daily basis. We watch your analytics and the latest digital trends to make sure your site and online presence are optimized to match your user's journey.",
		description3: "",
		featuresTitle: "Analytics & Insights",
		features: [
			"Google Analytics/Tag Manager",
			"Vercel Analytics/Insights",
			"Email Analytics",
			"Form Analytics",
			"Social Media Analytics",
		],
	},
	{
		src: "/website-development/sitePerformance.webp",
		alt: "Learn more about our website performance services",
		title: "Website Performance",
		description:
			"You can expect Google Core Web Vitals and Lighthouse test scores to be 90% or higher giving you the fastest web experience possible regardless what device or internet connection your user is on.",
		description2:
			"We use the latest image generation serving and most optimized coding/technology techniques to deliver you a blazing fast site. You will notice a considerable jump in performance coming from WordPress or similar architecture.",
		description3: "",
		featuresTitle: "Features",
		features: ["90% or higher Core Web Vitals/Speed Test Scores", "Next-Gen Image Serving", "Optimized Code Caching"],
	},
	{
		src: "/website-development/toolLeverage.webp",
		alt: "Learn more about our tool leverage services",
		title: "Tool Leverage",
		description:
			"We have a cutting-edge industry grade knowledge of the latest tools and technologies to help you get the most out of your website and online presence.",
		description2:
			"Whether you need a tool for capturing and streamlining form inputs, managing Content in a CMS, or managing email subscribers, we have you covered.",
		description3: "",
		featuresTitle: "Tools",
		features: ["Constant Contact", "Basin Forms", "Mailchimp", "Klaviyo", "Emarsys", "Contentful", "Shopify", "Gelato Printing"],
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

			<div
				className="fixed inset-0 z-[1000] bg-black/90 flex items-start md:items-center justify-center p-4 animate-in fade-in-0 overflow-y-auto"
				onClick={() => setSelectedItem(null)}
			>
				<div
					className="glass-form-deep-blue border-white/15 text-white p-6 md:p-8 max-w-2xl w-full rounded-2xl relative animate-in zoom-in-95 slide-in-from-bottom-2 my-4 md:my-auto"
					onClick={(e) => e.stopPropagation()}
				>
					<button
						onClick={() => setSelectedItem(null)}
						className="absolute right-4 top-4 rounded-full w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white opacity-70 hover:opacity-100 transition-all"
						aria-label="Close modal"
					>
						<X className="h-4 w-4" />
					</button>
					<div className="flex flex-col">
						<div className="flex mb-6 mx-auto">
							<img
								src={selectedItem.src}
								alt={selectedItem.alt}
								width="125"
								height="125"
								className="w-[125px] h-[125px] object-contain"
							/>
						</div>
						<h2 className="text-2xl mb-4 proxima-nova-semibold text-center">{selectedItem.title}</h2>
						<p className="aktiv-grotesk-regular mb-5">{selectedItem.description}</p>
						{selectedItem.description2 && <p className="aktiv-grotesk-regular mb-5">{selectedItem.description2}</p>}
						{selectedItem.description3 && <p className="aktiv-grotesk-regular mb-5">{selectedItem.description3}</p>}
						{selectedItem.features && selectedItem.features.length > 0 && (
							<h3 className="text-xl font-semibold mb-3 proxima-nova-semibold">{selectedItem.featuresTitle}</h3>
						)}
						{selectedItem.features && selectedItem.features.length > 0 && (
							<div className="flex flex-wrap gap-2 justify-center">
								{selectedItem.features.map((feature, index) => (
									<span
										key={index}
										className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/10 border border-white/20 text-white"
									>
										{feature}
									</span>
								))}
							</div>
						)}
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
