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
				{/*
					The kit CSS @imports a beacon from p.typekit.net, so both hosts are on the critical path.
					Opening the connections up front removes the DNS/TLS handshakes from that chain.
				*/}
				<link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
				<link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
				{/*
					The beacon is fetched up front so it runs alongside the kit CSS instead of after it.
					If the fonts in the Adobe project change, this URL changes too: copy the @import URL
					out of https://use.typekit.net/xhs0tix.css and update it here, or drop this line.
				*/}
				<link
					rel="preload"
					as="style"
					href="https://p.typekit.net/p.css?s=1&k=xhs0tix&ht=tk&f=139.140.173.174.175.176.25136.25137.14032.14033.14034.14035.14036.14037.49587.29382.29383&a=29534240&app=typekit&e=css"
					crossOrigin="anonymous"
				/>
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
