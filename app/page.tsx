"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
// import Image from "next/image";
// import Link from "next/link";

export default function Home() {
	return (
		<main>
			<Navbar />
			<div className="banner-home">
				<div className="container sm:mx-auto md:mx-auto flex banner-home-copy items-start lg:items-center">
					<h1 className="text-[32px]">Header Tagline Here</h1>
					<h3 className="text-[28px]">Welcome to Montanye Creative</h3>
				</div>
			</div>
			<div className="container sm:mx-auto md:mx-auto text-center expertise"></div>
			<Footer />
		</main>
	);
}
