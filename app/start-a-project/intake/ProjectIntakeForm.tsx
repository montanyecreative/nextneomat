"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
	needsOptions,
	platformOptions,
	printsTopicOptions,
	reachOptions,
	routeHeading,
	timelineOptions,
	topicOptions,
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

type Step = "basics" | "branch" | "final" | "done";
type Errors = Partial<Record<"name" | "email" | "topic" | "buildType" | "printsTopic" | "phone", string>>;

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

/**
 * Where the submission will be saved once the database work lands. Both calls are no-ops for
 * now: this pass is the front end only, so continuing and submitting move the form along
 * without storing anything.
 */
async function savePartialSubmission(_answers: Answers) {}
async function saveCompleteSubmission(_answers: Answers, _calculator: { toggles: string[]; estimate: string | null }) {}

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

export default function ProjectIntakeForm() {
	const searchParams = useSearchParams();
	const [step, setStep] = useState<Step>("basics");
	const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
	const [errors, setErrors] = useState<Errors>({});
	const [honeypot, setHoneypot] = useState("");
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

	/** Read the calculator handoff once, ignoring anything unrecognised. */
	useEffect(() => {
		if (searchParams.get("from") !== "calculator") return;
		const toggles = (searchParams.get("calc") ?? "")
			.split(",")
			.map((entry) => entry.trim())
			.filter((entry) => entry in calculatorNeedsMap);
		setCalculator({ toggles, estimate: searchParams.get("estimate") });
		setAnswers((current) => ({
			...current,
			topic: "website",
			needs: Array.from(new Set(toggles.map((entry) => calculatorNeedsMap[entry]))),
		}));
		setSkippedBasics(true);
		setStep("branch");
	}, [searchParams]);

	/** On every step change the new heading takes focus, which also scrolls it into view. */
	useEffect(() => {
		if (!hasRendered.current) {
			hasRendered.current = true;
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
	/** "Something else" has no questions of its own, so that path is two steps, not three. */
	const totalSteps = skippedBasics || answers.topic === "other" ? 2 : 3;
	const currentStep = step === "basics" ? 1 : step === "branch" ? (skippedBasics ? 1 : 2) : skippedBasics ? 2 : totalSteps;

	function update<K extends keyof Answers>(key: K, value: Answers[K]) {
		setAnswers((current) => ({ ...current, [key]: value }));
		setErrors((current) => ({ ...current, [key]: undefined }));
	}

	function toggleInList(key: "needs" | "digitize", value: string) {
		setAnswers((current) => {
			const list = current[key];
			return { ...current, [key]: list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value] };
		});
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
		if (Object.keys(found).length === 0) return true;
		for (const [key, ref] of focusOrder) {
			if (found[key]) {
				ref.current?.focus();
				break;
			}
		}
		return false;
	}

	async function handleBasicsContinue() {
		if (!validate("basics")) return;
		await savePartialSubmission(answers);
		// "Something else" has nothing to ask on step 2, so it goes straight to the last step
		setStep(answers.topic === "other" ? "final" : "branch");
	}

	function handleBranchContinue() {
		if (!validate("branch")) return;
		setStep("final");
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		if (honeypot) return;
		if (!validate("final")) return;
		await saveCompleteSubmission(answers, calculator);
		setStep("done");
	}

	const firstName = answers.name.trim().split(/\s+/)[0] || "there";
	const isWebsite = topic === "website";

	const backButton = (onClick: () => void) => (
		<button type="button" onClick={onClick} className={`${PILL_SECONDARY} ${NAV_PILL}`}>
			Back
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
								onChange={(value) => update("topic", value as Topic)}
								error={errors.topic}
								firstInputRef={topicRef}
							/>
						</div>

						<p className={`mt-6 mb-0 ${NOTE_TEXT}`}>
							Your name and email are saved when you continue, so I can follow up if you get interrupted.
						</p>

						<Honeypot value={honeypot} onChange={setHoneypot} />

						<div className="mt-7 flex flex-wrap justify-end gap-3">
							<button type="submit" className={`${PILL_PRIMARY} ${NAV_PILL}`}>
								Continue
							</button>
						</div>
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
											onChange={(value) => update("buildType", value)}
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
												onChange={(value) => update("platform", value)}
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
											onToggle={(value) => toggleInList("needs", value)}
										/>
									</div>
									<div className="mt-8">
										<RadioChipGroup
											name="timeline"
											legend="When would you like to launch?"
											options={timelineOptions}
											value={answers.timeline}
											onChange={(value) => update("timeline", value)}
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
											onChange={(value) => update("printsTopic", value)}
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
											onToggle={(value) => toggleInList("digitize", value)}
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

							<div className="mt-8 flex flex-wrap justify-between gap-3">
								{backButton(() => {
									// Coming back from the calculator turns this into the ordinary three step flow
									setSkippedBasics(false);
									setStep("basics");
								})}
								<button type="submit" className={`${PILL_PRIMARY} ${NAV_PILL}`}>
									Continue
								</button>
							</div>
						</form>
					) : null}

					{step === "final" ? (
						<form
							aria-labelledby="step-title"
							noValidate
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
									onChange={(value) => update("reach", value)}
								/>
							</div>

							<Honeypot value={honeypot} onChange={setHoneypot} />

							<div className="mt-8 flex flex-wrap justify-between gap-3">
								{backButton(() => setStep(answers.topic === "other" ? "basics" : "branch"))}
								<button type="submit" className={`${PILL_PRIMARY} ${NAV_PILL}`}>
									{isWebsite ? "Send project details" : "Send message"}
								</button>
							</div>
						</form>
					) : null}

					{step === "done" ? (
						<div className={`${CARD} bg-[#000000] p-[clamp(24px,4vw,48px)]`}>
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
								<Link href="/" className={PILL_SECONDARY}>
									Back to the homepage
								</Link>
								<Link
									href="/#work"
									className={`inline-flex items-center min-h-[44px] text-[17px] text-white aktiv-grotesk-semibold underline underline-offset-4 ${FOCUS_RING}`}
								>
									See the work
								</Link>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
}
