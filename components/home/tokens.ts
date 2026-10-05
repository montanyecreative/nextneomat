/**
 * Shared styling for the homepage sections.
 *
 * The approved design scales type and spacing with container query units against a
 * wrapper carrying `container-type: inline-size`. That property also makes the wrapper
 * the containing block for fixed position descendants, which breaks the GSAP pin in the
 * project slider, so the handoff's second option is used here: the same values expressed
 * as clamp() with vw.
 */

/**
 * Horizontal page gutter. The design's clamp(20px, 5cqi, 64px) holds through tablet, then
 * doubles from lg up so the full width bands breathe on desktop instead of running to the edge.
 */
export const SECTION_X = "px-[clamp(20px,5vw,64px)] lg:px-[clamp(40px,10vw,128px)]";

/**
 * Full width column used by every section. There is no max width: sections span the viewport
 * and only the gutter holds content off the edges. Line length is kept readable by the max-w
 * on the paragraphs themselves rather than by capping the column.
 */
export const CONTAINER = `mx-auto w-full box-border ${SECTION_X}`;

/** Section heading, clamp(30px, 3.6cqi, 48px) in the design. */
export const SECTION_HEADING =
	"m-0 aktiv-grotesk-semibold text-white text-[clamp(30px,3.6vw,48px)] leading-[1.1] tracking-[-0.015em]";

/** Body copy colour from the design tokens. */
export const BODY_TEXT = "aktiv-grotesk-regular text-[#c4c4c4]";

/** Small label colour used for the lane headings. */
export const LABEL_TEXT = "aktiv-grotesk-semibold text-[#a3a3a3]";

/** Card surface: 12px radius on a #333333 hairline. */
export const CARD = "box-border rounded-[12px] border border-[#333333]";

/** Keyboard focus ring. White rather than crimson so it stays visible on both bands. */
export const FOCUS_RING =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

/**
 * Pill button matching the Get in Touch buttons elsewhere on the site: rounded-full, uppercase,
 * 12px with wide letter spacing. Minimum 52px tall, which also satisfies the 44px target rule.
 */
const PILL_BASE = `inline-flex items-center justify-center min-h-[52px] px-10 box-border rounded-full border text-[12px] uppercase tracking-[1.5px] aktiv-grotesk-semibold no-underline transition-colors duration-300 ${FOCUS_RING}`;

/**
 * The inverse of Get in Touch: filled crimson where that one is an outline. Hovering lifts the
 * fill a shade rather than emptying it out. White on crimson passes AA; crimson text on black
 * does not, so it is never used for copy.
 */
export const PILL_PRIMARY = `${PILL_BASE} bg-mcRed border-mcRed text-white hover:bg-[#8f1b35] hover:border-[#8f1b35]`;

/** Get in Touch itself: an outline that fills with crimson on hover. */
export const PILL_SECONDARY = `${PILL_BASE} bg-transparent border-white text-white hover:bg-mcRed hover:border-mcRed hover:text-white`;

/** Underlined text link, kept at a 44px tall tap target. */
export const TEXT_LINK = `inline-flex items-center min-h-[44px] text-white aktiv-grotesk-semibold underline underline-offset-4 ${FOCUS_RING}`;
