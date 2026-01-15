"use client";

import { useEffect, useState } from "react";
import AnimatedTextLines from "../../components/AnimatedTextLines";
import { X } from "lucide-react";

type WebsiteSolution = {
	title: string;
	// Placeholder for future richer content
	description?: string;
};

export default function WebsiteSolutions() {
	const solutions: WebsiteSolution[] = [
		{ title: "Multi-Page Business or Personal websites" },
		{ title: "Single Page Landing Page websites" },
		{ title: "Portfolio websites" },
		{ title: "Save the Date wedding websites" },
		{ title: "Small to medium Shopify websites" },
		{ title: "Hosting/application optimization" },
		{ title: "Overall cost reduction" },
		{ title: "Core Web Vital Optimization" },
		{ title: "ADA Compliance" },
	];

	const [selectedSolution, setSelectedSolution] = useState<WebsiteSolution | null>(null);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (selectedSolution) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [selectedSolution]);

	// Close modal on Escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && selectedSolution) {
				setSelectedSolution(null);
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [selectedSolution]);

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{solutions.map((solution, index) => (
					<div
						key={index}
						className="glass-form-deep-blue text-white p-4 rounded group hover:cursor-pointer text-left"
						onClick={() => setSelectedSolution(solution)}
					>
						{/* Match FeatureGrid hover underline animation */}
						<AnimatedTextLines className="aktiv-grotesk-regular transition-colors text-[16px] animated-underline">
							{solution.title}
						</AnimatedTextLines>
					</div>
				))}
			</div>

			{selectedSolution && (
				<div
					className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-in fade-in-0"
					onClick={() => setSelectedSolution(null)}
				>
					<div
						className="glass-form-deep-blue border-white/15 text-white p-8 max-w-2xl w-full rounded-2xl relative animate-in zoom-in-95 slide-in-from-bottom-2"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setSelectedSolution(null)}
							className="absolute right-4 top-4 rounded-full w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white opacity-70 hover:opacity-100 transition-all"
							aria-label="Close modal"
						>
							<X className="h-4 w-4" />
						</button>

						<div className="flex flex-col">
							<h2 className="text-2xl mb-4 proxima-nova-semibold">{selectedSolution.title}</h2>
							<p className="aktiv-grotesk-regular text-white/90">More details coming soon.</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
