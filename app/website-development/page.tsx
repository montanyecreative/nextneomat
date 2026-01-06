"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Salesforce from "@/components/salesforce";
import { Button } from "@/components/ui/button";
import Projects from "./projects";

export default function WebsiteDevelopment() {
	return (
		<main>
			<Navbar />
			<div className="bg-transparent">
				<div className="sm:mx-auto md:mx-auto flex banner-home-copy gradient-banner-pulse">
					<div className="w-full comparison-slider relative">
						<h1 className="text-[42px] absolute top-1/2 -translate-y-1/2 left-0 p-5 text-white md:block hidden md:mx-10 aktiv-grotesk">
							<span className="aktiv-grotesk-semibold">Create value with</span>
							<br /> design &amp; technology.
						</h1>
						<p className="text-[20px] absolute top-1/2 -translate-y-1/2 right-5 p-5 text-white md:block hidden w-[600px] aktiv-grotesk-regular">
							Montanye Creative is a midwest based Design &amp; Technology Lab. We assist individuals and organizations by
							identifying and executing necessary digital initiatives, producing high-end and conversion driving experiences.
						</p>
					</div>
				</div>
				<div className="container-fluid webdev-page mx-auto md:mx-10 text-center text-white aktiv-grotesk-regular">
					<div className="webdev-intro">
						<div className="mb-20">
							<h1 className="text-[32px] mt-5 md:hidden">
								<b>Create value with</b>
								<br /> design &amp; technology.
							</h1>
							<div>
								<p className="my-5 mx-5">Currently we offer custom web solutions for the following use cases:</p>
								<div className="visual-list-item mb-4 inline-flex">
									<svg
										width="20"
										height="20"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="visual-list-item-icon-alternative"
									>
										<path
											d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
									<p>Multi-Page Business or Personal websites</p>
								</div>
								<br />
								<div className="visual-list-item mb-4 inline-flex">
									<svg
										width="20"
										height="20"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="visual-list-item-icon-alternative"
									>
										<path
											d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
									<p>Single Page Landing Page websites</p>
								</div>
								<br />
								<div className="visual-list-item mb-4 inline-flex">
									<svg
										width="20"
										height="20"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="visual-list-item-icon-alternative"
									>
										<path
											d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
									<p>Save the Date wedding websites</p>
								</div>
								<br />
								<div className="visual-list-item mb-4 inline-flex">
									<svg
										width="20"
										height="20"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="visual-list-item-icon-alternative"
									>
										<path
											d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
									<p>Small to medium Shopify websites</p>
								</div>
								<br />
								<div className="visual-list-item mb-4 inline-flex">
									<svg
										width="20"
										height="20"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="visual-list-item-icon-alternative"
									>
										<path
											d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
									<p>Salesforce Commerce Cloud Consulting</p>
								</div>
								<br />
								<div className="visual-list-item mb-4 inline-flex">
									<svg
										width="20"
										height="20"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="visual-list-item-icon-alternative"
									>
										<path
											d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
									<p>Hosting/application optimization</p>
								</div>
								<br />
								<div className="visual-list-item mb-4 inline-flex">
									<svg
										width="20"
										height="20"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="visual-list-item-icon-alternative"
									>
										<path
											d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
									<p>Core Web Vital Optimization</p>
								</div>
								<br />
								<div className="visual-list-item mb-4 inline-flex">
									<svg
										width="20"
										height="20"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="visual-list-item-icon-alternative"
									>
										<path
											d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
									<p>ADA Compliance</p>
								</div>
								<p className="my-5 mx-5">
									To get in touch with us about how we can help you, please fill out the form on our contact page.
								</p>
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
				</div>
				<div className="container-fluid mx-5 md:mx-0 text-center text-white aktiv-grotesk-regular">
					<h2 className="text-[30px] mt-5 text-white font-normal">Projects</h2>
					<p className="my-2 mx-10">
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
					<Projects />
				</div>
			</div>
			<Salesforce />
			<Footer />
		</main>
	);
}
