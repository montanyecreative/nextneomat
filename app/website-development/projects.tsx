import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
	return (
		<div className="webdev-projects grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-20">
			{projects.map((project) => (
				<Link
					key={project.href}
					href={project.href}
					aria-label={project.ariaLabel}
					target="_blank"
					rel="noopener"
					className="avatar-shadow rounded transition-transform duration-300 hover:scale-[1.025] group block"
				>
					<Card className="border-0 glass-card bg-transparent">
						<div className="webdev-project-details">
							<h3 className="text-[28px] mt-5">{project.title}</h3>
							<p className="mx-5 mt-3 mb-5">{project.description}</p>
							<Button
								variant="outline"
								className="rounded-full px-10 mb-10 md:mb-unset text-white hover:bg-red hover:border-red hover:text-white group-hover:bg-red group-hover:border-red group-hover:text-white cursor-pointer uppercase text-[12px] transition-colors duration-300"
							>
								See Project
							</Button>
							<div className="webdev-project-image mt-5">
								<Image
									src={project.imageSrc}
									alt={project.imageAlt}
									width="1000"
									height="1000"
									className="mx-unset md:mr-20"
								/>
							</div>
						</div>
					</Card>
				</Link>
			))}
		</div>
	);
}
