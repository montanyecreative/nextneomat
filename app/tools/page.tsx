"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ToolItem {
	id: string;
	name: string;
	href: string;
	category: string;
	description: string;
}

const tools: ToolItem[] = [
	{
		id: "decision-maker",
		name: "Decision Maker",
		href: "/tools/decision-maker",
		category: "Everyday",
		description: "A small app for helping you choose from a list of things.",
	},
	{
		id: "house-salary-calculator",
		name: "House Salary Calculator",
		href: "/tools/house-salary-calculator",
		category: "Finance",
		description: "A tool for helping find what mortgage/rent can be afforded",
	},
	{
		id: "the-lakinator",
		name: "The Lakinator",
		href: "https://www.thelakinator.app/",
		category: "Vacation",
		description: "An app for finding things to do in The Lake of the Ozarks, Missouri.",
	},
	{
		id: "the-bransonator",
		name: "The Bransonator",
		href: "https://www.thebransonator.app/",
		category: "Vacation",
		description: "An app for finding things to do in Branson, Missouri.",
	},
];

const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

export default function Tools() {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredTools = useMemo(() => {
		if (!searchQuery.trim()) {
			return tools;
		}

		const query = searchQuery.toLowerCase();
		return tools.filter(
			(tool) =>
				tool.name.toLowerCase().includes(query) ||
				tool.category.toLowerCase().includes(query) ||
				tool.description.toLowerCase().includes(query),
		);
	}, [searchQuery]);

	return (
		<main>
			<Navbar />
			<div className="bg-transparent">
				<div className="page-banner-filler bg-transparent"></div>
				<div className="container mx-auto pt-5 pb-20 text-white">
					<div className="tools-container">
						<h1 className="text-[32px] mt-5 text-center proxima-nova-semibold">Software &amp; Tools</h1>
						<p className="mt-2 mb-5 mx-auto sm:mx-5 md:mx-unset text-center aktiv-grotesk-regular">
							Here&apos;s a list of some of the web software and tools we&apos;ve built.
						</p>
						<div className="page-links-container mx-auto aktiv-grotesk-regular">
							<div className="glass-card rounded-lg mb-6">
								<div className="flex items-center px-3">
									<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
									<input
										type="text"
										placeholder="Type to search..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-[16px]"
									/>
								</div>
							</div>

							{filteredTools.length === 0 ? (
								<div className="py-6 text-center text-sm">No results found.</div>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
									{filteredTools.map((tool) => {
										const external = isExternalHref(tool.href);

										return (
											<Card
												key={tool.id}
												className="flex flex-col min-h-[175px] text-left rounded border-gray avatar-shadow p-6 gap-3"
											>
												<p className="text-xs tracking-wider text-white/55 proxima-nova-semibold uppercase">
													{tool.category}
												</p>
												<h3 className="text-xl leading-none tracking-tight proxima-nova-semibold text-left">
													{tool.name}
												</h3>
												<p className="text-sm text-white/70 aktiv-grotesk-regular leading-snug">
													{tool.description}
												</p>
												<div className="pt-4">
													<Link
														href={tool.href}
														aria-label={
															external
																? `Go to ${tool.name} tool (opens in a new tab)`
																: `Go to ${tool.name} tool`
														}
														{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
													>
														<Button
															variant="outline"
															className="rounded-full px-10 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
														>
															See Tool
														</Button>
													</Link>
												</div>
											</Card>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
