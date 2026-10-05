"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
	BODY_TEXT,
	CARD,
	FOCUS_RING,
	LEGEND,
	NATIVE_CONTROL,
	NOTE_TEXT,
	CONTAINER,
	PILL_PRIMARY,
	SECTION_HEADING,
	chipPadding,
	optionCardClass,
	optionCardPadding,
} from "@/components/site/tokens";

/** Prices carried over from the previous calculator, unchanged. */
const HOSTING_COMMERCIAL_YEARLY = 240;
const DOMAIN_YEARLY = 15;
const CMS_LITE_YEARLY = 3600;
const MARKETING_STARTER_YEARLY = 420;
const TRANSACTIONAL_BASIC_YEARLY = 180;

type Monetization = "personal" | "commercial";
type CmsPlan = "free" | "lite";
type MarketingPlan = "free" | "starter";
type TransactionalPlan = "free" | "basic";

/**
 * Starting state. The questions that existed before keep the defaults they had: the personal
 * path, with every service switched off. The three new questions start the way the design shows
 * them, and a question that carries plan choices opens on its free tier.
 */
const DEFAULTS = {
	monetization: "personal" as Monetization,
	needsForms: false,
	sellsOnline: true,
	editsContent: true,
	cmsPlan: "free" as CmsPlan,
	multiLanguage: false,
	needsMarketing: false,
	marketingPlan: "free" as MarketingPlan,
	needsTransactional: false,
	transactionalPlan: "free" as TransactionalPlan,
	needsDomain: false,
};

function formatCurrency(amount: number) {
	return amount.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
}

/**
 * The switch itself is only a picture of the state: the button wrapping it carries the role and
 * the aria-checked, so this is hidden from assistive technology to avoid saying the state twice.
 * The words Yes and No keep it readable without relying on colour.
 */
function SwitchVisual({ on }: { on: boolean }) {
	return (
		<span
			aria-hidden="true"
			className={`flex-none inline-flex items-center gap-2.5 text-[15px] aktiv-grotesk-semibold ${
				on ? "text-white" : "text-[#c4c4c4]"
			}`}
		>
			<span>{on ? "Yes" : "No"}</span>
			<span
				className={`relative inline-block h-7 w-12 rounded-full transition-colors duration-200 ${
					on ? "bg-mcRed" : "bg-[#6e6e6e]"
				}`}
			>
				<span
					className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white transition-all duration-200 ${
						on ? "left-[23px]" : "left-[3px]"
					}`}
				/>
			</span>
		</span>
	);
}

/** A question card holding a switch, with anything that depends on it underneath. */
function ToggleRow({
	id,
	question,
	on,
	onToggle,
	note,
	children,
}: {
	id: string;
	question: string;
	on: boolean;
	onToggle: () => void;
	note?: React.ReactNode;
	children?: React.ReactNode;
}) {
	return (
		<div className="box-border rounded-[10px] border border-[#333333] px-5 py-4">
			{/*
				The question and the switch are one button spanning the row, so anywhere along the
				question toggles it rather than only the switch at the end. The question text is the
				button's accessible name and aria-checked is its state.
			*/}
			<button
				type="button"
				role="switch"
				aria-checked={on}
				aria-describedby={note ? `${id}-note` : undefined}
				onClick={onToggle}
				className={`flex w-full items-center justify-between gap-4 min-h-[44px] rounded-[6px] border-0 bg-transparent p-0 text-left cursor-pointer ${FOCUS_RING}`}
			>
				<span id={id} className="text-[17px] leading-[1.4] aktiv-grotesk-semibold text-white">
					{question}
				</span>
				<SwitchVisual on={on} />
			</button>
			{note ? (
				<p id={`${id}-note`} className={`mt-1.5 mb-0 ${NOTE_TEXT}`}>
					{note}
				</p>
			) : null}
			{/* Plan choices only exist while the question they belong to is switched on */}
			{on ? children : null}
		</div>
	);
}

/** A single line chip, used for plan choices. */
function Chip({
	name,
	value,
	checked,
	onChange,
	children,
}: {
	name: string;
	value: string;
	checked: boolean;
	onChange: () => void;
	children: React.ReactNode;
}) {
	return (
		<label
			className={optionCardClass(checked, `flex-[0_1_auto] inline-flex items-center gap-2.5 min-h-[48px] text-[16px] ${chipPadding(checked)}`)}
		>
			<input type="radio" name={name} value={value} checked={checked} onChange={onChange} className={NATIVE_CONTROL} />
			<span className="text-white aktiv-grotesk-regular">{children}</span>
		</label>
	);
}

/** The plan group that appears under a switched-on question. */
function PlanGroup({ legend, children }: { legend: string; children: React.ReactNode }) {
	return (
		<fieldset className="mt-3 mb-0 p-0 border-0 min-w-0">
			<legend className={`p-0 ${NOTE_TEXT}`}>{legend}</legend>
			<div className="mt-2 flex flex-wrap gap-2.5">{children}</div>
		</fieldset>
	);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between gap-4">
			<dt className="text-[#c4c4c4]">{label}</dt>
			<dd className="m-0 aktiv-grotesk-semibold text-white">{value}</dd>
		</div>
	);
}

/** Charcoal band: the running cost calculator, with the summary sticky beside it on wide screens. */
export default function PricingCalculator() {
	const [monetization, setMonetization] = useState<Monetization>(DEFAULTS.monetization);
	const [needsForms, setNeedsForms] = useState(DEFAULTS.needsForms);
	const [sellsOnline, setSellsOnline] = useState(DEFAULTS.sellsOnline);
	const [editsContent, setEditsContent] = useState(DEFAULTS.editsContent);
	const [cmsPlan, setCmsPlan] = useState<CmsPlan>(DEFAULTS.cmsPlan);
	const [multiLanguage, setMultiLanguage] = useState(DEFAULTS.multiLanguage);
	const [needsMarketing, setNeedsMarketing] = useState(DEFAULTS.needsMarketing);
	const [marketingPlan, setMarketingPlan] = useState<MarketingPlan>(DEFAULTS.marketingPlan);
	const [needsTransactional, setNeedsTransactional] = useState(DEFAULTS.needsTransactional);
	const [transactionalPlan, setTransactionalPlan] = useState<TransactionalPlan>(DEFAULTS.transactionalPlan);
	const [needsDomain, setNeedsDomain] = useState(DEFAULTS.needsDomain);
	const [resetMessage, setResetMessage] = useState("");

	const firstQuestionRef = useRef<HTMLInputElement>(null);

	const hostingYearly = monetization === "commercial" ? HOSTING_COMMERCIAL_YEARLY : 0;
	const cmsYearly = editsContent && cmsPlan === "lite" ? CMS_LITE_YEARLY : 0;
	const marketingYearly = needsMarketing && marketingPlan === "starter" ? MARKETING_STARTER_YEARLY : 0;
	const transactionalYearly =
		needsTransactional && transactionalPlan === "basic" ? TRANSACTIONAL_BASIC_YEARLY : 0;
	const domainYearly = needsDomain ? DOMAIN_YEARLY : 0;
	const estimatedYearlyTotal = hostingYearly + cmsYearly + marketingYearly + transactionalYearly + domainYearly;

	/** The toggles the contact form reads back, in the order the handoff lists them. */
	const activeToggles = [
		needsForms && "forms",
		needsMarketing && "marketing",
		needsTransactional && "transactional",
		sellsOnline && "store",
		multiLanguage && "languages",
	].filter(Boolean) as string[];

	const quoteParams = new URLSearchParams({ from: "calculator" });
	if (activeToggles.length > 0) quoteParams.set("calc", activeToggles.join(","));
	quoteParams.set("estimate", String(estimatedYearlyTotal));
	const quoteHref = `/start-a-project?${quoteParams.toString()}`;

	function handleReset() {
		setMonetization(DEFAULTS.monetization);
		setNeedsForms(DEFAULTS.needsForms);
		setSellsOnline(DEFAULTS.sellsOnline);
		setEditsContent(DEFAULTS.editsContent);
		setCmsPlan(DEFAULTS.cmsPlan);
		setMultiLanguage(DEFAULTS.multiLanguage);
		setNeedsMarketing(DEFAULTS.needsMarketing);
		setMarketingPlan(DEFAULTS.marketingPlan);
		setNeedsTransactional(DEFAULTS.needsTransactional);
		setTransactionalPlan(DEFAULTS.transactionalPlan);
		setNeedsDomain(DEFAULTS.needsDomain);
		setResetMessage("Calculator reset");
		firstQuestionRef.current?.focus();
	}

	/** Any change after a reset clears the announcement, so it is not read again later. */
	function clearResetMessage() {
		if (resetMessage) setResetMessage("");
	}

	return (
		<section id="pricing" className="bg-[#151515] scroll-mt-24">
			<div className={`${CONTAINER} py-[clamp(80px,10vw,144px)]`}>
				<h2 className={SECTION_HEADING}>Pricing to expect</h2>
				<p className={`mt-5 mb-0 max-w-[36em] ${BODY_TEXT}`}>
					I believe in transparent pricing. You shouldn&apos;t pay an arm and a leg just to keep a website running, so this
					calculator shows what the services behind your site cost to run each year.
				</p>

				<div
					className={`${CARD} mt-12 bg-[#000000] rounded-[16px] p-[clamp(20px,3vw,40px)] flex flex-wrap items-start gap-8`}
					onChange={clearResetMessage}
				>
					<div className="flex-[999_1_480px] min-w-0 flex flex-col gap-4">
						<fieldset className="m-0 p-0 border-0 min-w-0">
							<legend className="p-0 text-[18px] leading-[1.4] aktiv-grotesk-semibold text-white">
								Will your site make money?
							</legend>
							<div className="mt-3 flex flex-wrap gap-3">
								<label
									className={optionCardClass(
										monetization === "personal",
										`flex-[1_1_240px] items-start gap-3 rounded-[10px] ${optionCardPadding(monetization === "personal")}`,
									)}
								>
									<input
										ref={firstQuestionRef}
										type="radio"
										name="monetization"
										value="personal"
										checked={monetization === "personal"}
										onChange={() => setMonetization("personal")}
										className={`${NATIVE_CONTROL} mt-1`}
									/>
									<span>
										<span className="block text-[17px] aktiv-grotesk-semibold text-white">No: personal or nonprofit</span>
										<span className={`block mt-0.5 ${NOTE_TEXT}`}>
											Portfolio, resume, wedding site, hobby blog, or any site where you are not generating revenue.
										</span>
									</span>
								</label>
								<label
									className={optionCardClass(
										monetization === "commercial",
										`flex-[1_1_240px] items-start gap-3 rounded-[10px] ${optionCardPadding(monetization === "commercial")}`,
									)}
								>
									<input
										type="radio"
										name="monetization"
										value="commercial"
										checked={monetization === "commercial"}
										onChange={() => setMonetization("commercial")}
										className={`${NATIVE_CONTROL} mt-1`}
									/>
									<span>
										<span className="block text-[17px] aktiv-grotesk-semibold text-white">Yes: business or commerce</span>
										<span className={`block mt-0.5 ${NOTE_TEXT}`}>
											Selling products, services, ads, memberships, or any other way of earning from the site.
										</span>
									</span>
								</label>
							</div>
						</fieldset>

						{/* Hosting is shown, not asked. The personal path keeps the copy it has always had. */}
						<div className="box-border rounded-[10px] bg-[#151515] px-5 py-[18px]">
							<div className="flex flex-wrap items-baseline justify-between gap-4">
								<span className="text-[17px] aktiv-grotesk-semibold text-white">Hosting</span>
								<span className="text-[17px] aktiv-grotesk-semibold text-white">
									{monetization === "commercial" ? (
										<>
											$20<span className="aktiv-grotesk-regular text-[#c4c4c4]"> a month</span>
										</>
									) : (
										<>
											$0<span className="aktiv-grotesk-regular text-[#c4c4c4]"> a year</span>
										</>
									)}
								</span>
							</div>
							<p className={`mt-1.5 mb-0 ${NOTE_TEXT}`}>
								{monetization === "commercial"
									? "Business sites need a paid hosting plan from day one."
									: "If you do not plan to make money from your site, hosting is included at no charge. That covers a secure, reliable server with 99.9% uptime."}
							</p>
						</div>

						<ToggleRow
							id="q-forms"
							question="Do you need contact forms?"
							on={needsForms}
							onToggle={() => {
								setNeedsForms(!needsForms);
								clearResetMessage();
							}}
							note="Submissions are saved and routed to the right person. Free for most small sites."
						/>

						<ToggleRow
							id="q-store"
							question="Will you sell products online?"
							on={sellsOnline}
							onToggle={() => {
								setSellsOnline(!sellsOnline);
								clearResetMessage();
							}}
							note="No monthly fee. Card processing runs 2.9% + 30¢ per sale, and automatic sales tax adds 0.5% per sale where you're registered to collect."
						/>

						<ToggleRow
							id="q-cms"
							question="Do you want to edit your site's content yourself?"
							on={editsContent}
							onToggle={() => {
								setEditsContent(!editsContent);
								clearResetMessage();
							}}
						>
							<PlanGroup legend="Choose a plan">
								<Chip name="cms" value="free" checked={cmsPlan === "free"} onChange={() => setCmsPlan("free")}>
									Free
								</Chip>
								<Chip name="cms" value="lite" checked={cmsPlan === "lite"} onChange={() => setCmsPlan("lite")}>
									Lite: $300 a month (free is sufficient in most cases, lite is for scaling)
								</Chip>
							</PlanGroup>
						</ToggleRow>

						<ToggleRow
							id="q-lang"
							question="Does your site need more than one language?"
							on={multiLanguage}
							onToggle={() => {
								setMultiLanguage(!multiLanguage);
								clearResetMessage();
							}}
							note={
								multiLanguage
									? "Sites in more than 3 languages need a custom content plan, which I'll quote with you."
									: undefined
							}
						/>

						<ToggleRow
							id="q-marketing"
							question="Do you need email and text messaging marketing like an email sign-up?"
							on={needsMarketing}
							onToggle={() => {
								setNeedsMarketing(!needsMarketing);
								clearResetMessage();
							}}
						>
							<PlanGroup legend="Choose a plan">
								<Chip
									name="marketing"
									value="free"
									checked={marketingPlan === "free"}
									onChange={() => setMarketingPlan("free")}
								>
									Free: 250 contacts
								</Chip>
								<Chip
									name="marketing"
									value="starter"
									checked={marketingPlan === "starter"}
									onChange={() => setMarketingPlan("starter")}
								>
									Starter: $35 a month
								</Chip>
							</PlanGroup>
						</ToggleRow>

						<ToggleRow
							id="q-transactional"
							question="Do you need transactional emails for user-specific interactions?"
							on={needsTransactional}
							onToggle={() => {
								setNeedsTransactional(!needsTransactional);
								clearResetMessage();
							}}
						>
							<PlanGroup legend="Password resets, receipts and other user-specific messages. Choose a plan.">
								<Chip
									name="transactional"
									value="free"
									checked={transactionalPlan === "free"}
									onChange={() => setTransactionalPlan("free")}
								>
									Free: 100 emails a month
								</Chip>
								<Chip
									name="transactional"
									value="basic"
									checked={transactionalPlan === "basic"}
									onChange={() => setTransactionalPlan("basic")}
								>
									Basic: $15 a month for 10,000
								</Chip>
							</PlanGroup>
						</ToggleRow>

						<ToggleRow
							id="q-domain"
							question="Do you need to purchase a URL?"
							on={needsDomain}
							onToggle={() => {
								setNeedsDomain(!needsDomain);
								clearResetMessage();
							}}
							note="If you already have a URL, no domain cost is added to your estimate."
						/>
					</div>

					<div className="flex-[1_1_280px] min-w-0 flex flex-col gap-3 lg:sticky lg:top-24">
						<aside aria-labelledby="summary-title" className={`${CARD} bg-[#151515] p-6`}>
							<h3 id="summary-title" className="m-0 text-[18px] leading-[1.4] aktiv-grotesk-semibold text-white">
								Estimated yearly running costs
							</h3>
							<dl className="mt-5 mb-0 flex flex-col gap-3 text-[16px] aktiv-grotesk-regular">
								<SummaryRow label="Hosting" value={formatCurrency(hostingYearly)} />
								{needsForms ? <SummaryRow label="Contact forms" value={formatCurrency(0)} /> : null}
								{sellsOnline ? <SummaryRow label="Online store" value="Per sale" /> : null}
								{editsContent ? <SummaryRow label="Content editing" value={formatCurrency(cmsYearly)} /> : null}
								{needsMarketing ? <SummaryRow label="Email marketing" value={formatCurrency(marketingYearly)} /> : null}
								{needsTransactional ? (
									<SummaryRow label="Transactional email" value={formatCurrency(transactionalYearly)} />
								) : null}
								{needsDomain ? <SummaryRow label="Domain" value={formatCurrency(domainYearly)} /> : null}
							</dl>
							<div aria-live="polite" className="mt-5 pt-5 border-t border-[#333333]">
								<p className={`m-0 ${NOTE_TEXT}`}>Estimated total</p>
								<p className="mt-1 mb-0 text-[44px] leading-[1.1] aktiv-grotesk-semibold text-white">
									{formatCurrency(estimatedYearlyTotal)}
									<span className="text-[18px] aktiv-grotesk-regular text-[#c4c4c4]"> a year</span>
								</p>
								{sellsOnline ? <p className={`mt-2 mb-0 ${NOTE_TEXT}`}>Plus card processing on each sale.</p> : null}
								<span className="sr-only">{resetMessage}</span>
							</div>
							<p className={`mt-5 mb-0 text-[15px] leading-[1.5] ${BODY_TEXT}`}>
								Build time is estimated separately, hour by hour, before any work begins.
							</p>
							<p className="mt-2 mb-0 text-[14px] leading-[1.5] text-[#a3a3a3] aktiv-grotesk-regular">
								Rates are each provider&apos;s published pricing and can change.
							</p>
						</aside>
						{/* Built from live state, so the link always carries what is on screen */}
						<Link href={quoteHref} className={`${PILL_PRIMARY} w-full`}>
							Get a full quote
						</Link>
						<button
							type="button"
							onClick={handleReset}
							className={`min-h-[48px] px-6 box-border rounded-full border border-[#6e6e6e] bg-transparent text-white text-[16px] aktiv-grotesk-semibold cursor-pointer transition-colors duration-300 hover:border-white ${FOCUS_RING}`}
						>
							Reset
						</button>
					</div>
				</div>

				<div className={`${CARD} mt-5 bg-[#000000] p-8`}>
					<h3 className="m-0 aktiv-grotesk-semibold text-white text-[24px] leading-[1.25]">How billing works</h3>
					<p className={`mt-3 mb-0 max-w-[46em] text-[17px] ${BODY_TEXT}`}>
						Before any work begins, you get an hour-by-hour estimate. The work is billed hourly with itemized invoices, with
						no retainers and no charge for coordination time. Changes beyond the agreed scope are billed the same way, so you
						always see what you&apos;re paying for.
					</p>
				</div>
			</div>
		</section>
	);
}
