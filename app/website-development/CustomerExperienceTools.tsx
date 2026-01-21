"use client";

import { useRef } from "react";
import { useFadeInFromLeftOnScroll } from "@/components/animations";

export default function CustomerExperienceTools() {
	const contentRef = useRef<HTMLDivElement>(null);
	const title = "Customer experience, acquisition & retention tools";
	const description =
		"We can enhance your digital user experience with tools that provide site search optimization, email marketing, personalization, SEO, ADA compliance, and more.";
		const description2 = "We help you collect customer data, analyze it, and use it to improve your website and online presence.";
	const images = [
		{ src: "website-development/google-analytics-logo.webp", alt: "Google Analytics Logo", url: "https://marketingplatform.google.com/about/analytics/" },
		{ src: "website-development/constant-contact-logo.webp", alt: "Constant Contact Logo", url: "https://www.constantcontact.com/" },
		{ src: "website-development/basin-forms-logo.webp", alt: "Basin Forms Logo", url: "https://usebasin.com/" },
		{ src: "website-development/mailchimp-logo.webp", alt: "Mailchimp Logo", url: "https://mailchimp.com/" },
		{ src: "website-development/klaviyo-logo.webp", alt: "Klaviyo Logo", url: "https://www.klaviyo.com/" },
		{ src: "website-development/google-my-business-logo.webp", alt: "Google My Business Logo", url: "https://business.google.com/en-all/business-profile/" },
	];

	const contentStyles = useFadeInFromLeftOnScroll(contentRef);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div ref={contentRef} style={contentStyles.style} className="text-center md:text-left">
				<h3 className="mt-10 mb-5 md:pt-unset text-white text-[32px] proxima-nova-semibold">{title}</h3>
				<p className="text-white/90 aktiv-grotesk-regular mb-5">{description}</p>
				<p className="text-white/90 aktiv-grotesk-regular">{description2}</p>
			</div>
			<div className="md:col-span-2 flex items-center justify-center">
				<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
					{images.map((image, index) => (
						<div key={index} className="flex items-center justify-center">
							<a
								href={image.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Visit ${image.alt} website (opens in new tab)`}
								className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded transition-opacity hover:opacity-80"
							>
								<img src={image.src} alt={image.alt} width="175" height="55" className="w-[175px] h-[55px] object-contain" />
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
