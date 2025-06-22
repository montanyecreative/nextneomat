"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const palladiumImage = "/projects/palladium-point.webp";
const producersCircleImage = "/projects/the-producers-circle.webp";
const shopifyImage = "/projects/montanye-creative-shopify.webp";
const githubImage = "/projects/github-project.webp";

export default function WebsiteDevelopment() {
	return (
		<main>
			<Navbar />
			<div className="bg-black">
				<div className="page-banner-filler bg-black"></div>
				<div className="container webdev-page mx-auto text-center text-white">
					<div className="webdev-intro">
						<div className="mb-20">
							<h1 className="text-[32px] my-5">Website Development</h1>
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
						<h2 className="text-[30px] mt-5 text-white font-normal">Projects</h2>
						<p className="my-2 mx-5">
							I have worked many other projects that are not shown here as I do not have direct permission from clients to
							share works as per contracted agreements but those brands and sites include:{" "}
							<i>
								Citizen, Bulova, Accutron, Frederique Constant, Alpina, New Balance, Johnston &amp; Murphy, Sheet Music
								Plus, Cherished Memories, ReserveBar, LuxeDecor, SyllogisTeks, PohlmanUSA, and Our Lady&apos;s Inn
							</i>
							. See{" "}
							<Link href="/resume" className="underline" aria-label="Go to Resume page">
								resume
							</Link>{" "}
							for details.
						</p>
					</div>
					<div className="webdev-projects grid grid-cols-1 mt-10 mb-20">
						<div className="avatar-shadow rounded">
							<Card className="border-0">
								<div className="webdev-project-details">
									<h3 className="text-[28px] mt-5">Palladium Point</h3>
									<p className=" mx-5 mt-3 mb-5">
										Insurance business website built using Next.JS, shadcnui, TailwindCSS, GitHub Flows, and Vercel.
									</p>
									<Link
										href="https://www.palladiumpoint.com/"
										aria-label="See more about the Palladium Point website project"
										target="_blank"
										rel="noopener"
									>
										<Button
											variant="outline"
											className="rounded-full px-10 mb-10 md:mb-unset text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
										>
											See Project
										</Button>
										<div className="webdev-project-image mt-5">
											<Image
												src={palladiumImage}
												alt="Image of Palladium Point website home page"
												width="1000"
												height="1000"
												className="mx-unset md:mr-20"
											/>
										</div>
									</Link>
								</div>
							</Card>
						</div>
					</div>
					<div className="webdev-projects grid grid-cols-1 mt-10 mb-20">
						<div className="avatar-shadow rounded">
							<Card className="border-0">
								<div className="webdev-project-details">
									<h3 className="text-[28px] mt-5">The Producers Circle</h3>
									<p className=" mx-5 mt-3 mb-5">
										Landing page website built using Next.JS, shadcnui, TailwindCSS, GSAP, GitHub Flows, and Vercel.
									</p>
									<Link
										href="https://www.theproducercircle.com/"
										aria-label="See more about the The Producers Circle website project"
										target="_blank"
										rel="noopener"
									>
										<Button
											variant="outline"
											className="rounded-full px-10 mb-10 md:mb-unset text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
										>
											See Project
										</Button>
										<div className="webdev-project-image mt-5">
											<Image
												src={producersCircleImage}
												alt="Image of The Producers Circle website home page"
												width="1000"
												height="1000"
												className="mx-unset md:mr-20"
											/>
										</div>
									</Link>
								</div>
							</Card>
						</div>
					</div>
					<div className="webdev-projects grid grid-cols-1 my-20">
						<div className="avatar-shadow rounded">
							<Card className="border-0">
								<div className="webdev-project-details">
									<h3 className="text-[28px] mt-5">Montanye Creative Shopify</h3>
									<p className=" mx-5 mt-3 mb-5">
										Shopify e-commerce site for selling infrared photography prints and fulfilling them downstream with
										Gelato printing for localized processing and delivery.
									</p>
									<Link
										href="https://montanyecreative.shop/"
										aria-label="See more about the Montanye Creative Shopify website project"
										target="_blank"
										rel="noopener"
									>
										<Button
											variant="outline"
											className="rounded-full px-10 mb-10 md:mb-unset text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
										>
											See Project
										</Button>
										<div className="webdev-project-image mt-5">
											<Image
												src={shopifyImage}
												alt="Image of Montanye Creative Photography website home page"
												width="1000"
												height="1000"
												className="mx-unset md:mr-20"
											/>
										</div>
									</Link>
								</div>
							</Card>
						</div>
					</div>
					<div className="webdev-projects grid grid-cols-1 my-20">
						<div className="avatar-shadow rounded">
							<Card className="border-0">
								<div className="webdev-project-details">
									<h3 className="text-[28px] mt-5">GitHub Enhanced README</h3>
									<p className=" mx-5 mt-3 mb-5">
										An enhanced README for my main GitHub repo. Highlights langauges and technologies I use as well as
										GitHub statistics that are updated daily from API.
									</p>
									<Link
										href="https://github.com/montanyecreative/montanyecreativegithub/blob/main/README.md"
										aria-label="See more about the GitHub Enhanced README project"
										target="_blank"
										rel="noopener"
									>
										<Button
											variant="outline"
											className="rounded-full px-10 mb-10 md:mb-unset text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
										>
											See Project
										</Button>
										<div className="webdev-project-image mt-5">
											<Image
												src={githubImage}
												alt="Image of GitHub Readme project web page"
												width="1000"
												height="1000"
												className="mx-unset md:mr-20"
											/>
										</div>
									</Link>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
