"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import Image from "next/image";
import ContactForm from "../../components/contactForm";

export default function ContactUs() {
	return (
		<main>
			<Navbar />
			<div className="bg-transparent">
				<div className="sm:mx-auto md:mx-auto flex banner-home-copy">
					<div className="w-full comparison-slider relative">
						<Image src="/banners/banner-contact.webp" alt="Contact Banner" fill className="object-cover" priority />
						<h1 className="text-[42px] absolute bottom-0 left-0 p-5 text-white md:block hidden proxima-nova-medium">
							Contact Us
						</h1>
					</div>
				</div>
				<div className="container resume-page mx-auto text-white text-center">
					<h1 className="text-[32px] mt-5 md:hidden proxima-nova-semibold">Contact Us</h1>
					<p className="my-5 aktiv-grotesk-regular">
						Please fill out the form below and we will get in touch with you as soon as we can.
					</p>
					<p className="my-5 aktiv-grotesk-regular">We look forward to hearing from you.</p>
					<ContactForm />
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
