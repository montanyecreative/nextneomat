"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type MonetizationChoice = "personal" | "commercial" | null;
type FormPlan = "free" | "starter" | "growth";
type EmailMarketingPlan = "free" | "starter";

function selectionCardClass(isSelected: boolean) {
	return cn(
		"group relative rounded-xl p-4 text-left border-2 transition-all duration-200 cursor-pointer",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mcRed focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
		isSelected
			? "border-mcRed bg-mcRed/15 ring-2 ring-mcRed/30 shadow-[0_0_0_1px_rgba(198,40,74,0.35)]"
			: "border-dashed border-white/35 bg-white/5 hover:border-white/70 hover:bg-white/10 hover:-translate-y-0.5",
	);
}

function SelectionIndicator({ isSelected }: { isSelected: boolean }) {
	return (
		<div className="flex items-center justify-between gap-2 mb-2">
			<span
				className={cn(
					"text-[10px] uppercase tracking-wider proxima-nova-semibold",
					isSelected ? "text-mcRed" : "text-white/45 group-hover:text-white/70",
				)}
			>
				{isSelected ? "Selected" : "Select"}
			</span>
			<span
				className={cn(
					"flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
					isSelected ? "border-mcRed bg-mcRed text-white" : "border-white/40 bg-transparent group-hover:border-white/70",
				)}
				aria-hidden="true"
			>
				{isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
			</span>
		</div>
	);
}

const HOSTING_COMMERCIAL_YEARLY = 240;
const DOMAIN_YEARLY = 15;

const formPlanOrder: FormPlan[] = ["free", "starter", "growth"];

const formPlans: Record<
	FormPlan,
	{
		name: string;
		monthly: number;
		yearly: number;
		features: string[];
	}
> = {
	free: {
		name: "Free",
		monthly: 0,
		yearly: 0,
		features: ["1 form", "50 submissions a month (not including spam)", "30 day data retention"],
	},
	starter: {
		name: "Starter",
		monthly: 15,
		yearly: 150,
		features: ["3 different forms", "250 submissions (not including spam)", "1 project", "365 days of data retention"],
	},
	growth: {
		name: "Growth",
		monthly: 29,
		yearly: 290.04,
		features: ["Unlimited forms", "1,000 submissions (not including spam)", "Unlimited projects", "Unlimited data retention"],
	},
};

const emailMarketingPlanOrder: EmailMarketingPlan[] = ["free", "starter"];

const emailMarketingPlans: Record<
	EmailMarketingPlan,
	{
		name: string;
		monthly: number;
		yearly: number;
		features: string[];
	}
> = {
	free: {
		name: "Free",
		monthly: 0,
		yearly: 0,
		features: [
			"250 active contacts",
			"Email signup",
			"Real-time segmenting",
			"500 email messages a month",
			"150 text messages a month",
		],
	},
	starter: {
		name: "Starter",
		monthly: 35,
		yearly: 420,
		features: [
			"500 active contacts",
			"Email signup",
			"Real-time segmenting",
			"5,000 email messages a month",
			"1,250 text messages a month",
		],
	},
};

function formatCurrency(amount: number, decimals = 0) {
	return amount.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});
}

export default function WhatToExpect() {
	const [monetization, setMonetization] = useState<MonetizationChoice>("personal");
	const [needsContactForms, setNeedsContactForms] = useState(false);
	const [selectedFormPlan, setSelectedFormPlan] = useState<FormPlan | null>(null);
	const [needsEmailMarketing, setNeedsEmailMarketing] = useState(false);
	const [selectedEmailMarketingPlan, setSelectedEmailMarketingPlan] = useState<EmailMarketingPlan | null>(null);
	const [needsDomain, setNeedsDomain] = useState(false);

	const hostingYearly = monetization === "commercial" ? HOSTING_COMMERCIAL_YEARLY : 0;
	const hostingMonthly = hostingYearly / 12;
	const formsYearly = needsContactForms && selectedFormPlan ? formPlans[selectedFormPlan].yearly : 0;
	const emailMarketingYearly =
		needsEmailMarketing && selectedEmailMarketingPlan ? emailMarketingPlans[selectedEmailMarketingPlan].yearly : 0;
	const domainYearly = needsDomain ? DOMAIN_YEARLY : 0;
	const estimatedYearlyTotal = hostingYearly + formsYearly + emailMarketingYearly + domainYearly;

	const breakdownParts: string[] = [];
	if (monetization !== null) {
		breakdownParts.push(`${formatCurrency(hostingYearly)} hosting`);
		if (formsYearly > 0) {
			breakdownParts.push(`${formatCurrency(formsYearly, formsYearly % 1 === 0 ? 0 : 2)} contact forms`);
		}
		if (emailMarketingYearly > 0) {
			breakdownParts.push(`${formatCurrency(emailMarketingYearly)} email marketing`);
		}
		if (domainYearly > 0) {
			breakdownParts.push(`${formatCurrency(domainYearly)} domain`);
		}
	}
	const breakdownText = breakdownParts.length > 0 ? `Includes ${breakdownParts.join(" + ")}` : "";

	const handleContactFormsToggle = (enabled: boolean) => {
		setNeedsContactForms(enabled);
		if (!enabled) {
			setSelectedFormPlan(null);
		}
	};

	const handleEmailMarketingToggle = (enabled: boolean) => {
		setNeedsEmailMarketing(enabled);
		if (!enabled) {
			setSelectedEmailMarketingPlan(null);
		}
	};

	return (
		<section
			className="relative z-0 isolate w-full pb-4 md:pb-6 aktiv-grotesk-regular overflow-hidden"
			aria-labelledby="what-to-expect-heading"
		>
			<div className="container-fluid mx-auto">
				<p className="text-white/70 text-sm md:text-base text-center mb-3 max-w-5xl mx-auto">
					We believe in and value transparency and clarity in pricing. You shouldn&apos;t be charged an arm and a leg just to
					maintain a web presence. <br />
					We&apos;ve created this calculator so that you can see exactly how much services through us will cost.
				</p>

				<div className="glass-card rounded-2xl p-4 md:p-6 space-y-4">
					<fieldset className="border-0 p-0 m-0">
						<legend className="text-[17px] md:text-[18px] text-white proxima-nova-semibold mb-3 w-full text-center">
							Do you plan to make money from your website?
						</legend>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<button
								type="button"
								onClick={() => setMonetization("personal")}
								className={selectionCardClass(monetization === "personal")}
								aria-pressed={monetization === "personal"}
							>
								<SelectionIndicator isSelected={monetization === "personal"} />
								<span className="block text-white proxima-nova-semibold text-[15px] md:text-[16px] mb-1.5">
									No — personal or nonprofit
								</span>
								<span className="block text-white/70 text-sm leading-relaxed">
									Portfolio, resume, wedding site, hobby blog, or any site where you are not generating revenue.
								</span>
							</button>
							<button
								type="button"
								onClick={() => setMonetization("commercial")}
								className={selectionCardClass(monetization === "commercial")}
								aria-pressed={monetization === "commercial"}
							>
								<SelectionIndicator isSelected={monetization === "commercial"} />
								<span className="block text-white proxima-nova-semibold text-[15px] md:text-[16px] mb-1.5">
									Yes — business or commerce
								</span>
								<span className="block text-white/70 text-sm leading-relaxed">
									Selling products, services, ads, memberships, or any other way of earning from the site.
								</span>
							</button>
						</div>
					</fieldset>

					<div className="flex items-center justify-between gap-3 rounded-xl border border-white/15 px-3 py-2">
						<label htmlFor="contact-forms-toggle" className="text-white proxima-nova-semibold text-[15px] md:text-[16px]">
							Do you need contact forms?
						</label>
						<div className="flex items-center gap-2 shrink-0">
							<span
								className={cn(
									"text-xs uppercase tracking-wide proxima-nova-semibold w-6 text-right",
									needsContactForms ? "text-mcRed" : "text-white/60",
								)}
								aria-hidden="true"
							>
								{needsContactForms ? "Yes" : "No"}
							</span>
							<button
								id="contact-forms-toggle"
								type="button"
								role="switch"
								aria-checked={needsContactForms}
								onClick={() => handleContactFormsToggle(!needsContactForms)}
								className={cn(
									"relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
									needsContactForms ? "bg-mcRed" : "bg-white/20",
								)}
							>
								<span
									className={cn(
										"pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow transition-transform",
										needsContactForms ? "translate-x-5" : "translate-x-0",
									)}
								/>
							</button>
						</div>
					</div>

					<div
						className={cn(
							"grid transition-all duration-300 ease-in-out",
							needsContactForms ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
						)}
					>
						<div className="overflow-hidden min-h-0">
							<div className="rounded-xl border border-white/15 p-3">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
									{formPlanOrder.map((planId) => {
										const plan = formPlans[planId];
										const isSelected = selectedFormPlan === planId;
										return (
											<button
												key={planId}
												type="button"
												onClick={() => setSelectedFormPlan(planId)}
												className={selectionCardClass(isSelected)}
												aria-pressed={isSelected}
											>
												<SelectionIndicator isSelected={isSelected} />
												<div className="flex items-baseline justify-between gap-2 mb-1">
													<span className="text-white proxima-nova-semibold text-[15px]">{plan.name}</span>
												</div>
												<p className="text-white proxima-nova-semibold text-[13px] mb-1.5">
													{planId === "free" ? (
														"Free"
													) : (
														<>
															{formatCurrency(plan.yearly, plan.yearly % 1 === 0 ? 0 : 2)}
															<span className="text-white/60 text-xs font-normal"> / year</span>
															<span className="text-white/50 text-xs font-normal mx-1.5">or</span>
															{formatCurrency(plan.monthly)}
															<span className="text-white/60 text-xs font-normal"> / mo</span>
														</>
													)}
												</p>
												<p className="text-white/70 text-xs leading-relaxed">{plan.features.join(" · ")}</p>
											</button>
										);
									})}
								</div>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between gap-3 rounded-xl border border-white/15 px-3 py-2">
						<label
							htmlFor="email-marketing-toggle"
							className="text-white proxima-nova-semibold text-[15px] md:text-[16px] leading-snug pr-2"
						>
							Do you need email and text messaging marketing like an email sign up?
						</label>
						<div className="flex items-center gap-2 shrink-0">
							<span
								className={cn(
									"text-xs uppercase tracking-wide proxima-nova-semibold w-6 text-right",
									needsEmailMarketing ? "text-mcRed" : "text-white/60",
								)}
								aria-hidden="true"
							>
								{needsEmailMarketing ? "Yes" : "No"}
							</span>
							<button
								id="email-marketing-toggle"
								type="button"
								role="switch"
								aria-checked={needsEmailMarketing}
								onClick={() => handleEmailMarketingToggle(!needsEmailMarketing)}
								className={cn(
									"relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
									needsEmailMarketing ? "bg-mcRed" : "bg-white/20",
								)}
							>
								<span
									className={cn(
										"pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow transition-transform",
										needsEmailMarketing ? "translate-x-5" : "translate-x-0",
									)}
								/>
							</button>
						</div>
					</div>

					<div
						className={cn(
							"grid transition-all duration-300 ease-in-out",
							needsEmailMarketing ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
						)}
					>
						<div className="overflow-hidden min-h-0">
							<div className="rounded-xl border border-white/15 p-3">
								<p className="text-white/55 text-xs text-center mb-2">Tap a plan to include it in your estimate</p>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
									{emailMarketingPlanOrder.map((planId) => {
										const plan = emailMarketingPlans[planId];
										const isSelected = selectedEmailMarketingPlan === planId;
										return (
											<button
												key={planId}
												type="button"
												onClick={() => setSelectedEmailMarketingPlan(planId)}
												className={selectionCardClass(isSelected)}
												aria-pressed={isSelected}
											>
												<SelectionIndicator isSelected={isSelected} />
												<div className="flex items-baseline justify-between gap-2 mb-1">
													<span className="text-white proxima-nova-semibold text-[15px]">{plan.name}</span>
												</div>
												<p className="text-white proxima-nova-semibold text-[13px] mb-1.5">
													{planId === "free" ? (
														"Free"
													) : (
														<>
															{formatCurrency(plan.yearly)}
															<span className="text-white/60 text-xs font-normal"> / year</span>
															<span className="text-white/50 text-xs font-normal mx-1.5">or</span>
															{formatCurrency(plan.monthly)}
															<span className="text-white/60 text-xs font-normal"> / mo</span>
														</>
													)}
												</p>
												<p className="text-white/70 text-xs leading-relaxed">{plan.features.join(" · ")}</p>
											</button>
										);
									})}
								</div>
							</div>
						</div>
					</div>

					<div
						className={cn(
							"rounded-xl border border-white/15 p-4 md:p-5 transition-opacity",
							monetization === null && "opacity-50",
						)}
					>
						<h3 className="text-[18px] md:text-[20px] text-white proxima-nova-semibold mb-2">Hosting</h3>
						{monetization === null ? (
							<p className="text-white/60 text-sm md:text-base">Select an option above to see your estimated hosting cost.</p>
						) : monetization === "personal" ? (
							<>
								<p className="text-white/80 text-sm leading-relaxed mb-2">
									If you do not plan to make money from your site, hosting is included at no charge. That covers a secure,
									reliable server with 99.9% uptime.
								</p>
								<p className="text-[28px] md:text-[32px] text-white proxima-nova-semibold">
									{formatCurrency(0)}
									<span className="text-[14px] md:text-[16px] text-white/60 font-normal ml-2">/ year</span>
								</p>
							</>
						) : (
							<>
								<p className="text-white/80 text-sm leading-relaxed mb-2">
									If you plan to make money from your site, fair use licensing is required which adds a hosting cost.
								</p>
								<p className="text-[28px] md:text-[32px] text-white proxima-nova-semibold">
									{formatCurrency(HOSTING_COMMERCIAL_YEARLY)}
									<span className="text-[14px] md:text-[16px] text-white/60 font-normal ml-2">/ year</span>
								</p>
								<p className="text-white/50 text-xs mt-1">Approximately {formatCurrency(hostingMonthly)} per month.</p>
							</>
						)}
						{monetization !== null && (
							<div className="mt-3 pt-3 border-t border-white/10">
								<div className="flex items-center justify-between gap-3 rounded-xl border border-white/15 px-3 py-2 mb-2">
									<label htmlFor="has-url-toggle" className="text-white proxima-nova-semibold text-[15px] md:text-[16px]">
										Do you need to purchase a URL?
									</label>
									<div className="flex items-center gap-2 shrink-0">
										<span
											className={cn(
												"text-xs uppercase tracking-wide proxima-nova-semibold w-6 text-right",
												needsDomain ? "text-mcRed" : "text-white/60",
											)}
											aria-hidden="true"
										>
											{needsDomain ? "Yes" : "No"}
										</span>
										<button
											id="has-url-toggle"
											type="button"
											role="switch"
											aria-checked={needsDomain}
											onClick={() => setNeedsDomain(!needsDomain)}
											className={cn(
												"relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
												needsDomain ? "bg-mcRed" : "bg-white/20",
											)}
										>
											<span
												className={cn(
													"pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow transition-transform",
													needsDomain ? "translate-x-5" : "translate-x-0",
												)}
											/>
										</button>
									</div>
								</div>
								<p className="text-white/70 text-sm leading-relaxed">
									{needsDomain ? (
										<>
											Domain registration is included in your estimate at approximately{" "}
											{formatCurrency(DOMAIN_YEARLY)} per year on average. You can search for available names at{" "}
											<a
												href="https://vercel.com/domains/search"
												target="_blank"
												rel="noopener noreferrer"
												className="underline text-white hover:text-mcRed transition-colors"
												aria-label="Search for available domain names on Vercel (opens in new tab)"
											>
												Vercel Domains
											</a>
											.
										</>
									) : (
										<>
											If you already have a URL, no additional domain cost is included in your estimate. You can still
											search for available names at{" "}
											<a
												href="https://vercel.com/domains/search"
												target="_blank"
												rel="noopener noreferrer"
												className="underline text-white hover:text-mcRed transition-colors"
												aria-label="Search for available domain names on Vercel (opens in new tab)"
											>
												Vercel Domains
											</a>
											.
										</>
									)}
								</p>
							</div>
						)}
					</div>

					<div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-h-[5.5rem]">
						<div className="flex flex-col justify-center min-h-[4.5rem]">
							<p className="text-white/60 text-xs uppercase tracking-wide mb-0.5">Estimated yearly total</p>
							<p className="text-[24px] md:text-[28px] text-white proxima-nova-semibold leading-tight min-h-[2rem] md:min-h-[2.25rem]">
								{monetization !== null ? formatCurrency(estimatedYearlyTotal, estimatedYearlyTotal % 1 === 0 ? 0 : 2) : "—"}
							</p>
							<p
								className={cn(
									"text-white/50 text-sm mt-1 min-h-[2.5rem] leading-snug",
									!breakdownText && "text-transparent select-none",
								)}
								aria-hidden={!breakdownText}
							>
								{breakdownText || "Includes placeholder for layout stability"}
							</p>
						</div>
						<Link href="/contact" aria-label="Get a full project quote" className="shrink-0 self-center sm:self-auto">
							<Button
								variant="outline"
								className="rounded-full px-10 w-full sm:w-auto text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
							>
								Get a Full Quote
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
