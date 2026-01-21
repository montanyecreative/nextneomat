"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return isMobile;
};

interface Project {
	title: string;
	description: string;
	href: string;
	ariaLabel: string;
	imageSrc: string;
	imageAlt: string;
}

const projects: Project[] = [
	{
		title: "Compounds Coffee",
		description:
			"Coffee website for exploring coffee brews, recipes, and roasters built using Next.JS, shadcnui, TailwindCSS, GitHub Flows, and Vercel.",
		href: "https://www.compoundscoffee.com/",
		ariaLabel: "See more about the Compounds Coffee website project",
		imageSrc: "/projects/compounds-coffee-website.webp",
		imageAlt: "Image of Compounds Coffee website home page",
	},
	{
		title: "Palladium Point",
		description: "Insurance business website built using Next.JS, shadcnui, TailwindCSS, GitHub Flows, and Vercel.",
		href: "https://www.palladiumpoint.com/",
		ariaLabel: "See more about the Palladium Point website project",
		imageSrc: "/projects/palladium-point.webp",
		imageAlt: "Image of Palladium Point website home page",
	},
	{
		title: "The Producers Circle",
		description: "Landing page website built using Next.JS, shadcnui, TailwindCSS, GSAP, GitHub Flows, and Vercel.",
		href: "https://www.theproducercircle.com/",
		ariaLabel: "See more about the The Producers Circle website project",
		imageSrc: "/projects/the-producers-circle.webp",
		imageAlt: "Image of The Producers Circle website home page",
	},
	{
		title: "Montanye Creative Photography",
		description:
			"E-commerce site for selling infrared photography prints and fulfilling them downstream with Bayphoto printing for localized processing and delivery.",
		href: "https://montanyecreative.shop/",
		ariaLabel: "See more about the Montanye Creative Shopify website project",
		imageSrc: "/projects/montanye-creative-photography.webp",
		imageAlt: "Image of Montanye Creative Photography website home page",
	},
	{
		title: "GitHub Enhanced README",
		description:
			"An enhanced README for my main GitHub repo. Highlights langauges and technologies I use as well as GitHub statistics that are updated daily from API.",
		href: "https://github.com/montanyecreative/montanyecreativegithub/blob/main/README.md",
		ariaLabel: "See more about the GitHub Enhanced README project",
		imageSrc: "/projects/github-project.webp",
		imageAlt: "Image of GitHub Readme project web page",
	},
];

export default function Projects() {
	const portfolioRef = useRef<HTMLElement>(null);
	const galleryWrapperRef = useRef<HTMLDivElement>(null);
	const galleryStripRef = useRef<HTMLDivElement>(null);
	const isMobile = useIsMobile();

	useLayoutEffect(() => {
		// Skip ScrollTrigger animation on mobile
		if (isMobile) return;

		if (!galleryWrapperRef.current || !galleryStripRef.current) return;

		const pinWrap = galleryStripRef.current;
		const wrapper = galleryWrapperRef.current;
		let pinWrapWidth: number;
		let horizontalScrollLength: number;
		let scrollTrigger: gsap.core.Tween | null = null;
		let refreshHandler: () => void;

		function refresh() {
			pinWrapWidth = pinWrap.scrollWidth;
			// Calculate scroll length: total width minus viewport width (which shows 3 slides)
			horizontalScrollLength = pinWrapWidth - window.innerWidth;
		}

		// Initialize after a brief delay to ensure DOM and images are ready
		const initTimeout = setTimeout(() => {
			refresh();
			
			refreshHandler = () => {
				refresh();
			};

			// Pinning and horizontal scrolling - trigger and pin the wrapper itself
			scrollTrigger = gsap.to(pinWrap, {
				scrollTrigger: {
					scrub: true,
					trigger: wrapper,
					pin: wrapper,
					start: "top top",
					end: () => `+=${pinWrapWidth}`,
					invalidateOnRefresh: true,
				},
				x: () => -horizontalScrollLength,
				ease: "none",
			});

			ScrollTrigger.addEventListener("refreshInit", refreshHandler);
			ScrollTrigger.refresh();
		}, 150);

		// Handle window resize
		const handleResize = () => {
			refresh();
			ScrollTrigger.refresh();
		};
		window.addEventListener("resize", handleResize);

		return () => {
			clearTimeout(initTimeout);
			window.removeEventListener("resize", handleResize);
			if (scrollTrigger) {
				scrollTrigger.scrollTrigger?.kill();
				scrollTrigger.kill();
			}
			if (refreshHandler) {
				ScrollTrigger.removeEventListener("refreshInit", refreshHandler);
			}
		};
	}, [isMobile]);

	// Mobile layout: show all projects stacked vertically
	if (isMobile) {
		return (
			<section className="w-full py-10 aktiv-grotesk-regular">
				<div className="content w-full mx-0 px-4">
					{projects.map((project, index) => (
						<div key={project.href} className="mb-12 last:mb-0">
							<div className="flex flex-col items-center">
								<h3 className="text-white text-2xl mb-4 aktiv-grotesk text-center">{project.title}</h3>
								<Image
									src={project.imageSrc}
									alt={project.imageAlt}
									width={1000}
									height={1000}
									className="w-full rounded-[10px] mb-4"
								/>
								<p className="text-white text-sm text-center mb-4 px-4">{project.description}</p>
								<Link href={project.href} aria-label={project.ariaLabel} target="_blank" rel="noopener">
									<Button
										variant="outline"
										className="rounded-full px-10 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px] transition-colors duration-300"
									>
										See Project
									</Button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}

	// Desktop layout: horizontal scrolling gallery
	return (
		<section id="portfolio" ref={portfolioRef} className="relative text-center aktiv-grotesk-regular">
			<div className="w-screen pr-0 pl-0 mr-auto ml-auto overflow-hidden min-h-screen" ref={galleryWrapperRef}>
				<div
					ref={galleryStripRef}
					className="horiz-gallery-strip flex flex-nowrap will-change-transform relative"
					style={{ willChange: "transform" }}
				>
					{projects.map((project) => (
						<div key={project.href} className="project-wrap w-[33.333vw] flex-shrink-0 p-8 box-content">
							<div className="flex flex-col items-center">
								<Image
									src={project.imageSrc}
									alt={project.imageAlt}
									width={1000}
									height={1000}
									className="w-full aspect-square object-contain rounded-[10px] mb-4"
								/>
								<h3 className="text-white text-[24px] mb-2 proxima-nova-semibold text-center">{project.title}</h3>
								<p className="text-white text-sm text-center mb-4 px-4">{project.description}</p>
								<Link href={project.href} aria-label={project.ariaLabel} target="_blank" rel="noopener">
									<Button
										variant="outline"
										className="rounded-full px-10 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px] transition-colors duration-300"
									>
										See Project
									</Button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
