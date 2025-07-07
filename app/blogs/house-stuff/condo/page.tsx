"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ImageGallery from "@/components/ImageGallery";

export default function Condo() {
	const condoImages = [
		"/blogs/1.webp",
		"/blogs/2.webp",
		"/blogs/3.webp",
		"/blogs/4.webp",
		"/blogs/5.webp",
		"/blogs/6.webp",
		"/blogs/7.webp",
		"/blogs/8.webp",
		"/blogs/9.webp",
		"/blogs/10.webp",
		"/blogs/11.webp",
		"/blogs/12.webp",
		"/blogs/13.webp",
		"/blogs/14.webp",
		"/blogs/15.webp",
		"/blogs/16.webp",
		"/blogs/17.webp",
		"/blogs/18.webp",
		"/blogs/19.webp",
		"/blogs/20.webp",
		"/blogs/21.webp",
		"/blogs/22.webp",
		"/blogs/23.webp",
		"/blogs/24.webp",
		"/blogs/25.webp",
		"/blogs/26.webp",
		"/blogs/27.webp",
		"/blogs/28.webp",
		"/blogs/29.png",
	];

	return (
		<main>
			<Navbar />
			<div className="page-banner-filler bg-black"></div>
			<div className="container sm:mx-auto md:mx-auto privacy-page bg-black text-white">
				<div className="grid grid-cols-1 pt-10 pb-20 mx-auto md:mx-20 justify-center">
					<div className="mb-8">
						<ImageGallery images={condoImages} alt="Property photos" />
					</div>
					<h2 className="text-[34px] mb-2 text-white">Manchester, MO 63088</h2>
					<p className="italic">2 Bed, 3 Bath</p>
					<p className="italic">Built In: 1997</p>
					<p className="italic">1,976sqft. 4,791.6sqft Lot</p>
					<h3 className="font-bold mt-3 mb-2">Overview</h3>
					<p className="my-1">
						Welcome to this fantastic Villa in popular The Crossings at Big Bend. From the front porch with its darling wicker
						swing, you enter the foyer and you are immediately impressed with the scenic backyard privacy and the
						sunlight-filled living room. This open and welcoming first floor features a powder room, gas fireplace, bay window
						w/ window seat, dining area and incredible enhanced kitchen with white cabinetry, newer stainless steel appliances
						and granite counters. Up the wide staircase to the second floor you arrive at the Primary Bedroom w/ large walk in 9
						x 6 closet, Ensuite Bath with separate jetted tub and walk-in shower, granite countertop. The second bedroom is
						adjacent to the full hall bathroom with shower and granite countertop. Down the hall is the Office/Landing w/ St.
						Louis Closet designed closet for convenient storage. The finished lower level has dry storage, laundry room and a
						fantastic rec room with just-laid new carpeting for a completely fresh and move-in ready feel. The Crossings at Big
						Bend is truly one of the area&apos;s favorite neighborhoods, known for its convenience to highways, shopping,
						subdivision pond & greenery, trees, and overall fantastic McBribe-built homes. New roof, siding, and shutters were
						just installed and will give you maintenance-free living for years to come! And isn&apos;t that what you desire most
						in your villa lifestyle? Call and book your tour today! These homes always go quickly!
					</p>
				</div>
			</div>
			<Footer />
		</main>
	);
}
