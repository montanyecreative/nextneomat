"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const palladiumImage = "/projects/palladium-point.webp";
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
							<div className="avatar-shadow rounded pt-5 pb-10">
								<Card className="border-0">
									<p className="my-5 mx-5">Currently we offer custom web solutions for the following use cases:</p>
									<ul>
										<li>Multi-Page Business or Personal websites</li>
										<li>Single Page Landing Page websites</li>
										<li>Save the Date wedding websites</li>
										<li>Small to medium Shopify websites</li>
										<li>Hosting/application optimization</li>
										<li>Core Web Vital Optimization</li>
										<li>ADA Compliance</li>
									</ul>
									<p className="my-5 mx-5">
										To get in touch with us about how we can help you, please fill out the form on our contact page.
									</p>
									<Link href="/contact" aria-label="Go to Contact page">
										<Button
											variant="outline"
											className="rounded-full px-10 mb-10 md:mb-unset text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
										>
											Get in Touch
										</Button>
									</Link>
								</Card>
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
												alt="smiling_business_people_sharing_handshake_in_office"
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
												alt="smiling_business_people_sharing_handshake_in_office"
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
												alt="smiling_business_people_sharing_handshake_in_office"
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
