"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface WantsListItem {
	id: number;
	name: string;
	description: string;
	importance: "High" | "Medium" | "Low";
	price: string;
	amazonLink: string;
	itemLink: string;
}

export default function WantsList() {
	const [items, setItems] = useState<WantsListItem[]>(() => {
		const initialItems: WantsListItem[] = [
			{
				id: 1,
				name: "Kitchen Scissors",
				description: "Dishwasher safe, affordable kitchen scissors",
				importance: "High" as const,
				price: "$9.99",
				amazonLink: "",
				itemLink: "https://www.target.com/p/kitchenaid-utility-shears/-/A-53277187#lnk=sametab",
			},
			{
				id: 2,
				name: "Magnetic Knife Holder",
				description: "Knife holder for keeping my knives off the counter",
				importance: "Medium" as const,
				price: "$49.99",
				amazonLink: "",
				itemLink: "https://www.crateandbarrel.com/schmidt-brothers-acacia-18-magnetic-wall-bar/s108280",
			},
			{
				id: 3,
				name: "Crate and Barrel Gift Card",
				description: "For plates/cups/silverware that I own and need more of",
				importance: "Low" as const,
				price: "$0.01-50.00",
				amazonLink: "",
				itemLink: "https://www.crateandbarrel.com/gift-cards/",
			},
			{
				id: 4,
				name: "Mixing Bowls",
				description: "Dishwasher safe mixing bowls",
				importance: "Low" as const,
				price: "$49.95",
				amazonLink: "",
				itemLink: "https://www.crateandbarrel.com/anchor-hocking-glass-mixing-bowls-set-of-10/s354925",
			},
			{
				id: 5,
				name: "Measuring Spoons",
				description: "Dishwasher safe measuring spoons. I have no idea what happened to mine",
				importance: "Medium" as const,
				price: "$18.99",
				amazonLink: "",
				itemLink: "https://www.target.com/p/cuisinart-6pc-stainless-steel-magnetic-measuring-spoon-set/-/A-82429018#lnk=sametab",
			},
			{
				id: 6,
				name: "Toilet Paper Holder",
				description: "Toilet Paper Holder for main bathroom",
				importance: "Low" as const,
				price: "$39.00",
				amazonLink: "",
				itemLink: "https://www.crateandbarrel.com/yamazaki-white-toilet-paper-stand-with-tray/s313698",
			},
		];

		// Sort by importance (High to Low) on initial load
		return initialItems.sort((a, b) => {
			const importanceOrder = { High: 3, Medium: 2, Low: 1 };
			const aValue = importanceOrder[a.importance];
			const bValue = importanceOrder[b.importance];
			return bValue - aValue; // Descending order (High to Low)
		});
	});

	const [sortConfig, setSortConfig] = useState<{
		key: keyof WantsListItem;
		direction: "asc" | "desc";
	}>({ key: "importance", direction: "desc" });

	const sortItems = (key: keyof WantsListItem) => {
		let direction: "asc" | "desc" = "asc";
		if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });

		const sortedItems = [...items].sort((a, b) => {
			let aValue = a[key];
			let bValue = b[key];

			// Handle price sorting (remove $ and convert to number)
			if (key === "price") {
				aValue = parseFloat(aValue.toString().replace("$", ""));
				bValue = parseFloat(bValue.toString().replace("$", ""));
			}

			// Handle importance sorting
			if (key === "importance") {
				const importanceOrder = { High: 3, Medium: 2, Low: 1 };
				aValue = importanceOrder[aValue as "High" | "Medium" | "Low"];
				bValue = importanceOrder[bValue as "High" | "Medium" | "Low"];
			}

			if (aValue < bValue) {
				return direction === "asc" ? -1 : 1;
			}
			if (aValue > bValue) {
				return direction === "asc" ? 1 : -1;
			}
			return 0;
		});

		setItems(sortedItems);
	};

	const getSortIcon = (key: keyof WantsListItem) => {
		if (sortConfig?.key === key) {
			return sortConfig.direction === "asc" ? " ↑" : " ↓";
		}
		return "";
	};

	return (
		<main>
			<Navbar />
			<div className="bg-black">
				<div className="page-banner-filler bg-black"></div>
				<div className="container mx-auto pt-5 pb-20 text-white">
					<div className="tools-container mx-auto">
						<h1 className="text-[32px] mt-5 text-center">Wants List</h1>
						<p className="my-2 mx-auto sm:mx-5 md:mx-unset text-center">
							Thank you so much to anyone visiting this page and taking the time to look out for me! I am so grateful for you!
						</p>
						<div className="my-10 wants-list-container">
							<div className="overflow-x-auto">
								<Table className="w-full border-white border">
									<TableHeader>
										<TableRow className="border-gray-700 hover:bg-gray-800">
											<TableHead
												className="text-white cursor-pointer hover:text-blue-300"
												onClick={() => sortItems("name")}
											>
												Item name{getSortIcon("name")}
											</TableHead>
											<TableHead className="text-white">Description</TableHead>
											<TableHead
												className="text-white cursor-pointer hover:text-blue-300"
												onClick={() => sortItems("price")}
											>
												Price{getSortIcon("price")}
											</TableHead>
											<TableHead
												className="text-white cursor-pointer hover:text-blue-300"
												onClick={() => sortItems("importance")}
											>
												Importance{getSortIcon("importance")}
											</TableHead>
											{/* <TableHead className="text-white">Amazon</TableHead> */}
											<TableHead className="text-white">Item link</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{items.map((item) => (
											<TableRow key={item.id} className="border-gray-700 hover:bg-gray-800">
												<TableCell className="text-white font-medium">{item.name}</TableCell>
												<TableCell className="text-gray-300">{item.description}</TableCell>
												<TableCell className="text-white font-mono">{item.price}</TableCell>
												<TableCell className="text-white">
													<span
														className={`px-2 py-1 rounded-full text-xs font-medium ${
															item.importance === "High"
																? "bg-green-600 text-white"
																: item.importance === "Medium"
																? "bg-yellow-600 text-white"
																: "bg-gray-600 text-white"
														}`}
													>
														{item.importance}
													</span>
												</TableCell>
												<TableCell className="text-white">
													{item.itemLink ? (
														<a
															href={item.itemLink}
															target="_blank"
															rel="noopener noreferrer"
															className="text-white-400 hover:text-red hover:cursor-pointer underline"
														>
															View item
														</a>
													) : (
														<span className="text-white-400">-</span>
													)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</main>
	);
}
