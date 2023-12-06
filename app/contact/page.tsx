"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import ContactForm from "../../components/contactForm";

export default function Resume() {
	return (
		<main>
			<Navbar />
			<div className="bg-black">
				<div className="container resume-page mx-auto text-white">
					<ContactForm />
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
