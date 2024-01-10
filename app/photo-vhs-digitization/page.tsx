"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const photo1 = "/restoration/mike-ocean-original-restored.webp";
const photo2 = "/restoration/mike-ocean-original.webp";
const usbCost = "+$14";

export default function PhotoVHSDigitization() {
	return (
		<main>
			<Navbar />
			<div className="digitization-page bg-black">
				<div className="sm:mx-auto md:mx-auto flex banner-home-copy">
					<ReactCompareSlider
						className="w-full comparison-slider"
						itemOne={<ReactCompareSliderImage src={photo1} srcSet={photo1} alt="Image one" className="slider-image-override" />}
						itemTwo={<ReactCompareSliderImage src={photo2} srcSet={photo2} alt="Image two" className="slider-image-override" />}
					/>
				</div>
			</div>
			<div className="container mx-auto py-5 digitization-page bg-black text-white">
				<h1 className="text-[32px] font-bold">Photo/VHS Digitization &amp; Restoration</h1>
				<p className="my-2 mx-auto sm:mx-5 md:mx-unset">
					Do you have tons of family photos laying in boxes? Have you been charged with sorting the family picture-books and have
					put it off because of how daunting it is? Have a bunch of old VHS tapes that you want to preserve?
				</p>
				<p className="my-2 mx-auto sm:mx-5 md:mx-unset">
					We use professional grade hardware and software to offer photo digitization and restoration services.
				</p>
				<p className="my-2 mx-auto sm:mx-5 md:mx-unset">
					We cover the basics of getting all your photos/VHS onto USB sticks and hard drives. We also offer three different levels
					of photo restoration that come with different price packages that involve enhancing your photos with varying different
					professional techniques and software.
				</p>
				<p className="my-2 mx-auto sm:mx-5 md:mx-unset">
					Through the same printing service as our Infrared Photography, we also are able to set you up with password protected
					shopping where you can have your favorite restored photos printed in much larger formats in either frames or on canvas
					for the cost of the materials and shipping and shipped straight to your door.
				</p>
				<p className="my-2 mx-auto sm:mx-5 md:mx-unset font-bold">
					At this time we do not support the digitization of negatives or slides. We are working on adding this service for
					slides, negatives, and medium format panoramic film in the future.
				</p>
				<p className="my-2 mx-auto sm:mx-5 md:mx-unset font-bold">*Maximum Phyiscal Photo Size 8.5 x 11.7 inches*</p>
				<p className="my-2 mx-auto sm:mx-5 md:mx-unset font-bold">
					*If photos are heavily damaged, they may automatically qualify for Photo Polishing Gold. We may not be able to restore
					very heavily damaged photos.*
				</p>
			</div>
			<div className="container sm:mx-auto md:mx-auto py-10 digitization-page bg-black text-white">
				<div className="cards grid grid-cols-1 md:grid-cols-3 text-center">
					<Card className="mr-2 my-5 md:my-unset rounded border-gray avatar-shadow">
						<CardHeader>
							<CardTitle className="card-title">Photo Digitization</CardTitle>
							<CardDescription className="card-price font-bold">
								Up to 200 Photos <br />
								$1/photo {usbCost} for USB
							</CardDescription>
						</CardHeader>
						<CardContent className="card-content">
							<ul>
								<li>- Scans in print photos</li>
								<li>- Run through very basic image enhancement software</li>
								<li>- Provided on USB or hard drive</li>
								<li>
									- Have favorites you want reprinted? Let us know and we can provide a shopping link to password
									protected shopping where you can reprint your digital photos and have them shipped to your door for the
									cost of the goods and shipping.
								</li>
							</ul>
						</CardContent>
						<CardFooter className="justify-center">
							<svg width="45" height="45" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M2 3C1.44772 3 1 3.44772 1 4V11C1 11.5523 1.44772 12 2 12H13C13.5523 12 14 11.5523 14 11V4C14 3.44772 13.5523 3 13 3H2ZM0 4C0 2.89543 0.895431 2 2 2H13C14.1046 2 15 2.89543 15 4V11C15 12.1046 14.1046 13 13 13H2C0.895431 13 0 12.1046 0 11V4ZM2 4.25C2 4.11193 2.11193 4 2.25 4H4.75C4.88807 4 5 4.11193 5 4.25V5.75454C5 5.89261 4.88807 6.00454 4.75 6.00454H2.25C2.11193 6.00454 2 5.89261 2 5.75454V4.25ZM12.101 7.58421C12.101 9.02073 10.9365 10.1853 9.49998 10.1853C8.06346 10.1853 6.89893 9.02073 6.89893 7.58421C6.89893 6.14769 8.06346 4.98315 9.49998 4.98315C10.9365 4.98315 12.101 6.14769 12.101 7.58421ZM13.101 7.58421C13.101 9.57302 11.4888 11.1853 9.49998 11.1853C7.51117 11.1853 5.89893 9.57302 5.89893 7.58421C5.89893 5.5954 7.51117 3.98315 9.49998 3.98315C11.4888 3.98315 13.101 5.5954 13.101 7.58421Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
						</CardFooter>
					</Card>
					<Card className="mr-2 my-5 md:my-unset rounded border-gray avatar-shadow">
						<CardHeader>
							<CardTitle className="card-title">Photo Polishing Silver</CardTitle>
							<CardDescription className="card-price font-bold">
								Up to 200 Photos <br /> $5/photo {usbCost} for USB
							</CardDescription>
						</CardHeader>
						<CardContent className="card-content">
							<ul>
								<li>- Scans in print photos</li>
								<li>- Run through image enhancement techniques and software</li>
								<li>- Provided on USB or hard drive</li>
								<li>
									- Have favorites you want reprinted? Let us know and we can provide a shopping link to password
									protected shopping where you can reprint your digital and polished photos and have them shipped to your
									door for the cost of the goods and shipping.
								</li>
							</ul>
						</CardContent>
						<CardFooter className="justify-center">
							<svg width="45" height="45" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-1">
								<path
									d="M2 3C1.44772 3 1 3.44772 1 4V11C1 11.5523 1.44772 12 2 12H13C13.5523 12 14 11.5523 14 11V4C14 3.44772 13.5523 3 13 3H2ZM0 4C0 2.89543 0.895431 2 2 2H13C14.1046 2 15 2.89543 15 4V11C15 12.1046 14.1046 13 13 13H2C0.895431 13 0 12.1046 0 11V4ZM2 4.25C2 4.11193 2.11193 4 2.25 4H4.75C4.88807 4 5 4.11193 5 4.25V5.75454C5 5.89261 4.88807 6.00454 4.75 6.00454H2.25C2.11193 6.00454 2 5.89261 2 5.75454V4.25ZM12.101 7.58421C12.101 9.02073 10.9365 10.1853 9.49998 10.1853C8.06346 10.1853 6.89893 9.02073 6.89893 7.58421C6.89893 6.14769 8.06346 4.98315 9.49998 4.98315C10.9365 4.98315 12.101 6.14769 12.101 7.58421ZM13.101 7.58421C13.101 9.57302 11.4888 11.1853 9.49998 11.1853C7.51117 11.1853 5.89893 9.57302 5.89893 7.58421C5.89893 5.5954 7.51117 3.98315 9.49998 3.98315C11.4888 3.98315 13.101 5.5954 13.101 7.58421Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
							<svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
								<path
									d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
							<svg width="45" height="45" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-1">
								<path
									d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
						</CardFooter>
					</Card>
					<Card className="mr-2 my-5 md:my-unset rounded border-gray avatar-shadow">
						<CardHeader>
							<CardTitle className="card-title">Photo Polishing Gold</CardTitle>
							<CardDescription className="card-price font-bold">
								Up to 50 Photos <br /> $10/photo {usbCost} for USB
							</CardDescription>
						</CardHeader>
						<CardContent className="card-content">
							<ul>
								<li>- Scans in print photos</li>
								<li>
									- Run through premium digital image enhancements from Photo Polishing Silver, then meticulously curated
									and enhanced one by one
								</li>
								<li>- Provided on USB or hard drive</li>
								<li>
									- Have favorites you want reprinted? Let us know and we can provide a shopping link to password
									protected shopping where you can reprint your digital and polished photos and have them shipped to your
									door for the cost of the goods and shipping.
								</li>
							</ul>
						</CardContent>
						<CardFooter className="justify-center">
							<svg width="45" height="45" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-1">
								<path
									d="M2 3C1.44772 3 1 3.44772 1 4V11C1 11.5523 1.44772 12 2 12H13C13.5523 12 14 11.5523 14 11V4C14 3.44772 13.5523 3 13 3H2ZM0 4C0 2.89543 0.895431 2 2 2H13C14.1046 2 15 2.89543 15 4V11C15 12.1046 14.1046 13 13 13H2C0.895431 13 0 12.1046 0 11V4ZM2 4.25C2 4.11193 2.11193 4 2.25 4H4.75C4.88807 4 5 4.11193 5 4.25V5.75454C5 5.89261 4.88807 6.00454 4.75 6.00454H2.25C2.11193 6.00454 2 5.89261 2 5.75454V4.25ZM12.101 7.58421C12.101 9.02073 10.9365 10.1853 9.49998 10.1853C8.06346 10.1853 6.89893 9.02073 6.89893 7.58421C6.89893 6.14769 8.06346 4.98315 9.49998 4.98315C10.9365 4.98315 12.101 6.14769 12.101 7.58421ZM13.101 7.58421C13.101 9.57302 11.4888 11.1853 9.49998 11.1853C7.51117 11.1853 5.89893 9.57302 5.89893 7.58421C5.89893 5.5954 7.51117 3.98315 9.49998 3.98315C11.4888 3.98315 13.101 5.5954 13.101 7.58421Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
							<svg width="45" height="45" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-1">
								<path
									d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
							<svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
								<path
									d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
							<svg width="45" height="45" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-1">
								<path
									d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
									fill="#D4AF37"
								></path>
							</svg>
						</CardFooter>
					</Card>
				</div>
			</div>
			<div className="container sm:mx-auto md:mx-auto digitization-page bg-black text-white">
				{/* <div className="cards grid grid-cols-1 md:grid-cols-2 text-center">
					<Card className="mr-2 rounded border-gray">
						<CardHeader>
							<CardTitle className="card-title">VHS Digitization</CardTitle>
							<CardDescription className="card-price">Price</CardDescription>
						</CardHeader>
						<CardContent className="card-content">
							<p className="my-1 mx-auto sm:mx-5 md:mx-unset">
								Scans in print photos, very basic digital image enhancements, provided on USB or hard drive.
							</p>
						</CardContent>
						<CardFooter className="justify-center">
							<svg width="45" height="45" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M4.76447 3.12199C5.63151 3.04859 6.56082 3 7.5 3C8.43918 3 9.36849 3.04859 10.2355 3.12199C11.2796 3.21037 11.9553 3.27008 12.472 3.39203C12.9425 3.50304 13.2048 3.64976 13.4306 3.88086C13.4553 3.90618 13.4902 3.94414 13.5133 3.97092C13.7126 4.20149 13.8435 4.4887 13.918 5.03283C13.9978 5.6156 14 6.37644 14 7.52493C14 8.66026 13.9978 9.41019 13.9181 9.98538C13.8439 10.5206 13.7137 10.8061 13.5125 11.0387C13.4896 11.0651 13.4541 11.1038 13.4296 11.1287C13.2009 11.3625 12.9406 11.5076 12.4818 11.6164C11.9752 11.7365 11.3143 11.7942 10.2878 11.8797C9.41948 11.9521 8.47566 12 7.5 12C6.52434 12 5.58052 11.9521 4.7122 11.8797C3.68572 11.7942 3.02477 11.7365 2.51816 11.6164C2.05936 11.5076 1.7991 11.3625 1.57037 11.1287C1.54593 11.1038 1.51035 11.0651 1.48748 11.0387C1.28628 10.8061 1.15612 10.5206 1.08193 9.98538C1.00221 9.41019 1 8.66026 1 7.52493C1 6.37644 1.00216 5.6156 1.082 5.03283C1.15654 4.4887 1.28744 4.20149 1.48666 3.97092C1.5098 3.94414 1.54468 3.90618 1.56942 3.88086C1.7952 3.64976 2.05752 3.50304 2.52796 3.39203C3.04473 3.27008 3.7204 3.21037 4.76447 3.12199ZM0 7.52493C0 5.28296 0 4.16198 0.729985 3.31713C0.766457 3.27491 0.815139 3.22194 0.854123 3.18204C1.63439 2.38339 2.64963 2.29744 4.68012 2.12555C5.56923 2.05028 6.52724 2 7.5 2C8.47276 2 9.43077 2.05028 10.3199 2.12555C12.3504 2.29744 13.3656 2.38339 14.1459 3.18204C14.1849 3.22194 14.2335 3.27491 14.27 3.31713C15 4.16198 15 5.28296 15 7.52493C15 9.74012 15 10.8477 14.2688 11.6929C14.2326 11.7348 14.1832 11.7885 14.1444 11.8281C13.3629 12.6269 12.3655 12.71 10.3709 12.8763C9.47971 12.9505 8.50782 13 7.5 13C6.49218 13 5.52028 12.9505 4.62915 12.8763C2.63446 12.71 1.63712 12.6269 0.855558 11.8281C0.816844 11.7885 0.767442 11.7348 0.731221 11.6929C0 10.8477 0 9.74012 0 7.52493ZM5.25 5.38264C5.25 5.20225 5.43522 5.08124 5.60041 5.15369L10.428 7.27105C10.6274 7.35853 10.6274 7.64147 10.428 7.72895L5.60041 9.84631C5.43522 9.91876 5.25 9.79775 5.25 9.61736V5.38264Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
						</CardFooter>
					</Card>
					<Card className="rounded border-gray">
						<CardHeader>
							<CardTitle className="card-title">VHS Polishing Gold</CardTitle>
							<CardDescription className="card-price">Price</CardDescription>
						</CardHeader>
						<CardContent className="card-content">
							<p className="my-1 mx-auto sm:mx-5 md:mx-unset">
								Scans in print photos, intermediate digital image enhancements, provided on USB or hard drive.
							</p>
						</CardContent>
						<CardFooter className="justify-center">
							<svg width="45" height="45" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M4.76447 3.12199C5.63151 3.04859 6.56082 3 7.5 3C8.43918 3 9.36849 3.04859 10.2355 3.12199C11.2796 3.21037 11.9553 3.27008 12.472 3.39203C12.9425 3.50304 13.2048 3.64976 13.4306 3.88086C13.4553 3.90618 13.4902 3.94414 13.5133 3.97092C13.7126 4.20149 13.8435 4.4887 13.918 5.03283C13.9978 5.6156 14 6.37644 14 7.52493C14 8.66026 13.9978 9.41019 13.9181 9.98538C13.8439 10.5206 13.7137 10.8061 13.5125 11.0387C13.4896 11.0651 13.4541 11.1038 13.4296 11.1287C13.2009 11.3625 12.9406 11.5076 12.4818 11.6164C11.9752 11.7365 11.3143 11.7942 10.2878 11.8797C9.41948 11.9521 8.47566 12 7.5 12C6.52434 12 5.58052 11.9521 4.7122 11.8797C3.68572 11.7942 3.02477 11.7365 2.51816 11.6164C2.05936 11.5076 1.7991 11.3625 1.57037 11.1287C1.54593 11.1038 1.51035 11.0651 1.48748 11.0387C1.28628 10.8061 1.15612 10.5206 1.08193 9.98538C1.00221 9.41019 1 8.66026 1 7.52493C1 6.37644 1.00216 5.6156 1.082 5.03283C1.15654 4.4887 1.28744 4.20149 1.48666 3.97092C1.5098 3.94414 1.54468 3.90618 1.56942 3.88086C1.7952 3.64976 2.05752 3.50304 2.52796 3.39203C3.04473 3.27008 3.7204 3.21037 4.76447 3.12199ZM0 7.52493C0 5.28296 0 4.16198 0.729985 3.31713C0.766457 3.27491 0.815139 3.22194 0.854123 3.18204C1.63439 2.38339 2.64963 2.29744 4.68012 2.12555C5.56923 2.05028 6.52724 2 7.5 2C8.47276 2 9.43077 2.05028 10.3199 2.12555C12.3504 2.29744 13.3656 2.38339 14.1459 3.18204C14.1849 3.22194 14.2335 3.27491 14.27 3.31713C15 4.16198 15 5.28296 15 7.52493C15 9.74012 15 10.8477 14.2688 11.6929C14.2326 11.7348 14.1832 11.7885 14.1444 11.8281C13.3629 12.6269 12.3655 12.71 10.3709 12.8763C9.47971 12.9505 8.50782 13 7.5 13C6.49218 13 5.52028 12.9505 4.62915 12.8763C2.63446 12.71 1.63712 12.6269 0.855558 11.8281C0.816844 11.7885 0.767442 11.7348 0.731221 11.6929C0 10.8477 0 9.74012 0 7.52493ZM5.25 5.38264C5.25 5.20225 5.43522 5.08124 5.60041 5.15369L10.428 7.27105C10.6274 7.35853 10.6274 7.64147 10.428 7.72895L5.60041 9.84631C5.43522 9.91876 5.25 9.79775 5.25 9.61736V5.38264Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
							<svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
								<path
									d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
							<svg width="45" height="45" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-1">
								<path
									d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
									fill="#D4AF37"
								></path>
							</svg>
						</CardFooter>
					</Card>
				</div> */}
				<div className="flex pb-20">
					<Link href="/contact" aria-label="Go to Contact page" className="mx-auto">
						<Button
							variant="outline"
							className="rounded-full px-10 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
						>
							Get in Touch
						</Button>
					</Link>
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
