"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Salesforce from "@/components/salesforce";
import { Button } from "@/components/ui/button";
import Projects from "@/app/website-development/Projects";
import FeatureGrid from "@/app/website-development/FeatureGrid";
import WebsiteSolutions from "@/app/website-development/WebsiteSolutions";
import CustomerExperienceTools from "@/app/website-development/CustomerExperienceTools";
import PlatformsAndTechnologies from "@/app/website-development/PlatformsAndTechnologies";
import { useSlideInFromLeft, useFadeInFromBottom, useFadeInFromBottomOnScroll } from "@/components/animations";

export default function WebsiteDevelopment() {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const featuresHeadingRef = useRef<HTMLHeadingElement>(null);
	const websiteSolutionsHeadingRef = useRef<HTMLHeadingElement>(null);
	const projectsHeadingRef = useRef<HTMLHeadingElement>(null);

	const headingStyles = useSlideInFromLeft(headingRef);
	const featuresStyles = useFadeInFromBottom(featuresHeadingRef, { delay: 0.3 });
	const websiteSolutionsStyles = useFadeInFromBottomOnScroll(websiteSolutionsHeadingRef);
	const projectsStyles = useFadeInFromBottomOnScroll(projectsHeadingRef);

	return (
		<main>
			<Navbar />
			<div className="bg-transparent">
				<div className="sm:mx-auto md:mx-auto flex banner-home-copy">
					<div className="w-full comparison-slider relative">
						<div style={{ opacity: 0.4 }} className="absolute inset-0">
							<Image src="/banners/website-development-banner.webp" alt="Website Development Banner" fill className="object-cover" priority />
						</div>
						<h1
							ref={headingRef}
							style={{ opacity: 0 }}
							className="text-[42px] absolute top-1/2 -translate-y-1/2 left-0 p-5 text-white md:block hidden md:mx-10 aktiv-grotesk"
						>
							<span className="aktiv-grotesk-semibold">Create value with</span>
							<br /> design &amp; technology.
						</h1>
						<p className="text-[20px] absolute top-1/2 -translate-y-1/2 right-5 p-5 text-white md:block hidden w-[600px] aktiv-grotesk-regular">
							Montanye Creative is a midwest based Design &amp; Technology Studio. We assist individuals and organizations by
							identifying and executing necessary digital initiatives, producing high-end, conversion driving experiences.
						</p>
					</div>
				</div>
				<div className="container-fluid webdev-page mx-auto md:mx-10 text-center text-white aktiv-grotesk-regular">
					<div className="mb-20">
						<h1 className="text-[32px] mt-5 md:hidden">
							<b>Create value with</b>
							<br /> design &amp; technology.
						</h1>
						<div className="my-20">
							<h2
								ref={featuresHeadingRef}
								style={featuresStyles.style}
								className="mb-10 pt-10 md:pt-unset text-white text-center"
							>
								Features
							</h2>
							<FeatureGrid />
						</div>
						<div className="my-10">
							<Link href="/contact" aria-label="Go to Contact page">
								<Button
									variant="outline"
									className="rounded-full px-10 mt-5 mb-10 md:mb-unset text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
								>
									Get in Touch
								</Button>
							</Link>
						</div>
					</div>
				</div>
				<div className="container-fluid px-auto md:px-10 text-center text-white aktiv-grotesk-regular bg-[#242424] py-5">
					<div className="mb-20">
						<h2
							ref={websiteSolutionsHeadingRef}
							style={websiteSolutionsStyles.style}
							className="my-10 md:pt-unset text-white text-center"
						>
							Website solutions
						</h2>
						<WebsiteSolutions />
					</div>
				</div>
				<div className="container-fluid px-auto md:px-10 text-white aktiv-grotesk-regular py-5">
					<div className="mb-20">
						<CustomerExperienceTools />
					</div>
				</div>
				<div className="container-fluid px-auto md:px-10 text-white bg-[#242424] aktiv-grotesk-regular py-5">
					<div className="mb-20">
						<PlatformsAndTechnologies />
					</div>
				</div>
				<div className="container mx-auto text-center text-white text-center aktiv-grotesk-regular">
					<div className="my-10">
						<Link href="/contact" aria-label="Go to Contact page">
							<Button
								variant="outline"
								className="rounded-full px-10 mt-5 mb-10 md:mb-unset text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
							>
								Get in Touch
							</Button>
						</Link>
					</div>
					<h2
						ref={projectsHeadingRef}
						style={projectsStyles.style}
						className="text-[30px] text-white proxima-nova-semibold md:mt-10 pt-5"
					>
						Projects
					</h2>
					<p className="mt-5">
						I have worked many other projects that are not shown here as I do not have direct permission from clients to share
						works as per contracted agreements but those brands and sites include:{" "}
						<i>
							Citizen, Bulova, Accutron, Frederique Constant, Alpina, New Balance, Johnston &amp; Murphy, Sheet Music Plus,
							Cherished Memories, ReserveBar, LuxeDecor, SyllogisTeks, PohlmanUSA, and Our Lady&apos;s Inn
						</i>
						. See{" "}
						<Link href="/resume" className="underline" aria-label="Go to Resume page">
							resume
						</Link>{" "}
						for details.
					</p>
				</div>
				<div className="container-fluid px-auto md:px-10 text-white aktiv-grotesk-regular">
					<Projects />
				</div>
			</div>
			<Salesforce />
			<Footer />
		</main>
	);
}
