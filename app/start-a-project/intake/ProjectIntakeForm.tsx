"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useFormAnalytics } from "@/components/analytics/useFormAnalytics";
import { trackButtonClick } from "@/lib/gtag";
import {
	BODY_TEXT,
	CARD,
	FOCUS_RING,
	NOTE_TEXT,
	CONTAINER,
	PILL_PRIMARY,
	PILL_SECONDARY,
	SECTION_HEADING,
	SECTION_X,
} from "@/components/site/tokens";
import {
	buildTypeOptions,
	calculatorNeedsMap,
	digitizeOptions,
	errorCopy,
	isEmail,
	labelOf,
	needsOptions,
	platformOptions,
	printsTopicOptions,
	reachOptions,
	routeHeading,
	serverErrorFor,
	timelineOptions,
	topicOptions,
	type Option,
	type Topic,
} from "./data";
import { CheckboxCardGroup, RadioCardGroup, RadioChipGroup, RadioRowGroup, TextField } from "./fields";

/**
 * Back and Continue sit at the two ends of each step's footer, so neither can be sized off the
 * other in CSS. Both take the same floor instead: 168px clears "Continue" at its widest, which
 * leaves the pair matched and keeps Back the same width on every step. The longer send labels on
 * the last step run past it and are unaffected.
 */
const NAV_PILL = "min-w-[168px]";

/** Reported with every event from this form. */
const FORM = { id: "project-intake", name: "Project intake", destination: "/api/intake" };
const LOCATION = "project_intake";

/**
 * Per-tab, so a refresh picks up where the visitor left off instead of starting a second partial
 * row for the same person. It holds their answers, so it is deliberately sessionStorage rather
 * than localStorage: closing the tab clears it.
 */
const STORAGE_KEY = "mc-project-intake-v1";

type Step = "basics" | "branch" | "final" | "done";
type Errors = Partial<Record<"name" | "email" | "topic" | "buildType" | "printsTopic" | "phone", string>>;

/** The row the API created, and the one-time token that authorises updating it. */
type Submission = { id: string; token: string };

const EMPTY_ANSWERS = {
	name: "",
	email: "",
	topic: "" as Topic | "",
	buildType: "",
	platform: "",
	needs: [] as string[],
	timeline: "",
	currentSite: "",
	printsTopic: "",
	orderNumber: "",
	digitize: [] as string[],
	itemCount: "",
	details: "",
	phone: "",
	reach: "email",
};

type Answers = typeof EMPTY_ANSWERS;

/** The radio groups, which report a single chosen value rather than a list. */
type RadioKey = "topic" | "buildType" | "platform" | "timeline" | "printsTopic" | "reach";

type StoredSession = { id: string; token: string; answers: Answers; step: Step };

/**
 * The branch answers for one topic, with blanks left out so absent beats empty in the database.
 * The API validates this against the topic already stored on the row and rejects any field the
 * branch did not ask for, which is why platform only goes along with a migration.
 */
function branchAnswersFor(topic: Topic, answers: Answers): Record<string, unknown> {
	if (topic === "website") {
		const out: Record<string, unknown> = { buildType: answers.buildType };
		if (answers.buildType === "migration" && answers.platform) out.platform = answers.platform;
		if (answers.needs.length > 0) out.needs = answers.needs;
		if (answers.timeline) out.timeline = answers.timeline;
		if (answers.currentSite.trim()) out.currentSite = answers.currentSite.trim();
		return out;
	}

	if (topic === "prints") {
		const out: Record<string, unknown> = { printsTopic: answers.printsTopic };
		if (answers.orderNumber.trim()) out.orderNumber = answers.orderNumber.trim();
		return out;
	}

	if (topic === "digitization") {
		const out: Record<string, unknown> = {};
		if (answers.digitize.length > 0) out.digitize = answers.digitize;
		if (answers.itemCount.trim()) out.itemCount = answers.itemCount.trim();
		return out;
	}

	// "Something else" has no questions of its own.
	return {};
}

/** The last step's fields. Only the contact preference is required. */
function finalAnswersFor(answers: Answers) {
	const out: { details?: string; phone?: string; reach: string } = { reach: answers.reach };
	if (answers.details.trim()) out.details = answers.details.trim();
	if (answers.phone.trim()) out.phone = answers.phone.trim();
	return out;
}

/** The 1-based position of a step in the flow this visitor is actually walking. */
function positionOf(which: Step, skippedBasics: boolean, total: number): number {
	if (which === "basics") return 1;
	if (which === "branch") return skippedBasics ? 1 : 2;
	return skippedBasics ? 2 : total;
}

/** The progress text is the accessible indicator. The bar beside it is decorative. */
function Progress({ current, total }: { current: number; total: number }) {
	return (
		<>
			<p className="m-0 text-[15px] leading-[1.4] aktiv-grotesk-semibold text-[#c4c4c4]">
				Step {current} of {total}
			</p>
			<div aria-hidden="true" className="mt-2.5 flex gap-1.5">
				{Array.from({ length: total }, (_, index) => (
					<div key={index} className={`flex-[1_1_0] h-1 rounded-full ${index < current ? "bg-mcRed" : "bg-[#333333]"}`} />
				))}
			</div>
		</>
	);
}

function FormCard({ children }: { children: React.ReactNode }) {
	return <div className={`${CARD} bg-[#000000] p-[clamp(24px,4vw,48px)] [color-scheme:dark]`}>{children}</div>;
}

/** A field bots fill in and people never see. */
function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
	return (
		<div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
			<label htmlFor="intake-company">Company</label>
			<input
				id="intake-company"
				name="company"
				type="text"
				tabIndex={-1}
				autoComplete="off"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
}

/**
 * Where a save failure is reported, as opposed to a problem with the answers. The container stays
 * mounted so the message is announced when it arrives: a live region added at the same time as its
 * text is not reliably read out.
 */
function SaveError({ message }: { message: string | null }) {
	return (
		<div aria-live="assertive">
			{message ? (
				<p className="mt-6 mb-0 rounded-[8px] border border-[#ff8da1] bg-[#2a0d14] px-4 py-3 text-[15px] leading-[1.5] text-[#ff8da1] aktiv-grotesk-semibold">
					{message}
				</p>
			) : null}
		</div>
	);
}

export default function ProjectIntakeForm() {
	const searchParams = useSearchParams();
	const { executeRecaptcha } = useGoogleReCaptcha();
	const analytics = useFormAnalytics(FORM);
	const [step, setStep] = useState<Step>("basics");
	const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
	const [errors, setErrors] = useState<Errors>({});
	const [honeypot, setHoneypot] = useState("");
	/** The row the API holds, from the end of step 1 onward. */
	const [submission, setSubmission] = useState<Submission | null>(null);
	const [pending, setPending] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);
	/** True while the visitor came straight from the calculator and has not filled in step 1. */
	const [skippedBasics, setSkippedBasics] = useState(false);
	const [calculator, setCalculator] = useState<{ toggles: string[]; estimate: string | null }>({
		toggles: [],
		estimate: null,
	});

	const basicsHeadingRef = useRef<HTMLHeadingElement>(null);
	const routeHeadingRef = useRef<HTMLHeadingElement>(null);
	const finalHeadingRef = useRef<HTMLHeadingElement>(null);
	const doneHeadingRef = useRef<HTMLHeadingElement>(null);
	const nameRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
	const emailRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
	const phoneRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
	const topicRef = useRef<HTMLInputElement>(null);
	const buildTypeRef = useRef<HTMLInputElement>(null);
	const printsTopicRef = useRef<HTMLInputElement>(null);
	/** Nothing is focused on first paint, only when the step changes under the visitor. */
	const hasRendered = useRef(false);
	/** A restored session lands on a later step during mount, which is not a step the visitor moved to. */
	const restoring = useRef(false);

	/**
	 * Read the calculator handoff once, ignoring anything unrecognised.
	 *
	 * This page is prerendered, so the query string is not readable until the browser has it. The
	 * handoff seeds answers the visitor then edits, so it has to land in state rather than be
	 * derived — which is what the set-state-in-effect rule is waived for here and below.
	 */
	useEffect(() => {
		if (searchParams.get("from") !== "calculator") return;
		const toggles = (searchParams.get("calc") ?? "")
			.split(",")
			.map((entry) => entry.trim())
			.filter((entry) => entry in calculatorNeedsMap);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setCalculator({ toggles, estimate: searchParams.get("estimate") });
		setAnswers((current) => ({
			...current,
			topic: "website",
			needs: Array.from(new Set(toggles.map((entry) => calculatorNeedsMap[entry]))),
		}));
		setSkippedBasics(true);
		setStep("branch");
	}, [searchParams]);

	/**
	 * Pick a refreshed session back up. A calculator handoff starts fresh, because the link carries
	 * its own answers and re-runs the effect above.
	 *
	 * sessionStorage does not exist when this page is prerendered, so restoring during render would
	 * hand the browser different markup than the server sent. It has to happen after mount.
	 */
	useEffect(() => {
		if (searchParams.get("from") === "calculator") return;
		try {
			const raw = sessionStorage.getItem(STORAGE_KEY);
			if (!raw) return;

			const saved = JSON.parse(raw) as StoredSession;
			// Without a server side row there is nothing to resume.
			if (!saved?.id || !saved?.token || !saved?.answers?.topic) return;

			// eslint-disable-next-line react-hooks/set-state-in-effect
			setSubmission({ id: saved.id, token: saved.token });
			setAnswers({ ...EMPTY_ANSWERS, ...saved.answers });
			restoring.current = true;
			setStep(saved.step === "branch" || saved.step === "final" ? saved.step : "basics");
		} catch {
			// A corrupt or unavailable session just means starting fresh.
		}
	}, [searchParams]);

	/** Keep the session in step with the form, so a refresh loses nothing. */
	useEffect(() => {
		// The done screen has already cleared the session and must not write it back.
		if (!submission || step === "done") return;
		try {
			const payload: StoredSession = { id: submission.id, token: submission.token, answers, step };
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
		} catch {
			// Storage can be unavailable in private mode; the form still works without it.
		}
	}, [submission, answers, step]);

	/** On every step change the new heading takes focus, which also scrolls it into view. */
	useEffect(() => {
		if (!hasRendered.current) {
			hasRendered.current = true;
			return;
		}
		if (restoring.current) {
			restoring.current = false;
			return;
		}
		const target =
			step === "basics"
				? basicsHeadingRef.current
				: step === "branch"
					? routeHeadingRef.current
					: step === "final"
						? finalHeadingRef.current
						: doneHeadingRef.current;
		target?.focus();
	}, [step]);

	const topic = (answers.topic || "website") as Topic;
	const isWebsite = topic === "website";
	const firstName = answers.name.trim().split(/\s+/)[0] || "there";
	/** "Something else" has no questions of its own, so that path is two steps, not three. */
	const totalSteps = skippedBasics || answers.topic === "other" ? 2 : 3;
	const currentStep = positionOf(step, skippedBasics, totalSteps);

	function clearSession() {
		try {
			sessionStorage.removeItem(STORAGE_KEY);
		} catch {
			// Nothing to do: the submission already succeeded.
		}
	}

	function update<K extends keyof Answers>(key: K, value: Answers[K]) {
		setAnswers((current) => ({ ...current, [key]: value }));
		setErrors((current) => ({ ...current, [key]: undefined }));
	}

	/** A radio choice, reported with the label the visitor actually read. */
	function choose(key: RadioKey, options: Option[], value: string) {
		update(key, value);
		analytics.onOptionSelect({ field: key, value, label: labelOf(options, value) });
	}

	function toggleInList(key: "needs" | "digitize", options: Option[], value: string) {
		const selected = !answers[key].includes(value);
		setAnswers((current) => {
			const list = current[key];
			return { ...current, [key]: list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value] };
		});
		analytics.onOptionSelect({ field: key, value, label: labelOf(options, value), selected });
	}

	/** Validates a step, shows any errors and puts focus on the first field that failed. */
	function validate(which: Step): boolean {
		const found: Errors = {};
		const focusOrder: (readonly [keyof Errors, React.RefObject<HTMLElement | null>])[] = [];

		const checkBasics = () => {
			if (!answers.name.trim()) found.name = errorCopy.name;
			if (!isEmail(answers.email)) found.email = errorCopy.email;
			if (!answers.topic) found.topic = errorCopy.topic;
			focusOrder.push(["name", nameRef], ["email", emailRef], ["topic", topicRef]);
		};

		if (which === "basics") {
			checkBasics();
		} else if (which === "branch") {
			if (topic === "website" && !answers.buildType) found.buildType = errorCopy.buildType;
			if (topic === "prints" && !answers.printsTopic) found.printsTopic = errorCopy.printsTopic;
			focusOrder.push(["buildType", buildTypeRef], ["printsTopic", printsTopicRef]);
		} else if (which === "final") {
			// Visitors who skipped step 1 give their name and email here instead
			if (skippedBasics) checkBasics();
			if ((answers.reach === "call" || answers.reach === "text") && !answers.phone.trim()) {
				found.phone = errorCopy.phone;
			}
			focusOrder.push(["phone", phoneRef]);
		}

		setErrors(found);
		const failed = Object.keys(found);
		if (failed.length === 0) return true;

		analytics.onError("validation", failed);
		for (const [key, ref] of focusOrder) {
			if (found[key]) {
				ref.current?.focus();
				break;
			}
		}
		return false;
	}

	/* ------------------------------------------------------------------ network */

	/** Only sent when the visitor actually came through the calculator. */
	function calculatorPayload() {
		if (calculator.toggles.length === 0 && !calculator.estimate) return undefined;
		return { toggles: calculator.toggles, estimate: calculator.estimate };
	}

	/**
	 * A token the API can score. Undefined whenever reCAPTCHA is unavailable or refuses, which the
	 * API reads as no verdict rather than as spam — a challenge that fails must not cost a lead.
	 */
	async function recaptchaToken(): Promise<string | undefined> {
		if (!executeRecaptcha) return undefined;
		try {
			return await executeRecaptcha("project_intake");
		} catch {
			return undefined;
		}
	}

	/**
	 * Runs a save and turns a failure into copy. `okCodes` are the error codes that mean the work was
	 * already done, so the form should move on rather than complain.
	 */
	async function request(url: string, init: RequestInit, okCodes: string[] = []): Promise<Response | null> {
		try {
			const response = await fetch(url, init);
			if (response.ok) return response;

			const body = (await response.json().catch(() => ({}))) as { error?: string };
			const code = body.error ?? "server_error";
			if (okCodes.includes(code)) return response;

			// A row we can no longer prove we own is not worth holding on to. Dropping it lets the
			// retry start a clean one instead of failing the same way forever.
			if (code === "forbidden" || code === "not_found") {
				setSubmission(null);
				clearSession();
			}

			analytics.onError(code);
			setSaveError(serverErrorFor(code));
			return null;
		} catch {
			analytics.onError("offline");
			setSaveError(serverErrorFor("offline"));
			return null;
		}
	}

	/** Creates the row, which is what makes the visitor reachable from here on. */
	async function createSubmission(): Promise<Submission | null> {
		const response = await request("/api/intake", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				topic,
				name: answers.name.trim(),
				email: answers.email.trim(),
				calculator: calculatorPayload(),
				company: honeypot,
			}),
		});
		if (!response) return null;

		const created = (await response.json()) as Submission;
		setSubmission(created);
		return created;
	}

	/**
	 * Step 1. Name, email and topic are saved before any branch question is shown, so somebody who
	 * abandons on step 2 is still somebody I can follow up with.
	 *
	 * Coming back to fix a typo corrects the row that already exists rather than leaving a duplicate
	 * partial behind.
	 */
	async function savePartial(): Promise<boolean> {
		if (!submission) return Boolean(await createSubmission());

		const response = await request(`/api/intake/${submission.id}`, {
			method: "PATCH",
			headers: { "content-type": "application/json", "x-intake-token": submission.token },
			body: JSON.stringify({ topic, contact: { name: answers.name.trim(), email: answers.email.trim() } }),
		});
		return Boolean(response);
	}

	/**
	 * Step 2, best effort and silent. The final submit sends the whole branch again, so a failure
	 * here only costs the answers of somebody who abandons the form after this point — never a
	 * reason to stop them moving on. keepalive so it survives them navigating away.
	 */
	function saveBranchAnswers(saved: Submission) {
		void fetch(`/api/intake/${saved.id}`, {
			method: "PATCH",
			headers: { "content-type": "application/json", "x-intake-token": saved.token },
			body: JSON.stringify({ answers: branchAnswersFor(topic, answers) }),
			keepalive: true,
		}).catch(() => {
			// Nothing to tell the visitor: the answers are re-sent on submit.
		});
	}

	/** The last step, and the only call that sends any email. */
	async function saveComplete(): Promise<boolean> {
		// The calculator path skips step 1, so this may be the first the server hears of them.
		const saved = submission ?? (await createSubmission());
		if (!saved) return false;

		const response = await request(
			`/api/intake/${saved.id}`,
			{
				method: "PATCH",
				headers: { "content-type": "application/json", "x-intake-token": saved.token },
				body: JSON.stringify({
					answers: branchAnswersFor(topic, answers),
					final: finalAnswersFor(answers),
					calculator: calculatorPayload(),
					complete: true,
					recaptchaToken: await recaptchaToken(),
				}),
			},
			// A double submit lands here on the second request. It already worked.
			["already_complete"],
		);

		return Boolean(response);
	}

	/* ----------------------------------------------------------------- handlers */

	function goTo(next: Step, direction: "forward" | "back") {
		analytics.onStep({
			id: next,
			number: positionOf(next, skippedBasics, totalSteps),
			total: totalSteps,
			direction,
		});
		setStep(next);
	}

	async function handleBasicsContinue() {
		trackButtonClick({ name: "intake_continue", location: LOCATION, text: "Continue", value: "basics" });
		if (!validate("basics")) return;

		setSaveError(null);
		setPending(true);
		const ok = await savePartial();
		setPending(false);
		if (!ok) return;

		// "Something else" has nothing to ask on step 2, so it goes straight to the last step
		goTo(answers.topic === "other" ? "final" : "branch", "forward");
	}

	function handleBranchContinue() {
		trackButtonClick({ name: "intake_continue", location: LOCATION, text: "Continue", value: "branch" });
		if (!validate("branch")) return;

		if (submission) saveBranchAnswers(submission);
		goTo("final", "forward");
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		if (honeypot) return;

		const submitText = isWebsite ? "Send project details" : "Send message";
		trackButtonClick({ name: "intake_submit", location: LOCATION, text: submitText, value: topic });

		if (!validate("final")) return;

		// After validation, so form_submit counts attempts that actually reached the server.
		analytics.onSubmit();
		setSaveError(null);
		setPending(true);
		const ok = await saveComplete();
		setPending(false);
		if (!ok) return;

		analytics.onSuccess();
		clearSession();
		goTo("done", "forward");
	}

	function handleBack(target: Step) {
		trackButtonClick({ name: "intake_back", location: LOCATION, text: "Back", value: target });
		setSaveError(null);
		goTo(target, "back");
	}

	const backButton = (target: Step, onClick?: () => void) => (
		<button
			type="button"
			disabled={pending}
			onClick={() => {
				onClick?.();
				handleBack(target);
			}}
			className={`${PILL_SECONDARY} ${NAV_PILL} disabled:opacity-60`}
		>
			Back
		</button>
	);

	const continueButton = (
		<button type="submit" disabled={pending} className={`${PILL_PRIMARY} ${NAV_PILL} disabled:opacity-60`}>
			{pending ? "Saving…" : "Continue"}
		</button>
	);

	/** Step 1 keeps the two column layout. Everything after it narrows to a single column. */
	if (step === "basics") {
		return (
			<section className="bg-[#151515]">
				<div className={`${CONTAINER} py-[clamp(56px,7vw,96px)] flex flex-wrap items-start gap-x-[72px] gap-y-12`}>
					<div className="flex-[1_1_300px] max-w-[420px] min-w-0">
						<h2 ref={basicsHeadingRef} tabIndex={-1} className={`${SECTION_HEADING} outline-none`}>
							Tell me about your project
						</h2>
						<p className={`mt-5 mb-0 ${BODY_TEXT}`}>
							A few short questions about your business and what you need. Your answers come straight to me, and I follow up
							personally.
						</p>
						<h3 className="mt-10 mb-0 text-[18px] leading-[1.4] aktiv-grotesk-semibold text-white">What happens next</h3>
						<ol className="mt-4 mb-0 p-0 list-none flex flex-col gap-3.5">
							{[
								"I read your answers myself.",
								"I follow up the way you prefer.",
								"Website projects get a line-item estimate before any work begins.",
							].map((line, index) => (
								<li key={line} className={`flex items-start gap-3.5 text-[17px] ${BODY_TEXT}`}>
									<span
										aria-hidden="true"
										className="flex-none mt-px box-border inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#6e6e6e] text-[14px] aktiv-grotesk-semibold text-white"
									>
										{index + 1}
									</span>
									<span>{line}</span>
								</li>
							))}
						</ol>
					</div>

					<form
						aria-labelledby="step-title"
						noValidate
						onFocus={analytics.onFirstInteraction}
						onChange={analytics.onFirstInteraction}
						onSubmit={(event) => {
							event.preventDefault();
							void handleBasicsContinue();
						}}
						className={`${CARD} relative flex-[999_1_520px] min-w-0 bg-[#000000] p-[clamp(24px,4vw,48px)] [color-scheme:dark]`}
					>
						<Progress current={1} total={totalSteps} />
						<h3 id="step-title" className="mt-7 mb-0 text-[26px] leading-[1.25] aktiv-grotesk-semibold text-white">
							Let&apos;s start with the basics
						</h3>

						<div className="mt-6">
							<TextField
								id="contact-name"
								label="Name"
								autoComplete="name"
								value={answers.name}
								onChange={(value) => update("name", value)}
								error={errors.name}
								inputRef={nameRef}
							/>
						</div>
						<div className="mt-6">
							<TextField
								id="contact-email"
								label="Email"
								type="email"
								autoComplete="email"
								value={answers.email}
								onChange={(value) => update("email", value)}
								error={errors.email}
								inputRef={emailRef}
							/>
						</div>
						<div className="mt-8">
							<RadioCardGroup
								name="topic"
								legend="What are you reaching out about?"
								options={topicOptions}
								value={answers.topic}
								onChange={(value) => choose("topic", topicOptions, value)}
								error={errors.topic}
								firstInputRef={topicRef}
							/>
						</div>

						<p className={`mt-6 mb-0 ${NOTE_TEXT}`}>
							Your name and email are saved when you continue, so I can follow up if you get interrupted.
						</p>

						<Honeypot value={honeypot} onChange={setHoneypot} />
						<SaveError message={saveError} />

						<div className="mt-7 flex flex-wrap justify-end gap-3">{continueButton}</div>
					</form>
				</div>
			</section>
		);
	}

	return (
		<section className="bg-[#151515]">
			<div className={`${CONTAINER} py-[clamp(56px,7vw,96px)]`}>
				<div className="mx-auto max-w-[720px]">
					{step !== "done" ? (
						<h2
							ref={step === "branch" ? routeHeadingRef : undefined}
							tabIndex={step === "branch" ? -1 : undefined}
							className={`${SECTION_HEADING} outline-none`}
						>
							{routeHeading[topic]}
						</h2>
					) : null}

					{step === "branch" ? (
						<form
							aria-labelledby="step-title"
							noValidate
							onFocus={analytics.onFirstInteraction}
							onChange={analytics.onFirstInteraction}
							onSubmit={(event) => {
								event.preventDefault();
								handleBranchContinue();
							}}
							className={`${CARD} relative mt-8 bg-[#000000] p-[clamp(24px,4vw,48px)] [color-scheme:dark]`}
						>
							<Progress current={currentStep} total={totalSteps} />

							{skippedBasics ? (
								<p className={`mt-7 mb-0 ${NOTE_TEXT}`}>
									I&apos;ve filled in a few answers from your estimate. Change anything that doesn&apos;t fit.
								</p>
							) : null}

							{isWebsite ? (
								<>
									<div className="mt-7">
										<RadioCardGroup
											name="buildType"
											legend="Is this a new site or a migration?"
											options={buildTypeOptions}
											value={answers.buildType}
											onChange={(value) => choose("buildType", buildTypeOptions, value)}
											error={errors.buildType}
											firstInputRef={buildTypeRef}
										/>
									</div>
									{/* The platform question only exists while this is a migration */}
									{answers.buildType === "migration" ? (
										<div className="mt-8">
											<RadioChipGroup
												name="platform"
												legend="What platform is your current site on?"
												options={platformOptions}
												value={answers.platform}
												onChange={(value) => choose("platform", platformOptions, value)}
											/>
										</div>
									) : null}
									<div className="mt-8">
										<CheckboxCardGroup
											name="needs"
											legend="What does the site need to do?"
											help="Choose all that apply."
											options={needsOptions}
											values={answers.needs}
											onToggle={(value) => toggleInList("needs", needsOptions, value)}
										/>
									</div>
									<div className="mt-8">
										<RadioChipGroup
											name="timeline"
											legend="When would you like to launch?"
											options={timelineOptions}
											value={answers.timeline}
											onChange={(value) => choose("timeline", timelineOptions, value)}
										/>
									</div>
									<div className="mt-8">
										<TextField
											id="current-site"
											label="Current website"
											type="url"
											autoComplete="url"
											optional
											value={answers.currentSite}
											onChange={(value) => update("currentSite", value)}
										/>
									</div>
								</>
							) : null}

							{topic === "prints" ? (
								<>
									<div className="mt-7">
										<RadioRowGroup
											name="printsTopic"
											legend="What can I help with?"
											options={printsTopicOptions}
											value={answers.printsTopic}
											onChange={(value) => choose("printsTopic", printsTopicOptions, value)}
											error={errors.printsTopic}
											firstInputRef={printsTopicRef}
										/>
									</div>
									<div className="mt-8">
										<TextField
											id="order-number"
											label="Order number"
											optional
											value={answers.orderNumber}
											onChange={(value) => update("orderNumber", value)}
										/>
									</div>
								</>
							) : null}

							{topic === "digitization" ? (
								<>
									<div className="mt-7">
										<CheckboxCardGroup
											name="digitize"
											legend="What would you like digitized?"
											help="Choose all that apply."
											options={digitizeOptions}
											values={answers.digitize}
											onToggle={(value) => toggleInList("digitize", digitizeOptions, value)}
										/>
									</div>
									<div className="mt-8">
										<TextField
											id="item-count"
											label="Roughly how many items?"
											optional
											value={answers.itemCount}
											onChange={(value) => update("itemCount", value)}
										/>
									</div>
								</>
							) : null}

							<Honeypot value={honeypot} onChange={setHoneypot} />
							<SaveError message={saveError} />

							<div className="mt-8 flex flex-wrap justify-between gap-3">
								{/* Coming back from the calculator turns this into the ordinary three step flow */}
								{backButton("basics", () => setSkippedBasics(false))}
								{continueButton}
							</div>
						</form>
					) : null}

					{step === "final" ? (
						<form
							aria-labelledby="step-title"
							noValidate
							onFocus={analytics.onFirstInteraction}
							onChange={analytics.onFirstInteraction}
							onSubmit={(event) => void handleSubmit(event)}
							className={`${CARD} relative mt-8 bg-[#000000] p-[clamp(24px,4vw,48px)] [color-scheme:dark]`}
						>
							<Progress current={currentStep} total={totalSteps} />
							<h3
								id="step-title"
								ref={finalHeadingRef}
								tabIndex={-1}
								className="mt-7 mb-0 text-[26px] leading-[1.25] aktiv-grotesk-semibold text-white outline-none"
							>
								Anything else?
							</h3>

							{/* Nobody asked for these on the calculator path, so they are collected here */}
							{skippedBasics ? (
								<>
									<div className="mt-6">
										<TextField
											id="contact-name"
											label="Name"
											autoComplete="name"
											value={answers.name}
											onChange={(value) => update("name", value)}
											error={errors.name}
											inputRef={nameRef}
										/>
									</div>
									<div className="mt-6">
										<TextField
											id="contact-email"
											label="Email"
											type="email"
											autoComplete="email"
											value={answers.email}
											onChange={(value) => update("email", value)}
											error={errors.email}
											inputRef={emailRef}
										/>
									</div>
								</>
							) : null}

							<div className="mt-6">
								<TextField
									id="details"
									label="Anything else I should know?"
									optional
									help="Goals, deadlines, links or questions."
									rows={5}
									value={answers.details}
									onChange={(value) => update("details", value)}
								/>
							</div>
							<div className="mt-6">
								<TextField
									id="contact-phone"
									label="Phone"
									type="tel"
									autoComplete="tel"
									optional={answers.reach === "email"}
									value={answers.phone}
									onChange={(value) => update("phone", value)}
									error={errors.phone}
									inputRef={phoneRef}
								/>
							</div>
							<div className="mt-8">
								<RadioChipGroup
									name="reach"
									legend="How should I reach you?"
									options={reachOptions}
									value={answers.reach}
									onChange={(value) => choose("reach", reachOptions, value)}
								/>
							</div>

							<Honeypot value={honeypot} onChange={setHoneypot} />
							<SaveError message={saveError} />

							<div className="mt-8 flex flex-wrap justify-between gap-3">
								{backButton(answers.topic === "other" ? "basics" : "branch")}
								<button type="submit" disabled={pending} className={`${PILL_PRIMARY} ${NAV_PILL} disabled:opacity-60`}>
									{pending ? "Sending…" : isWebsite ? "Send project details" : "Send message"}
								</button>
							</div>
						</form>
					) : null}

					{step === "done" ? (
						<FormCard>
							<div aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-mcRed">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#ffffff"
									strokeWidth="2.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M5 12.5 L10 17.5 L19 7.5" />
								</svg>
							</div>
							<h2
								ref={doneHeadingRef}
								tabIndex={-1}
								className="mt-6 mb-0 text-[28px] leading-[1.2] aktiv-grotesk-semibold text-white outline-none"
							>
								Thanks, {firstName}. {isWebsite ? "Your project details are in." : "Your message is in."}
							</h2>
							<p className={`mt-4 mb-0 max-w-[34em] ${BODY_TEXT}`}>
								I read every submission myself and will reach out within 2 business days. A copy of your answers is on its
								way to your inbox.
							</p>
							<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
								<Link
									href="/"
									onClick={() =>
										trackButtonClick({
											name: "intake_done_link",
											location: LOCATION,
											text: "Back to the homepage",
											value: "/",
										})
									}
									className={PILL_SECONDARY}
								>
									Back to the homepage
								</Link>
								<Link
									href="/#work"
									onClick={() =>
										trackButtonClick({
											name: "intake_done_link",
											location: LOCATION,
											text: "See the work",
											value: "/#work",
										})
									}
									className={`inline-flex items-center min-h-[44px] text-[17px] text-white aktiv-grotesk-semibold underline underline-offset-4 ${FOCUS_RING}`}
								>
									See the work
								</Link>
							</div>
						</FormCard>
					) : null}
				</div>
			</div>
		</section>
	);
}
