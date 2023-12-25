"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";

export default function Tools() {
	return (
		<main>
			<Navbar />
			<div className="bg-black">
				<div className="page-banner-filler bg-black"></div>
				<div className="container mx-auto pt-5 pb-20 text-white">
					<div className="tools-container">
						<h1 className="text-[32px] mt-5 text-center">Tools</h1>
						<p className="mt-2 mb-5 mx-auto sm:mx-5 md:mx-unset text-center">
							Here&apos;s a list of some of the web tools we&apos;ve built.
						</p>
						<div className="page-links-container mx-auto md:mx-30">
							<Command className="rounded-lg border shadow-md">
								<CommandInput placeholder="Type a command or search..." className="text-[16px]" />
								<CommandList>
									<CommandEmpty>No results found.</CommandEmpty>
									<CommandGroup heading="Everyday">
										<CommandItem>
											<Link href="/tools/decision-maker" className="underline" aria-label="Go to Decision Maker tool">
												Decision Maker
											</Link>
										</CommandItem>
									</CommandGroup>
									<CommandSeparator className="bg-gray" />
									<CommandGroup heading="Finance">
										<CommandItem>
											<Link
												href="/tools/house-salary-calculator"
												className="underline"
												aria-label="Go to House Salary Calculator tool"
											>
												House Salary Calculator
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
