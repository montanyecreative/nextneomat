"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";

interface BlogItem {
	id: string;
	name: string;
	href: string;
	category: string;
}

const blogs: BlogItem[] = [
	{
		id: "become-a-developer",
		name: "Want to become a website developer?",
		href: "/blogs/guides/become-a-developer",
		category: "Guides",
	},
	{
		id: "condo",
		name: "Condo",
		href: "/blogs/house-stuff/condo",
		category: "House Stuff",
	},
];

export default function Blogs() {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredBlogs = useMemo(() => {
		if (!searchQuery.trim()) {
			return blogs;
		}

		const query = searchQuery.toLowerCase();
		return blogs.filter((blog) => blog.name.toLowerCase().includes(query) || blog.category.toLowerCase().includes(query));
	}, [searchQuery]);

	const groupedBlogs = useMemo(() => {
		const groups: Record<string, BlogItem[]> = {};
		filteredBlogs.forEach((blog) => {
			if (!groups[blog.category]) {
				groups[blog.category] = [];
			}
			groups[blog.category].push(blog);
		});
		return groups;
	}, [filteredBlogs]);

	const categories = Object.keys(groupedBlogs);

	return (
		<main>
			<Navbar />
			<div className="bg-transparent">
				<div className="page-banner-filler bg-transparent"></div>
				<div className="container mx-auto pt-5 pb-20 text-white">
					<div className="blogs-container">
						<h1 className="text-[32px] mt-5 text-center proxima-nova-semibold">Blogs</h1>
						<p className="mt-2 mb-5 mx-auto sm:mx-5 md:mx-unset text-center aktiv-grotesk-regular">
							Here&apos;s a list of some of the blogs we&apos;ve created.
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
									{filteredBlogs.length === 0 ? (
										<div className="py-6 text-center text-sm">No results found.</div>
									) : (
										categories.map((category, categoryIndex) => (
											<div key={category}>
												{categoryIndex > 0 && <div className="-mx-1 h-px bg-white/20 my-1" />}
												<div className="overflow-hidden p-1 text-foreground">
													<div className="px-2 py-1.5 text-xs text-muted-foreground proxima-nova-semibold">
														{category}
													</div>
													{groupedBlogs[category].map((blog, blogIndex) => (
														<div key={blog.id}>
															<Link
																href={blog.href}
																className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground block"
																aria-label={`Go to ${blog.name}`}
															>
																<span className="underline">{blog.name}</span>
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
