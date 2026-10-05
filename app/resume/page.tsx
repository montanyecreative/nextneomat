import ResumePage from "./ResumePage";
import type { ResumeView } from "./experienceBullets";

/**
 * The only server side part of the resume page: it reads the view out of the URL so a shared
 * /resume?view=recruiter link arrives with the technical bullets and the corner card already
 * expanded, rather than painting the business view first and switching after hydration.
 *
 * Anything other than view=recruiter, including no parameter at all, is the business view.
 */
export default async function Resume({ searchParams }: { searchParams: Promise<{ view?: string | string[] }> }) {
	const { view } = await searchParams;
	const requested = Array.isArray(view) ? view[0] : view;
	const initialView: ResumeView = requested === "recruiter" ? "recruiter" : "business";

	return <ResumePage initialView={initialView} />;
}
