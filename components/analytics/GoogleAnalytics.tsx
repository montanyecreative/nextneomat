import Script from "next/script";
import { GA_ENABLED, GA_MEASUREMENT_ID, GA_VERBOSE } from "@/lib/gtag";
import AnalyticsListeners from "./AnalyticsListeners";

/**
 * Loads gtag.js and mounts the listeners that produce every automatic event
 * (page views, scroll depth, outbound clicks, file downloads).
 *
 * `send_page_view: false` is deliberate: the initial page view is sent by
 * AnalyticsPageViews so that first load and client-side navigations are
 * reported through exactly one code path.
 */
export default function GoogleAnalytics() {
	if (!GA_ENABLED) return null;

	return (
		<>
			<Script
				id="ga4-src"
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
			/>
			<Script id="ga4-init" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					window.gtag = gtag;
					gtag('js', new Date());
					gtag('config', '${GA_MEASUREMENT_ID}', {
						send_page_view: false,
						debug_mode: ${GA_VERBOSE}
					});
				`}
			</Script>
			<AnalyticsListeners />
		</>
	);
}
