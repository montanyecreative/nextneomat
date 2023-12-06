"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import Image from "next/image";
import Link from "next/link";

const image1 = "/photography/bird-at-lake.jpg";
const image2 = "/photography/nature-lake-red.jpg";
const image3 = "/photography/nature-lake-white.jpg";
const image4 = "/photography/roses-white.jpg";
const image5 = "/photography/roses.jpg";
const image6 = "/photography/tree-at-lake.jpg";
const image7 = "/photography/turn-in-path-red.jpg";
const image8 = "/photography/lake-bridge.jpg";
const image9 = "/photography/tower-in-trees.jpg";
const image10 = "/photography/lake-sky-view.jpg";
const image11 = "/photography/lake-reeds-white.jpg";
const image12 = "/photography/zoo-bird-lake.jpg";
const image13 = "/photography/storm-sunset.JPG";
const image14 = "/photography/storm-severe-streeet.jpg";
const image15 = "/photography/storm-severe-street-2.jpg";
const image16 = "/photography/rain-on-sunny-day.jpg";
const image17 = "/photography/rain-in-the-sunshine.jpg";
const image18 = "/photography/pine-tree-lake.jpg";
const image19 = "/photography/swamp-bridge.jpg";

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
						This page includes some of the various photography styles I have worked with. I have personally taken and edited all
						the photos. If you would like to see more photography I have worked with, all of my photography is now available to
						view and is available for purchase at my new shopify website.
					</p>
					<div className="flex mt-5">
						<Link
							href="https://montanyecreative.store/"
							aria-label="Leave website to go to montanycreative.store"
							className="mx-auto"
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
