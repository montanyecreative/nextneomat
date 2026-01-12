"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import Image from "next/image";
import Link from "next/link";

const itemData = [
	{
		img: "/photography/castlewood-tree-hunched-sun-red.webp",
		title: "Castlewood tree hunched sun red",
		category: "infrared",
	},
	{
		img: "/photography/castlewood-tree-hunched-white.webp",
		title: "Castlewood tree hunched white",
		category: "infrared",
	},
	{
		img: "/photography/castlewood-tree-top-white.webp",
		title: "Castlewood tree top white",
		category: "infrared",
	},
	{
		img: "/photography/flower-prairie-red.webp",
		title: "Flower prairie red",
		category: "infrared",
	},
	{
		img: "/photography/garden-pools-red.webp",
		title: "Garden pools red",
		category: "infrared",
	},
	{
		img: "/photography/harmony-lake-night-red.webp",
		title: "Harmony lake night red",
		category: "infrared",
	},
	{
		img: "/photography/joshua-tree-ocean-red.webp",
		title: "Joshua tree ocean red",
		category: "infrared",
	},
	{
		img: "/photography/harmony-lake-red-2.webp",
		title: "Harmony lake red",
		category: "infrared",
	},
	{
		img: "/photography/lake-bridge-red.webp",
		title: "Lake bridge red",
		category: "infrared",
	},
	{
		img: "/photography/lone-elk-park-white.webp",
		title: "Lone elk park white",
		category: "infrared",
	},
	{
		img: "/photography/path-meets-sky-red.webp",
		title: "Path meets sky red",
		category: "infrared",
	},
	{
		img: "/photography/pink-peones-dual-red.webp",
		title: "Pink peonies dual red",
		category: "infrared",
	},
	{
		img: "/photography/pink-peones-group-smaller-red.webp",
		title: "Pink peonies group red",
		category: "infrared",
	},
	{
		img: "/photography/old-trees-praries-red.webp",
		title: "Old trees prairies red",
		category: "infrared",
	},
	{
		img: "/photography/railing-flower-basket-white.webp",
		title: "Railing flower basket white",
		category: "infrared",
	},
	{
		img: "/photography/roses-red.webp",
		title: "Roses red",
		category: "infrared",
	},
	{
		img: "/photography/roses-white.webp",
		title: "Roses white",
		category: "infrared",
	},
	{
		img: "/photography/storm-severe-street-2-red.webp",
		title: "Severe storm street 2 red",
		category: "infrared",
	},
	{
		img: "/photography/storm-severe-street-red.webp",
		title: "Severe storm street red",
		category: "infrared",
	},
	{
		img: "/photography/storms-leaving-sunset.webp",
		title: "Storms leaving sunset",
		category: "non-infrared",
	},
	{
		img: "/photography/woods-gazebo-red.webp",
		title: "Woods gazebo red",
		category: "infrared",
	},
	{
		img: "/photography/towering-storm-white.webp",
		title: "Towering storm white",
		category: "infrared",
	},
	{
		img: "/photography/tree-against-building-red.webp",
		title: "Tree against building red",
		category: "infrared",
	},
	{
		img: "/photography/tree-sky-white.webp",
		title: "Tree sky white",
		category: "infrared",
	},
	{
		img: "/photography/under-cover-prarie-meets-sky-red-3.webp",
		title: "Under cover prairie meets sky red",
		category: "infrared",
	},
	{
		img: "/photography/white-flower-tree-red.webp",
		title: "White flower tree red",
		category: "infrared",
	},
	{
		img: "/photography/winding-path-1-white.webp",
		title: "Winding path white",
		category: "infrared",
	},
];

export default function Photography() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);

	return (
		<main>
			<Navbar />
			<div className="bg-transparent">
				<div className="sm:mx-auto md:mx-auto flex banner-home-copy">
					<div className="w-full comparison-slider relative">
						<Image
							src="/banners/joshua-tree-ocean-red.webp"
							alt="Joshua Tree Ocean Red"
							fill
							className="object-cover"
							priority
						/>
						<h1 className="text-[42px] absolute bottom-0 left-0 p-5 text-white md:block hidden proxima-nova-medium">
							Infrared Photography
						</h1>
					</div>
				</div>
				<div className="container resume-page mx-auto text-white">
					<h1 className="text-[32px] mt-5 md:hidden proxima-nova-semibold">Infrared Photography</h1>
					<p className="mt-5 lg:mt-20 aktiv-grotesk-regular">
						A few years back, John was walking through an art show and stopped at a particular tent that drew his attention.
						There, art centered around the usage of light in extreme conditions. Drawn by the curiosity of what else could be
						done using light, John went on a journey to find out how color had been manipulated with light in the photography
						world.
					</p>
					<p className="mt-5 aktiv-grotesk-regular">
						This led him to infrared styled photography. A style where common colors (red, green, blue) are heavily manipulated
						with light to create a completely new visual experience. The resulting process ends with photos that are either
						mostly red or mostly white as can be seen below.
					</p>
					<p className="mt-5 aktiv-grotesk-regular">
						The goal of this art is to give us a look at everyday moments that we often take for granted and give us a new
						appreciation for how important light is to our perception of color.
					</p>
					<p className="mt-5 aktiv-grotesk-regular">
						If you would like to see more, all of his photography is now available to view and is available for purchase at his
						new shopify website.
					</p>
					<div className="flex mt-10">
						<Link
							href="https://montanyecreative.shop/"
							aria-label="Leave website to go to montanycreative.shop"
							className="mx-auto"
							target="_blank"
							rel="noopener"
						>
							<Button
								variant="outline"
								className="rounded-full px-10 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
							>
								Shop Photography
							</Button>
						</Link>
					</div>
				</div>
				<div className="container mx-auto px-4 md:px-8 lg:px-12 py-10 text-white">
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
						{itemData.map((item, index) => {
							const positionInCycle = index % 7;
							const isWidePhoto = positionInCycle === 6; // Every 7th photo (indices 6, 13, 20, etc.)
							const imageHeight = isWidePhoto ? "500px" : "450px";

							return (
								<div
									key={item.title}
									onClick={() => setSelectedImage(index)}
									className={`relative overflow-hidden rounded-xl group cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl ${
										isWidePhoto ? "md:col-span-2" : ""
									}`}
									style={{
										minHeight: imageHeight,
									}}
								>
									<Image
										src={item.img}
										alt={item.title}
										fill
										className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									<div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
										<p className="text-white text-sm font-medium proxima-nova-semibold">{item.title}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<Promotion />
			<Footer />

			<Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
				<DialogContent className="max-w-[95vw] max-h-[95vh] w-fit h-fit p-0 bg-transparent border-0 z-[1001] [&>button]:z-[1002] [&>button]:text-white [&>button]:hover:text-white [&>button]:bg-black/70 [&>button]:rounded-full [&>button]:w-10 [&>button]:h-10 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:hover:bg-black/90 [&>button]:transition-colors [&>button]:fixed [&>button]:right-4 [&>button]:top-4">
					{selectedImage !== null && (
						<div className="relative max-w-[95vw] max-h-[95vh] w-auto h-auto">
							<img
								src={itemData[selectedImage].img}
								alt={itemData[selectedImage].title}
								className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg"
								style={{ display: "block" }}
							/>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent rounded-b-lg p-4">
								<p className="text-white proxima-nova-semibold">{itemData[selectedImage].title}</p>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</main>
	);
}
