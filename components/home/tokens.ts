/**
 * Styling for the homepage sections.
 *
 * The shared tokens now live in components/site/tokens.ts, because the Website Development page
 * and the project intake form use the same ones. They are re-exported here so the homepage
 * sections can keep importing from their own module.
 */

export {
	SECTION_X,
	CONTAINER,
	SECTION_HEADING,
	BODY_TEXT,
	CARD,
	FOCUS_RING,
	PILL_PRIMARY,
	PILL_SECONDARY,
	TEXT_LINK,
} from "@/components/site/tokens";
