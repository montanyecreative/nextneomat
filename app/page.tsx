"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/home/Hero";
import StartOrMigrate from "@/components/home/StartOrMigrate";
import ConnectedSystem from "@/components/home/ConnectedSystem";
import FasterLeaner from "@/components/home/FasterLeaner";
import SelectedWork from "@/components/home/SelectedWork";
import AboutEngineer from "@/components/home/AboutEngineer";
import ClosingCta from "@/components/home/ClosingCta";
import AlsoFromStudio from "@/components/home/AlsoFromStudio";

export default function Home() {
	return (
		<main className="overflow-x-hidden">
			<Navbar />
			{/* Bands alternate black and charcoal, starting black at the hero */}
			<div className="w-full bg-[#000000] text-white aktiv-grotesk-regular text-[18px] leading-[1.6]">
				<Hero />
				<StartOrMigrate />
				<ConnectedSystem />
				<FasterLeaner />
				<SelectedWork />
				<AboutEngineer />
				<ClosingCta />
				<AlsoFromStudio />
			</div>
			<Footer />
		</main>
	);
}
