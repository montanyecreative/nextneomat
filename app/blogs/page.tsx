"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

export default function Blogs() {
	return (
		<main>
			<Navbar />
			<div className="bg-black">
				<div className="page-banner-filler bg-black"></div>
				<div className="container mx-auto pt-5 pb-20 text-white">
					<div className="blogs-container">
						<h1 className="text-[32px] mt-5 text-center">Blogs</h1>
						<p className="mt-2 mb-5 mx-auto sm:mx-5 md:mx-unset text-center">
							Here&apos;s a list of some of the blogs we&apos;ve created.
						</p>
						<div className="page-links-container mx-auto md:mx-30">
							<Command className="rounded-lg border shadow-md">
								<CommandInput placeholder="Type to search..." className="text-[16px]" />
								<CommandList>
									<CommandEmpty>No results found.</CommandEmpty>
									<CommandGroup heading="Guides">
										<CommandItem>
											<Link
												href="/blogs/guides/become-a-developer"
												className="underline"
												aria-label="Go to want to become a website developer guide"
											>
												Want to become a website developer?
											</Link>
										</CommandItem>
									</CommandGroup>
									<CommandSeparator className="bg-gray" />
									<CommandGroup heading="House Stuff">
										<CommandItem>
											<Link href="/blogs/house-stuff/condo" className="underline" aria-label="Go to condo page">
												Condo
											</Link>
										</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</div>
					</div>
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
