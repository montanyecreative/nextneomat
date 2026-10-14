import type { Metadata } from "next";
import PortfolioPage from "./PortfolioPage";

export const metadata: Metadata = {
	title: "Portfolio | Montanye Creative",
	description:
		"Selected work from Montanye Creative — e-commerce stores, headless platforms and production web applications, designed and built end to end.",
};

export default function Portfolio() {
	return <PortfolioPage />;
}
