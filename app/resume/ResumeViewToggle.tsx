"use client";

import { useEffect, useState } from "react";
import { trackButtonClick, trackToggle } from "@/lib/gtag";
import { EXPAND_MS, useResumeView } from "./resumeView";

/**
 * The two resumes, served from public/resumes/ under URL safe names. The download attribute carries
 * the name the file should land under, which is the name on the documents themselves.
 */
const RESUME_DOWNLOADS = [
	{
		href: "/resumes/john-montanye-salesforce-resume.pdf",
		fileName: "John Montanye - Salesforce Resume.pdf",
		label: "Download Salesforce resume (PDF)",
	},
	{
		href: "/resumes/john-montanye-react-resume.pdf",
		fileName: "John Montanye - React Resume.pdf",
		label: "Download React JS resume (PDF)",
	},
];

const LABEL_ID = "resume-view-switch-label";

/** Every event from this component reports the same location. */
const LOCATION = "resume";

/** The switch's own label, so the event reads the same as the page does. */
const SWITCH_TEXT = "See my resume as a recruiter";

/**
 * The delegated listener in AnalyticsListeners already counts a resume as a
 * file_download. This is the second, narrower event: which of the two was
 * taken, by the name on the document rather than by URL.
 */
function handleDownload(resume: (typeof RESUME_DOWNLOADS)[number]) {
	trackButtonClick({ name: "resume_download", location: LOCATION, text: resume.label, value: resume.fileName });
}

/** White ring on the black card, so focus stays visible on the switch and both downloads. */
const FOCUS_RING =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000]";

function prefersReducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The corner control, fixed to the bottom right of the viewport in the spot the coffee widget uses
 * on the other pages. Collapsed it is a pill holding the label and the switch; switched on it grows
 * upward into a card that also carries the two resume downloads.
 *
 * It renders high in the page source, right after the profile summary, so keyboard and screen
 * reader users reach it near the top of the page instead of after every bullet.
 */
export default function ResumeViewToggle() {
	const { view, toggle } = useResumeView();
	const on = view === "recruiter";

	/*
		The downloads leave the DOM entirely when the card is closed, so nobody can tab to a button
		they cannot see. Closing animates first and unmounts after, which is why this trails the view
		rather than reading from it directly.
	*/
	const [downloadsMounted, setDownloadsMounted] = useState(on);
	const [downloadsOpen, setDownloadsOpen] = useState(on);

	useEffect(() => {
		if (on) {
			// The mount has to be committed on its own before the open can animate off it, so this
			// deliberately renders twice. Deriving the flag instead would collapse the two into one
			// paint and the card would jump open with no transition.
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setDownloadsMounted(true);
			// Mount closed, then open on the next frame, so the height has something to animate from.
			const frame = requestAnimationFrame(() => setDownloadsOpen(true));
			return () => cancelAnimationFrame(frame);
		}

		setDownloadsOpen(false);

		if (prefersReducedMotion()) {
			setDownloadsMounted(false);
			return;
		}

		const timer = setTimeout(() => setDownloadsMounted(false), EXPAND_MS);
		return () => clearTimeout(timer);
	}, [on]);

	/** Reports the view being switched into, which is the one the reader asked for. */
	function handleToggle() {
		trackToggle(
			{ name: "resume_view", location: LOCATION, text: SWITCH_TEXT, value: on ? "business" : "recruiter" },
			on ? "off" : "on",
		);
		toggle();
	}

	return (
		<div
			id="resume-view-corner"
			className={`fixed bottom-[max(24px,env(safe-area-inset-bottom))] right-[max(24px,env(safe-area-inset-right))] z-50 box-border max-w-[calc(100vw-48px)] bg-[#000000] text-left text-white shadow-[0_8px_24px_rgba(0,0,0,0.55)] transition-[padding,border-radius,border-color,width] duration-200 motion-reduce:transition-none ${
				on
					? "w-[344px] rounded-2xl border border-[#c6284a] p-[14px]"
					: "rounded-full border border-[#333333] py-[6px] pl-[18px] pr-[10px]"
			}`}
		>
			{downloadsMounted ? (
				<div
					className="grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none"
					style={{ gridTemplateRows: downloadsOpen ? "1fr" : "0fr" }}
				>
					<div className="min-h-0 overflow-hidden">
						<div
							className={`flex flex-col gap-2 pb-3 transition-opacity duration-200 motion-reduce:transition-none ${
								downloadsOpen ? "opacity-100" : "opacity-0"
							}`}
						>
							{RESUME_DOWNLOADS.map((resume) => (
								<a
									key={resume.href}
									href={resume.href}
									download={resume.fileName}
									onClick={() => handleDownload(resume)}
									className={`box-border flex min-h-[44px] items-center justify-center rounded-full border border-white px-4 py-2 text-center text-[14px] leading-[1.35] no-underline proxima-nova-semibold hover:bg-[#c6284a] hover:border-[#c6284a] ${FOCUS_RING}`}
								>
									{resume.label}
								</a>
							))}
						</div>
					</div>
				</div>
			) : null}
			<div
				className={`flex items-center justify-between gap-3 transition-[padding,border-color] duration-200 motion-reduce:transition-none ${
					on ? "border-t border-[#333333] pl-[6px] pt-[10px]" : "border-t border-transparent"
				}`}
			>
				{/*
					Both labels live in the element the switch is named by, and the one that does not apply
					is display:none, so the switch's accessible name is whichever label is on screen.
				*/}
				<span id={LABEL_ID} className="text-[15px] leading-[1.4] proxima-nova-semibold">
					<span className="hidden min-[480px]:inline">See my resume as a recruiter</span>
					<span className="min-[480px]:hidden">Recruiter view</span>
				</span>
				<button
					type="button"
					role="switch"
					aria-checked={on}
					aria-labelledby={LABEL_ID}
					onClick={handleToggle}
					className={`flex-none inline-flex min-h-[44px] cursor-pointer items-center gap-[10px] rounded-full border-0 bg-transparent p-0 text-[14px] proxima-nova-semibold ${
						on ? "text-white" : "text-[#c4c4c4]"
					} ${FOCUS_RING}`}
				>
					{/* Only the off state is worded. Switched on, the crimson track and the open card say it. */}
					{on ? null : <span>Off</span>}
					<span
						aria-hidden="true"
						className={`relative inline-block h-[28px] w-[48px] flex-none rounded-full transition-colors duration-200 motion-reduce:transition-none ${
							on ? "bg-[#c6284a]" : "bg-[#6e6e6e]"
						}`}
					>
						<span
							className={`absolute left-[3px] top-[3px] h-[22px] w-[22px] rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none ${
								on ? "translate-x-[20px]" : "translate-x-0"
							}`}
						/>
					</span>
				</button>
			</div>
		</div>
	);
}
