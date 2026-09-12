/**
 * Google Analytics 4 — core client helpers.
 *
 * Every event this site sends goes through this module so that names and
 * parameters stay consistent with the GA4 recommended event schema. Import
 * from here; never call `window.gtag` directly.
 *
 * ---------------------------------------------------------------------------
 * REQUIRED GA ADMIN SETUP
 * ---------------------------------------------------------------------------
 * This site instruments its own events rather than relying on GA4 Enhanced
 * Measurement, so those built-in toggles MUST be turned off — otherwise every
 * event in this file is counted twice.
 *
 * Admin → Data Streams → web stream → Enhanced measurement → turn OFF:
 *   - Page changes based on browser history events (sub-option under Page views)
 *   - Scrolls
 *   - Outbound clicks
 *   - Site search
 *   - Video engagement
 *   - File downloads
 *   - Form interactions
 *
 * Leave the top-level "Page views" toggle ON. With `send_page_view: false` in
 * the config call it emits nothing on its own, and switching it off disables
 * the whole Enhanced Measurement panel.
 *
 * ---------------------------------------------------------------------------
 * VERIFYING
 * ---------------------------------------------------------------------------
 * 1. `NEXT_PUBLIC_GA_DEBUG=true npm run dev`
 * 2. GA → Admin → DebugView, then navigate between pages, scroll to the bottom,
 *    click an outbound link in the footer, and submit the contact form.
 * 3. Every event is also logged to the console as `[ga4] <name> {params}`.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-BW0S6W4YJ4";

/**
 * Events are sent in production. In development they are only sent when
 * NEXT_PUBLIC_GA_DEBUG=true, so local work does not pollute the property.
 */
export const GA_ENABLED =
	Boolean(GA_MEASUREMENT_ID) && (process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_GA_DEBUG === "true");

/** Logs every event to the console. Useful while wiring up new tracking. */
export const GA_VERBOSE = process.env.NEXT_PUBLIC_GA_DEBUG === "true";

type GtagParams = Record<string, unknown>;

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
	}
}

/** Low-level escape hatch. Prefer the named helpers below. */
export function gaEvent(name: string, params: GtagParams = {}): void {
	if (typeof window === "undefined") return;

	if (GA_VERBOSE) {
		// eslint-disable-next-line no-console
		console.debug("[ga4]", name, params);
	}

	if (!GA_ENABLED || typeof window.gtag !== "function") return;

	window.gtag("event", name, params);
}

/* -------------------------------------------------------------------------- */
/* Page views                                                                  */
/* -------------------------------------------------------------------------- */

export function trackPageView(url: string, title?: string): void {
	if (typeof window === "undefined") return;

	// The History API has already updated the URL by the time this runs, so
	// window.location is the source of truth for the page GA should record.
	gaEvent("page_view", {
		page_location: window.location.href,
		page_path: url,
		page_title: title || document.title,
	});
}

/* -------------------------------------------------------------------------- */
/* Scroll depth                                                                */
/* -------------------------------------------------------------------------- */

export function trackScroll(percentScrolled: number): void {
	gaEvent("scroll", { percent_scrolled: percentScrolled });
}

/* -------------------------------------------------------------------------- */
/* Outbound clicks                                                             */
/* -------------------------------------------------------------------------- */

export interface LinkContext {
	url: string;
	domain?: string;
	id?: string;
	classes?: string;
	text?: string;
}

export function trackOutboundClick(link: LinkContext): void {
	gaEvent("click", {
		link_url: link.url,
		link_domain: link.domain,
		link_id: link.id || undefined,
		link_classes: link.classes || undefined,
		link_text: link.text || undefined,
		outbound: true,
	});
}

/** mailto: / tel: links — not covered by GA4's outbound click definition. */
export function trackContactClick(method: "email" | "phone", value: string, text?: string): void {
	gaEvent("contact_click", {
		contact_method: method,
		contact_value: value,
		link_text: text || undefined,
	});
}

/* -------------------------------------------------------------------------- */
/* File downloads                                                              */
/* -------------------------------------------------------------------------- */

export function trackFileDownload(file: { url: string; name: string; extension: string; text?: string }): void {
	gaEvent("file_download", {
		file_name: file.name,
		file_extension: file.extension,
		link_url: file.url,
		link_text: file.text || undefined,
	});
}

/* -------------------------------------------------------------------------- */
/* Site search (wired up when a search UI ships)                               */
/* -------------------------------------------------------------------------- */

export function trackSearch(searchTerm: string, options: { resultsCount?: number; category?: string } = {}): void {
	gaEvent("view_search_results", {
		search_term: searchTerm,
		results_count: options.resultsCount,
		search_category: options.category,
	});
}

/** Fires when a visitor picks a result, so search quality can be measured. */
export function trackSearchResultClick(searchTerm: string, resultUrl: string, position?: number): void {
	gaEvent("select_search_result", {
		search_term: searchTerm,
		link_url: resultUrl,
		result_position: position,
	});
}

/* -------------------------------------------------------------------------- */
/* Video engagement (wired up when video ships)                                */
/* -------------------------------------------------------------------------- */

export interface VideoContext {
	title: string;
	url: string;
	duration: number;
	currentTime: number;
	percent: number;
	provider: "youtube" | "vimeo" | "html5";
}

function videoParams(video: VideoContext): GtagParams {
	return {
		video_title: video.title,
		video_url: video.url,
		video_duration: Math.round(video.duration),
		video_current_time: Math.round(video.currentTime),
		video_percent: video.percent,
		video_provider: video.provider,
		visible: true,
	};
}

export function trackVideoStart(video: VideoContext): void {
	gaEvent("video_start", videoParams(video));
}

export function trackVideoProgress(video: VideoContext): void {
	gaEvent("video_progress", videoParams(video));
}

export function trackVideoComplete(video: VideoContext): void {
	gaEvent("video_complete", videoParams(video));
}

/* -------------------------------------------------------------------------- */
/* Forms                                                                       */
/* -------------------------------------------------------------------------- */

export interface FormContext {
	id: string;
	name: string;
	destination?: string;
	submitText?: string;
}

function formParams(form: FormContext, extra: GtagParams = {}): GtagParams {
	return {
		form_id: form.id,
		form_name: form.name,
		form_destination: form.destination,
		form_submit_text: form.submitText,
		...extra,
	};
}

/** Fires once per page, on the visitor's first interaction with the form. */
export function trackFormStart(form: FormContext): void {
	gaEvent("form_start", formParams(form));
}

export function trackFormSubmit(form: FormContext): void {
	gaEvent("form_submit", formParams(form));
}

/** Submission accepted by the backend — the event worth marking as a conversion. */
export function trackFormSuccess(form: FormContext): void {
	gaEvent("generate_lead", formParams(form));
}

export function trackFormError(form: FormContext, reason: string, fields?: string[]): void {
	gaEvent("form_error", formParams(form, { error_reason: reason, error_fields: fields ? fields.join(",") : undefined }));
}
