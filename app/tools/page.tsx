"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";

interface ToolItem {
	id: string;
	name: string;
	href: string;
	category: string;
}

const tools: ToolItem[] = [
	{
		id: "decision-maker",
		name: "Decision Maker",
		href: "/tools/decision-maker",
		category: "Everyday",
	},
	{
		id: "house-salary-calculator",
		name: "House Salary Calculator",
		href: "/tools/house-salary-calculator",
		category: "Finance",
	},
];

export default function Tools() {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredTools = useMemo(() => {
		if (!searchQuery.trim()) {
			return tools;
		}

		const query = searchQuery.toLowerCase();
		return tools.filter((tool) => tool.name.toLowerCase().includes(query) || tool.category.toLowerCase().includes(query));
	}, [searchQuery]);

	const groupedTools = useMemo(() => {
		const groups: Record<string, ToolItem[]> = {};
		filteredTools.forEach((tool) => {
			if (!groups[tool.category]) {
				groups[tool.category] = [];
			}
			groups[tool.category].push(tool);
		});
		return groups;
	}, [filteredTools]);

	const categories = Object.keys(groupedTools);

	// Flatten all tools to determine if an item is the last one
	const allFilteredTools = filteredTools;
	const isLastTool = (toolId: string) => {
		const lastIndex = allFilteredTools.length - 1;
		return allFilteredTools[lastIndex]?.id === toolId;
	};

	return (
		<main>
			<Navbar />
			<div className="bg-transparent">
				<div className="page-banner-filler bg-transparent"></div>
				<div className="container mx-auto pt-5 pb-20 text-white">
					<div className="tools-container">
						<h1 className="text-[32px] mt-5 text-center proxima-nova-semibold">Tools</h1>
						<p className="mt-2 mb-5 mx-auto sm:mx-5 md:mx-unset text-center aktiv-grotesk-regular">
							Here&apos;s a list of some of the web tools we&apos;ve built.
						</p>
						<div className="page-links-container mx-auto md:mx-30 aktiv-grotesk-regular">
							<div className="glass-card rounded-lg">
								{/* Search Input */}
								<div className="flex items-center border-b px-3">
									<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
									<input
										type="text"
										placeholder="Type to search..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-[16px]"
									/>
								</div>

								{/* Results List */}
								<div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
									{filteredTools.length === 0 ? (
										<div className="py-6 text-center text-sm">No results found.</div>
									) : (
										categories.map((category, categoryIndex) => (
											<div key={category}>
												{categoryIndex > 0 && <div className="-mx-1 h-px bg-white/20 my-1" />}
												<div className="overflow-hidden p-1 text-foreground">
													<div className="px-2 py-1.5 text-xs text-muted-foreground proxima-nova-semibold">
														{category}
													</div>
													{groupedTools[category].map((tool, toolIndex) => (
														<div key={tool.id}>
															<Link
																href={tool.href}
																className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground block`}
																aria-label={`Go to ${tool.name} tool`}
															>
																<span className="underline">{tool.name}</span>
															</Link>
														</div>
													))}
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
