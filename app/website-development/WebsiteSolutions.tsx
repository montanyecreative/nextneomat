"use client";

import { useEffect, useState } from "react";
import AnimatedTextLines from "../../components/AnimatedTextLines";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type WebsiteSolution = {
	title: string;
	description?: string;
	description2?: string;
	featuresTitle?: string;
	features?: string[];
};

export default function WebsiteSolutions() {
	const solutions: WebsiteSolution[] = [
		{ 
			title: "Multi-Page Business or Personal Websites",
			description: "When you need a lot of pages to display your information, we can help you create a multi-page website that is easy to navigate and has a clear structure.",
			description2: "Have an existing complicated navigation structure and want to simplify it? We can help you restructure your user journey to best fit your business intention and increase conversion rate.",
		 },
		{ 
			title: "Single Page Landing Page Websites",
			description: "Sometimes all you need is a single page to showcase your business or product. We can help you build a site that tells a powerful story that drives conversion rates towards your business's end goal.",
		 },
		{ 
			title: "Portfolio Websites",
			description: "Making a resume or want to showcase your work online? We can help you create a site that is more conceptually relative to showcasing your work.",
			description2: "We also can help you create the perfect URL for your portfolio. For instance, https://www.johnmontanye.com/ also redirects to this site.",
		 },
		{ 
			title: "Save the Date wedding Websites",
			description: "We have experience creating wedding websites where your guests can reserve their spot, request dietary restrictions, and plus ones.",
			description2: "They can also find venue information, hotel accommodations and Google Maps directions between the two as well as interact with wedding registries at your favorite stores.",
		},
		{ 
			title: "Small to Medium Shopify Websites",
			description: "Have a product or service that you want to sell online? We have experience creating Shopify websites that hookup to payment systems and shipping services domestically in the US."
		 },
		{ 
			title: "Hosting/Application Optimization",
			description: "We work with a hosting company that is trusted and reliable. Your site will be hosted on a secure and reliable server with a 99.9% uptime rate.",
			featuresTitle: "Hosting Compliances",
			features: ["SOC 2 Type 2", "PCI DSS", "ISO 27001", "EU-U.S. DPF", "HIPAA BAA"],
		 },
		{ 
			title: "Overall Cost Reduction",
			description:
			"We can help you reduce costs for your website by using the best hosting and application optimization services. If you're not planning on making money from your website, hosting and included tools like web forms, analytics, admin portals, and more are free.",
			description2: "If you are making money from your website, hosting costs are only $240/year with web forms costing an additional $15-$35/month.",
		 },
		{ 
			title: "Core Web Vital Optimization",
			description: "Core Web Vitals are a set of metrics that Google uses to measure the performance of a website. We make sure that your site scores 90% or higher on these metrics to ensure the fastest and most optimized web experience possible.",
		 },
		{ 
			title: "ADA Compliance",
			description: "We make sure that your site is compliant with the Americans with Disabilities Act (ADA) to ensure that your site is accessible to all users, including those with disabilities.",
			featuresTitle: "ADA Compliances",
			features: ["WCAG 2.0 Level AA Minimum Compliance"],
		 },
		 { 
			title: "Increased Conversion Rates",
			description: "We can help you increase your conversion rates by optimizing your site for the user's journey and ensuring that your site is easy to navigate and use.",
			featuresTitle: "Conversion Rate Optimization",
			features: ["A/B Testing", "Heat Mapping", "User Testing", "User Feedback", "User Research"],
		 },
		 {
			title: "Content Management System (CMS) Optimization",
			description: "We can help you optimize your content management system (CMS) to ensure that your content is digestible and easy to manage.",
			featuresTitle: "CMS Optimization",
			features: ["WordPress", "Shopify", "Squarespace", "Wix", "Contentful"],
		 },
		 {
			title: "Style Guide Creation",
			description: "We can help you create a style guide for your website to ensure that your brand is consistent across all platforms.",
			featuresTitle: "Style Guide Creation",
			features: ["Brand Colors", "Brand Logo", "Brand Typography", "Brand Images", "Brand Tone"],
		 }
	];

	const [selectedSolution, setSelectedSolution] = useState<WebsiteSolution | null>(null);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (selectedSolution) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [selectedSolution]);

	// Close modal on Escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && selectedSolution) {
				setSelectedSolution(null);
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [selectedSolution]);

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{solutions.map((solution, index) => (
					<div
						key={index}
						className="glass-form-deep-blue text-white p-4 rounded group hover:cursor-pointer text-left"
						onClick={() => setSelectedSolution(solution)}
					>
						<AnimatedTextLines className="aktiv-grotesk-regular transition-colors text-[16px] animated-underline">
							{solution.title}
						</AnimatedTextLines>
					</div>
				))}
			</div>

			{selectedSolution && (
				<div
					className="fixed inset-0 z-[1000] bg-black/90 flex items-start md:items-center justify-center p-4 animate-in fade-in-0 overflow-y-auto"
					onClick={() => setSelectedSolution(null)}
				>
					<div
						className="glass-form-deep-blue border-white/15 text-white p-6 md:p-8 max-w-2xl w-full rounded-2xl relative animate-in zoom-in-95 slide-in-from-bottom-2 my-4 md:my-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setSelectedSolution(null)}
							className="absolute right-4 top-4 rounded-full w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white opacity-70 hover:opacity-100 transition-all"
							aria-label="Close modal"
						>
							<X className="h-4 w-4" />
						</button>

						<div className="flex flex-col">
							<h2 className="text-2xl mb-4 proxima-nova-semibold">{selectedSolution.title}</h2>
							{selectedSolution.description && <p className={`aktiv-grotesk-regular text-white/90 ${selectedSolution.description2 ? 'mb-5' : ''}`}>{selectedSolution.description}</p>}
							{selectedSolution.description2 && <p className={`aktiv-grotesk-regular text-white/90 ${selectedSolution.features ? 'mb-5' : ''}`}>{selectedSolution.description2}</p>}
							{selectedSolution.features && selectedSolution.features.length > 0 && (
							<h3 className="text-xl font-semibold mb-3 proxima-nova-semibold mt-5">{selectedSolution.featuresTitle}</h3>
						)}
						{selectedSolution.features && selectedSolution.features.length > 0 && (
							<div className="flex flex-wrap gap-2 justify-center">
								{selectedSolution.features.map((feature, index) => (
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
								onClick={() => setSelectedSolution(null)}
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
			)}
		</>
	);
}
