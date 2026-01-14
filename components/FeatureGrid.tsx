import AnimatedTextLines from "@/components/AnimatedTextLines";

interface FeatureItem {
	src: string;
	alt: string;
	title: string;
	description: string;
}

const featureItems: FeatureItem[] = [
	{
		src: "/website-development/websiteDesign.webp",
		alt: "Website and App Design",
		title: "Website Design",
		description:
			"We work with you to build a modern and user-friendly website that is optimized for your brand and will work on every device and screen size in a pixel perfect capacity.",
	},
	{
		src: "/website-development/digitalStrategyConsulting.webp",
		alt: "Site Speed Icon",
		title: "Digital Strategy",
		description:
			"We can help you get past roadblocks or help you generate ideas that will boost your business while maintaining your current vision.",
	},
	{
		src: "/website-development/costReduction.webp",
		alt: "Site Speed Icon",
		title: "Cost Reduction",
		description:
			"Over the years we've worked out the best ways to reduce costs for websites. Hosting is often free and can be bundled with many tools like web forms, analytics, admin portals, and more for very affordable if not free options.",
	},
	{
		src: "/website-development/seoOptimization.webp",
		alt: "Site Speed Icon",
		title: "SEO Optimization",
		description: "We help review the copy and layout of your website to ensure it is optimized for SEO and Google's latest algorithms.",
	},
	{
		src: "/website-development/sitePerformance.webp",
		alt: "Site Speed Icon",
		title: "Website Performance",
		description:
			"You can expect Google Core Web Vitals and Lighthouse test scores to be 90% or higher giving you the fastest web experience possible regardless what device or internet connection your user is on.",
	},
	{
		src: "/website-development/toolLeverage.webp",
		alt: "Site Speed Icon",
		title: "Tool Leverage",
		description:
			"We have a cutting-edge industry grade knowledge of the latest tools and technologies to help you get the most out of your website and online presence.",
	},
];

export default function FeatureGrid() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-white">
			{featureItems.map((item, index) => (
				<div key={index} className="group hover:cursor-pointer text-center">
					<div className="flex mb-4 justify-center w-[75px] h-[75px] mx-auto">
						<img src={item.src} alt={item.alt} width="75" height="75" className="w-[75px] h-[75px] object-contain" />
					</div>
					<h3 className="text-xl font-semibold mb-3 proxima-nova-semibold animated-underline transition-colors">{item.title}</h3>
					<AnimatedTextLines className="aktiv-grotesk-regular transition-colors">{item.description}</AnimatedTextLines>
				</div>
			))}
		</div>
	);
}
