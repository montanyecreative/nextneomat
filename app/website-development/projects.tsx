"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const formatProjectCounter = (index: number, total: number) => `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;

export default function Projects() {
	const sectionRef = useRef<HTMLElement>(null);
	const listRef = useRef<HTMLUListElement>(null);
	const fillRef = useRef<HTMLDivElement>(null);
	const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
	const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (!sectionRef.current || !listRef.current || !fillRef.current) return;

		const listItems = listItemRefs.current.filter(Boolean) as HTMLLIElement[];
		const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];

		if (listItems.length === 0 || slides.length === 0) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top top",
				end: `+=${listItems.length * 50}%`,
				pin: true,
				scrub: true,
				onUpdate: (self) => {
					const targetIndex = Math.round(self.progress * (listItems.length - 1));
					setActiveIndex((prev) => (prev === targetIndex ? prev : targetIndex));
				},
			},
		});

		// Set initial state for fill marker
		gsap.set(fillRef.current, {
			scaleY: 1 / listItems.length,
			transformOrigin: "top left",
		});

		// Set initial state for first item and slide
		gsap.set(listItems[0], { color: "#c6284a" });
		gsap.set(slides[0], { autoAlpha: 1 });

		// Animate each item
		listItems.forEach((item, i) => {
			const previousItem = listItems[i - 1];
			if (previousItem) {
				tl.set(item, { color: "#c6284a" }, 0.5 * i)
					.to(
						slides[i],
						{
							autoAlpha: 1,
							duration: 0.2,
						},
						"<"
					)
					.set(previousItem, { color: "#fffce1" }, "<")
					.to(
						slides[i - 1],
						{
							autoAlpha: 0,
							duration: 0.2,
						},
						"<"
					);
			}
		});

		// Animate fill marker
		tl.to(
			fillRef.current,
			{
				scaleY: 1,
				transformOrigin: "top left",
				ease: "none",
				duration: tl.duration(),
			},
			0
		).to({}, {}); // Add a small pause at the end

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			className="pin-section w-full min-h-screen flex justify-center items-center mt-0 pt-0 aktiv-grotesk-regular"
		>
			<div className="content w-full mx-10 flex px-[20px] relative">
				<ul ref={listRef} className="list text-[30px] text-white m-0 p-0 pr-[40px] list-none flex-grow-0 aktiv-grotesk">
					{projects.map((project, index) => (
						<li
							key={project.href}
							ref={(el) => {
								listItemRefs.current[index] = el;
							}}
							className="text-white"
						>
							{project.title}
						</li>
					))}
				</ul>
				<div className="absolute -top-[30px] left-0 z-20 text-[16px] tracking-[0.3em] uppercase text-white pointer-events-none">
					{formatProjectCounter(activeIndex, projects.length)}
				</div>
				<div ref={fillRef} className="fill absolute top-0 left-0 w-[2px] h-full bg-mcRed" />
				<div className="right flex-grow relative">
					{projects.map((project, index) => (
						<div
							key={project.href}
							ref={(el) => {
								slideRefs.current[index] = el;
							}}
							className="slide absolute w-8/10 top-1/2 -translate-y-1/2 right-4 opacity-0 invisible rounded-[10px]"
						>
							<div className="flex flex-col items-center">
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
			</div>
		</section>
	);
}
