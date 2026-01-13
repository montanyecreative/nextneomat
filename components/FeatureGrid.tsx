import AnimatedTextLines from "@/components/AnimatedTextLines";

interface FeatureItem {
	src: string;
	alt: string;
	title: string;
	description: string;
}

const featureItems: FeatureItem[] = [
	{
		src: "/website-development/sitePerformance.webp",
		alt: "Site Speed Icon",
		title: "Website Performance",
		description: "Description text goes here. This is a placeholder description for the first column.",
	},
	{
		src: "/website-development/sitePerformance.webp",
		alt: "Site Speed Icon",
		title: "Title 2",
		description: "Description text goes here. This is a placeholder description for the second column.",
	},
	{
		src: "/website-development/sitePerformance.webp",
		alt: "Site Speed Icon",
		title: "Title 3",
		description: "Description text goes here. This is a placeholder description for the third column.",
	},
	{
		src: "/website-development/sitePerformance.webp",
		alt: "Site Speed Icon",
		title: "Title 4",
		description: "Description text goes here. This is a placeholder description for the fourth column.",
	},
	{
		src: "/website-development/sitePerformance.webp",
		alt: "Site Speed Icon",
		title: "Title 5",
		description: "Description text goes here. This is a placeholder description for the fifth column.",
	},
	{
		src: "/website-development/sitePerformance.webp",
		alt: "Site Speed Icon",
		title: "Title 6",
		description: "Description text goes here. This is a placeholder description for the sixth column.",
	},
];

export default function FeatureGrid() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-white">
			{featureItems.map((item, index) => (
				<div key={index} className="group hover:cursor-pointer text-center">
					<div className="flex mb-4 justify-center">
						<img src={item.src} alt={item.alt} width="75" height="75" />
					</div>
					<h3 className="text-xl font-semibold mb-3 proxima-nova-semibold animated-underline transition-colors">{item.title}</h3>
					<AnimatedTextLines className="aktiv-grotesk-regular transition-colors">{item.description}</AnimatedTextLines>
				</div>
			))}
		</div>
	);
}
