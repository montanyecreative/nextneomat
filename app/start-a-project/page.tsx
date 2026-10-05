"use client";

import { Suspense, useRef } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import Image from "next/image";
import RecaptchaProvider from "@/components/RecaptchaProvider";
import { useSlideInFromLeft } from "@/components/animations";
import ProjectIntakeForm from "./intake/ProjectIntakeForm";

export default function ContactUs() {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const headingStyles = useSlideInFromLeft(headingRef);

	return (
		<main className="overflow-x-hidden">
			<Navbar />
			<div className="bg-transparent">
				<div className="sm:mx-auto md:mx-auto flex banner-home-copy">
					<div className="w-full comparison-slider relative">
						<Image src="/banners/banner-contact.webp" alt="Contact Banner" fill className="object-cover" priority />
						<h1
							ref={headingRef}
							style={headingStyles.style}
							className="text-[42px] absolute bottom-0 left-0 p-5 text-white md:block hidden proxima-nova-medium"
						>
							Contact Us
						</h1>
					</div>
				</div>
				<div className="bg-[#151515] text-center">
					<h1 className="text-[32px] pt-5 mb-0 text-white md:hidden proxima-nova-semibold">Contact Us</h1>
				</div>
				{/* The provider lives here, not in the root layout, so the reCAPTCHA script loads on this page only */}
				<RecaptchaProvider>
					<Suspense fallback={<div className="bg-[#151515] py-[clamp(56px,7vw,96px)]" />}>
						<ProjectIntakeForm />
					</Suspense>
				</RecaptchaProvider>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
