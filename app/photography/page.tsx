"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import Image from "next/image";
import Link from "next/link";

const image1 = "/photography/bird-at-lake.webp";
const image2 = "/photography/nature-lake-red.webp";
const image3 = "/photography/nature-lake-white.webp";
const image4 = "/photography/roses-white.webp";
const image5 = "/photography/roses.webp";
const image6 = "/photography/tree-at-lake.webp";
const image7 = "/photography/turn-in-path-red.webp";
const image8 = "/photography/lake-bridge.webp";
const image9 = "/photography/tower-in-trees.webp";
const image10 = "/photography/lake-sky-view.webp";
const image11 = "/photography/lake-reeds-white.webp";
const image12 = "/photography/zoo-bird-lake.webp";
const image13 = "/photography/storm-sunset.webp";
const image14 = "/photography/storm-severe-streeet.webp";
const image15 = "/photography/storm-severe-street-2.webp";
const image16 = "/photography/rain-on-sunny-day.webp";
const image17 = "/photography/rain-in-the-sunshine.webp";
const image18 = "/photography/pine-tree-lake.webp";
const image19 = "/photography/swamp-bridge.webp";

const itemData = [
	{
		img: image1,
		title: "Bird at the lake",
		category: "infrared",
	},
	{
		img: image2,
		title: "Nature lake red",
		category: "infrared",
	},
	{
		img: image3,
		title: "Nature lake white",
		category: "infrared",
	},
	{
		img: image4,
		title: "Roses white",
		category: "infrared",
	},
	{
		img: image5,
		title: "Roses red",
		category: "infrared",
	},
	{
		img: image6,
		title: "Tree at the lake",
		category: "infrared",
	},
	{
		img: image7,
		title: "Turn in the path",
		category: "infrared",
	},
	{
		img: image8,
		title: "Stone bridge in lake",
		category: "infrared",
	},
	{
		img: image9,
		title: "Wooden tower in the trees",
		category: "infrared",
	},
	{
		img: image10,
		title: "Grass and trees with lake and sky in the background",
		category: "infrared",
	},
	{
		img: image11,
		title: "Lake reeds and surface algae",
		category: "infrared",
	},
	{
		img: image12,
		title: "Zoo birds on lake",
		category: "infrared",
	},
	{
		img: image13,
		title: "Severe storm passing at sunset",
		category: "infrared",
	},
	{
		img: image14,
		title: "Severe storm passing road 1",
		category: "infrared",
	},
	{
		img: image15,
		title: "Severe storm passing road 2",
		category: "infrared",
	},
	{
		img: image16,
		title: "Rain on a sunny day 1",
		category: "infrared",
	},
	{
		img: image17,
		title: "Rain on a sunny day 2",
		category: "infrared",
	},
	{
		img: image18,
		title: "Pine tree with lake background on early spring day",
		category: "infrared",
	},
	{
		img: image19,
		title: "Bridge on marsh in summer forest and in shade",
		category: "infrared",
	},
];

export default function Photography() {
	return (
		<main>
			<Navbar />
			<div className="bg-black">
				<div className="page-banner-filler bg-black"></div>
				<div className="container resume-page mx-auto text-white">
					<h1 className="text-[32px] mt-5">Infrared Photography</h1>
					<p className="mt-5">
						A few years back, John was walking through an art show and stopped at a particular tent that drew his attention.
						There, art centered around the usage of light in extreme conditions. Drawn by the curiosity of what else could be
						done using light, John went on a journey to find out how color had been manipulated with light in the photography
						world.
					</p>
					<p className="mt-5">
						This led him to infrared styled photography. A style where common colors (red, green, blue) are heavily manipulated
						with light to create a completely new visual experience. The resulting process ends with photos that are either
						mostly red or mostly white as can be seen below.
					</p>
					<p className="mt-5">
						The goal of this art is to give us a look at everyday moments that we often take for granted and give us a new
						appreciation for how important light is to our perception of color.
					</p>
					<p className="mt-5">
						If you would like to see more, all of his photography is now available to view and is available for purchase at his
						new shopify website.
					</p>
					<div className="flex mt-5">
						<Link
							href="https://montanyecreative.store/"
							aria-label="Leave website to go to montanycreative.store"
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
				<div className="container mx-auto text-white">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-1">
						{itemData.map((item) => (
							<Image src={item.img} alt={item.title} key={item.title} className="infrared-photo" width="200" height="200" />
						))}
					</div>
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
