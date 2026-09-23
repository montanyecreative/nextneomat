import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Montanye Creative",
	description: "Digital resume and services portfolio for Montanye Creative",
	icons: {
		icon: "/icon.webp",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="stylesheet" href="https://use.typekit.net/xhs0tix.css" />
			</head>
			<body className={inter.className}>
				{children}
				<GoogleAnalytics />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
