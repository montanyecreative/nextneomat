"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
	type CaseStudy,
	type CaseStudyFeature,
	type CaseStudyImage,
	type CaseStudyImagePair,
	type CaseStudyPalette,
	type CaseStudyPipeline,
	type RichText,
} from "../caseStudies";

const WRAP = "mx-auto w-full max-w-[1080px] px-7";

/** Turns a palette into the CSS variables every section below reads from. */
function paletteVars(palette: CaseStudyPalette): React.CSSProperties {
	return {
		"--cs-dark": palette.dark,
		"--cs-dark-frame": palette.darkFrame,
		"--cs-mist": palette.mist,
		"--cs-paper": palette.paper,
		"--cs-ink": palette.ink,
		"--cs-on-dark": palette.onDark,
		"--cs-on-dark-muted": palette.onDarkMuted,
		"--cs-muted-dark": palette.mutedDark,
		"--cs-muted-light": palette.mutedLight,
		"--cs-body-strong": palette.bodyStrong,
		"--cs-body": palette.body,
		"--cs-body-soft": palette.bodySoft,
		"--cs-accent": palette.accent,
		"--cs-accent-deep": palette.accentDeep,
		"--cs-accent-solid": palette.accentSolid,
		"--cs-on-accent": palette.onAccent,
		"--cs-spec-label": palette.specLabel,
		"--cs-glow": palette.glow,
		"--cs-tag-dark-bg": palette.tagDarkBg,
		"--cs-tag-dark-border": palette.tagDarkBorder,
		"--cs-tag-dark-text": palette.tagDarkText,
		"--cs-tag-light-bg": palette.tagLightBg,
		"--cs-tag-light-border": palette.tagLightBorder,
		"--cs-tag-light-text": palette.tagLightText,
		"--cs-system-card": palette.systemCard,
	} as React.CSSProperties;
}

function BackToCaseStudies() {
	const router = useRouter();

	const handleBack = () => {
		if (window.history.length > 1) {
			router.back();
			return;
		}
		router.push("/website-development#case-studies");
	};

	return (
		<Button
			type="button"
			variant="outline"
			onClick={handleBack}
			aria-label="Back to case studies"
			className="cs-display gap-2 rounded-full border-white/25 bg-transparent px-6 text-[12px] uppercase tracking-[0.02em] text-[var(--cs-on-dark)] hover:border-[var(--cs-accent)] hover:bg-[var(--cs-accent)] hover:text-[var(--cs-dark)]"
		>
			<ArrowLeft aria-hidden="true" className="h-4 w-4" />
			Back to case studies
		</Button>
	);
}

function Paragraph({ content, className }: { content: RichText; className?: string }) {
	return (
		<p className={className}>
			{content.map((part, index) => (
				<Fragment key={index}>{typeof part === "string" ? part : <strong className="font-semibold">{part.bold}</strong>}</Fragment>
			))}
		</p>
	);
}

function Kicker({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
	return (
		<span
			className={`cs-display block text-[12px] font-semibold uppercase tracking-[0.2em] ${
				tone === "dark" ? "text-[var(--cs-accent)]" : "text-[var(--cs-accent-deep)]"
			}`}
		>
			{children}
		</span>
	);
}

type FrameTone = "dark" | "light";

type Scheme = CaseStudyPalette["scheme"];

/**
 * The tinted band. On an all-dark study the tint alone is too close to the page
 * background to read as a separate band, so it picks up a hairline rule.
 */
function mistBand(scheme: Scheme): string {
	return scheme === "dark" ? "bg-[var(--cs-mist)] border-y border-white/[0.06]" : "bg-[var(--cs-mist)]";
}

function Caption({ children, tone }: { children: React.ReactNode; tone: FrameTone }) {
	return (
		<figcaption
			className={`cs-mono mt-3.5 text-[12px] tracking-[0.02em] ${
				tone === "dark" ? "text-[var(--cs-muted-dark)]" : "text-[var(--cs-muted-light)]"
			}`}
		>
			{children}
		</figcaption>
	);
}

function Shot({ image, tone, sizes }: { image: CaseStudyImage; tone: FrameTone; sizes: string }) {
	return (
		<div
			className={`overflow-hidden rounded-[14px] border ${
				tone === "dark"
					? "border-white/[0.14] bg-[var(--cs-dark-frame)] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]"
					: "border-black/[0.12] bg-white shadow-[0_30px_60px_-34px_rgba(14,31,43,0.32)]"
			}`}
		>
			<Image
				src={image.src}
				alt={image.alt}
				width={image.width}
				height={image.height}
				sizes={sizes}
				className="block h-auto w-full"
			/>
		</div>
	);
}

function Frame({ image, tone = "dark" }: { image: CaseStudyImage; tone?: FrameTone }) {
	return (
		<figure className="m-0">
			<Shot image={image} tone={tone} sizes="(max-width: 768px) 100vw, 1080px" />
			{image.caption ? <Caption tone={tone}>{image.caption}</Caption> : null}
		</figure>
	);
}

/** Two screenshots side by side under one shared caption. */
function FramePair({ pair, tone }: { pair: CaseStudyImagePair; tone: FrameTone }) {
	return (
		<figure className="m-0">
			<div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
				{pair.images.map((image) => (
					<Shot key={image.src} image={image} tone={tone} sizes="(max-width: 640px) 100vw, 33vw" />
				))}
			</div>
			{pair.caption ? <Caption tone={tone}>{pair.caption}</Caption> : null}
		</figure>
	);
}

/** The fulfillment stage strip — the signature element of an operations-heavy study. */
function Pipeline({ pipeline }: { pipeline: CaseStudyPipeline }) {
	return (
		<div className="mt-[26px]">
			<ol className="flex list-none flex-col overflow-hidden rounded-xl border border-white/[0.14] bg-[var(--cs-system-card)] p-0 md:flex-row">
				{pipeline.stages.map((stage, index) => (
					<li
						key={stage.label}
						className={`relative flex-1 px-4 py-[18px] text-center ${
							index < pipeline.stages.length - 1
								? "border-b border-white/[0.14] md:border-b-0 md:border-r"
								: ""
						}`}
					>
						<span
							className={`cs-mono text-[11px] ${
								stage.state === "done" ? "text-[var(--cs-muted-dark)]" : "text-[var(--cs-accent)]"
							}`}
						>
							{stage.step} · {stage.state}
						</span>
						<span className="cs-display mt-1.5 block text-[15px] font-semibold text-white">{stage.label}</span>
						<span className="mt-1 block text-[12px] leading-[1.4] text-[var(--cs-muted-dark)]">
							{stage.description}
						</span>
						{index < pipeline.stages.length - 1 ? (
							<span
								aria-hidden="true"
								className="absolute -right-2 top-1/2 z-[2] hidden h-4 w-4 -translate-y-1/2 -rotate-45 border-b border-r border-white/[0.14] bg-[var(--cs-system-card)] md:block"
							/>
						) : null}
					</li>
				))}
			</ol>
			{pipeline.note ? (
				<p className="cs-mono mt-3 text-[11.5px] text-[var(--cs-muted-dark)]">{pipeline.note}</p>
			) : null}
		</div>
	);
}

function Tags({ tags, tone }: { tags: string[]; tone: "dark" | "light" }) {
	return (
		<ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
			{tags.map((tag) => (
				<li
					key={tag}
					className={`cs-mono rounded-md border px-[11px] py-1.5 text-[12px] ${
						tone === "dark"
							? "border-[var(--cs-tag-dark-border)] bg-[var(--cs-tag-dark-bg)] text-[var(--cs-tag-dark-text)]"
							: "border-[var(--cs-tag-light-border)] bg-[var(--cs-tag-light-bg)] text-[var(--cs-tag-light-text)]"
					}`}
				>
					{tag}
				</li>
			))}
		</ul>
	);
}

function FeatureSection({ feature, scheme }: { feature: CaseStudyFeature; scheme: Scheme }) {
	const isDark = feature.theme === "dark";
	/** A study whose every band is dark keeps its frames and tags on the dark treatment throughout. */
	const tone: FrameTone = isDark || scheme === "dark" ? "dark" : "light";
	const isFull = feature.layout === "full";

	const art = feature.imagePair ? (
		<FramePair pair={feature.imagePair} tone={tone} />
	) : feature.image ? (
		<Frame image={feature.image} tone={tone} />
	) : null;

	const copy = (
		<div>
			<Kicker tone={isDark ? "dark" : "light"}>{feature.kick}</Kicker>
			<h2
				className={`cs-display mt-3.5 text-[28px] leading-[1.08] tracking-[-0.02em] md:text-[40px] ${
					isDark ? "text-white" : "text-[var(--cs-ink)]"
				}`}
			>
				{feature.heading}
			</h2>
			{feature.lead ? (
				<p className={`mt-5 max-w-[700px] text-[19px] ${isDark ? "text-[var(--cs-on-dark-muted)]" : "text-[var(--cs-body-strong)]"}`}>
					{feature.lead}
				</p>
			) : null}
			{feature.body.map((paragraph, index) => (
				<Paragraph
					key={index}
					content={paragraph}
					className={`mt-4 max-w-[700px] ${isDark ? "text-[var(--cs-on-dark-muted)]" : "text-[var(--cs-body)]"}`}
				/>
			))}
			{feature.tags ? <Tags tags={feature.tags} tone={tone} /> : null}
		</div>
	);

	return (
		<section
			className={`py-16 md:py-[76px] ${
				isDark ? "bg-[var(--cs-dark)]" : feature.theme === "mist" ? mistBand(scheme) : ""
			}`}
		>
			<div className={WRAP}>
				{isFull ? (
					<>
						{copy}
						{feature.pipeline ? <Pipeline pipeline={feature.pipeline} /> : null}
						{art ? <div className="mt-[34px]">{art}</div> : null}
					</>
				) : (
					<div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-[52px]">
						{feature.reverse ? (
							<>
								{art}
								{copy}
							</>
						) : (
							<>
								{copy}
								{art}
							</>
						)}
					</div>
				)}
			</div>
		</section>
	);
}

export default function CaseStudyView({ study }: { study: CaseStudy }) {
	const systemPanel = study.system ? (
		<section className="bg-[var(--cs-dark)] py-16 text-[var(--cs-on-dark)] md:py-[76px]">
			<div className={WRAP}>
				<Kicker tone="dark">{study.system.kick}</Kicker>
				<h2 className="cs-display mb-2 mt-3.5 text-[28px] leading-[1.08] tracking-[-0.02em] text-white md:text-[40px]">
					{study.system.heading}
				</h2>
				{study.system.note ? (
					<p className="cs-mono mb-[30px] text-[13px] text-[var(--cs-muted-dark)]">{study.system.note}</p>
				) : null}
				<ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
					{study.system.groups.map((group) => (
						<li
							key={group.title}
							className="rounded-xl border border-white/[0.14] bg-[var(--cs-system-card)] px-5 pb-[18px] pt-5"
						>
							<h3 className="cs-mono mb-3.5 text-[11.5px] font-medium uppercase tracking-[0.12em] text-[var(--cs-accent)]">
								{group.title}
							</h3>
							<ul className="list-none p-0">
								{group.items.map((item, index) => (
									<li key={index} className="flex gap-2 py-1">
										<span aria-hidden="true" className="cs-mono font-bold text-[var(--cs-accent)]">
											▸
										</span>
										<Paragraph
											content={item}
											className="cs-mono text-[13px] leading-[1.45] text-[var(--cs-on-dark-muted)] [&>strong]:font-medium [&>strong]:text-white"
										/>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>
		</section>
	) : null;

	return (
		<article style={paletteVars(study.palette)} className="bg-[var(--cs-paper)] text-[var(--cs-ink)]">
			<Navbar />
			<div className="page-banner-filler bg-[var(--cs-dark)]" />
			{/* Top bar */}
			<div className="border-b border-white/[0.14] bg-[var(--cs-dark)]">
				<div className={`${WRAP} flex flex-wrap items-center justify-between gap-4 py-4`}>
					<BackToCaseStudies />
					{study.liveUrl ? (
						<Link
							href={study.liveUrl}
							target="_blank"
							rel="noopener"
							aria-label={`Open the live ${study.titleLines.join(" ")} site in a new tab`}
							className="cs-display text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--cs-accent)] transition-colors hover:text-[var(--cs-on-dark)]"
						>
							Live site →
						</Link>
					) : null}
				</div>
			</div>

			{/* Hero */}
			<header className="relative overflow-hidden bg-[var(--cs-dark)] pb-16 pt-14 text-[var(--cs-on-dark)] md:pb-[88px] md:pt-[78px]">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -right-[120px] -top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,var(--cs-glow),transparent)]"
				/>
				<div className={`${WRAP} relative`}>
					<span className="cs-display inline-flex items-center gap-[9px] text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--cs-accent)]">
						<span aria-hidden="true" className="h-px w-[26px] bg-[var(--cs-accent)] opacity-60" />
						{study.eyebrow}
					</span>
					<h1 className="cs-display mt-[22px] text-[44px] font-bold leading-[1.02] tracking-[-0.02em] text-white md:text-[86px]">
						{study.titleLines.map((line) => (
							<span key={line} className="block">
								{line}
							</span>
						))}
					</h1>
					<p className="mt-5 max-w-[640px] text-[17px] leading-[1.5] text-[var(--cs-on-dark-muted)] md:text-[21px]">
						{study.summary}
					</p>

					{study.meta ? (
						<dl className="mt-[38px] grid grid-cols-1 border-y border-white/[0.14] md:grid-cols-4">
							{study.meta.map((item, index) => (
								<div
									key={item.label}
									className={`py-4 md:pr-[22px] ${
										index < study.meta!.length - 1
											? "border-b border-white/[0.14] md:border-b-0 md:border-r"
											: ""
									}`}
								>
									<dt className="ml-5 text-[11px] uppercase tracking-[0.16em] text-[var(--cs-muted-dark)]">
										{item.label}
									</dt>
									<dd className="cs-mono ml-5 mt-[7px] text-[13.5px] text-[var(--cs-on-dark)]">{item.value}</dd>
								</div>
							))}
						</dl>
					) : null}
				</div>
			</header>

			{/* Showcase */}
			{study.showcase ? (
				<section className="bg-[var(--cs-dark)] pb-16 md:pb-[76px]">
					<div className={WRAP}>
						<Frame image={study.showcase} tone="dark" />
					</div>
				</section>
			) : null}

			{/* Brief */}
			{study.brief ? (
				<section
					className={`py-16 md:py-[76px] ${
						study.brief.theme === "light" ? "" : mistBand(study.palette.scheme)
					}`}
				>
					<div className={WRAP}>
						<Kicker>{study.brief.kick}</Kicker>
						<h2 className="cs-display mt-3.5 text-[28px] leading-[1.08] tracking-[-0.02em] text-[var(--cs-ink)] md:text-[40px]">
							{study.brief.heading}
						</h2>
						<p className="mt-5 max-w-[680px] text-[19px] text-[var(--cs-body-strong)]">{study.brief.lead}</p>
						{study.brief.body.map((paragraph, index) => (
							<Paragraph key={index} content={paragraph} className="mt-4 max-w-[680px] text-[var(--cs-body)]" />
						))}
					</div>
				</section>
			) : null}

			{/* Spec sheet */}
			{study.spec ? (
				<section className="py-16 md:py-[76px]">
					<div className={WRAP}>
						<Kicker>{study.spec.kick}</Kicker>
						<h2 className="cs-display mb-5 mt-3.5 text-[28px] leading-[1.08] tracking-[-0.02em] text-[var(--cs-ink)] md:text-[40px]">
							{study.spec.heading}
						</h2>
						<dl className="grid grid-cols-1 gap-x-14 md:grid-cols-2">
							{study.spec.items.map((item) => (
								<div
									key={item.label}
									className="flex items-baseline justify-between gap-4 border-b border-black/[0.12] py-[15px]"
								>
									<dt className="ml-5 text-[14px] font-semibold text-[var(--cs-spec-label)]">{item.label}</dt>
									<dd className="cs-mono ml-5 text-right text-[13.5px] text-[var(--cs-ink)]">{item.value}</dd>
								</div>
							))}
						</dl>
						{study.spec.note ? (
							<p className="cs-mono mt-[22px] text-[12px] tracking-[0.02em] text-[var(--cs-muted-light)]">
								{study.spec.note}
							</p>
						) : null}
					</div>
				</section>
			) : null}

			{/* System panel — placed before or after the walkthrough, per the study */}
			{study.systemPlacement !== "after-features" ? systemPanel : null}

			{/* Feature blocks */}
			{study.features?.map((feature) => (
				<FeatureSection key={feature.heading} feature={feature} scheme={study.palette.scheme} />
			))}

			{study.systemPlacement === "after-features" ? systemPanel : null}

			{/* What it demonstrates */}
			{study.demonstrates ? (
				<section className={`py-16 md:py-[76px] ${mistBand(study.palette.scheme)}`}>
					<div className={WRAP}>
						<Kicker>{study.demonstrates.kick}</Kicker>
						<h2 className="cs-display mt-3.5 text-[28px] leading-[1.08] tracking-[-0.02em] text-[var(--cs-ink)] md:text-[40px]">
							{study.demonstrates.heading}
						</h2>
						<ul className="mt-[34px] grid list-none grid-cols-1 gap-x-11 gap-y-[26px] p-0 md:grid-cols-2">
							{study.demonstrates.items.map((item) => (
								<li key={item.title} className="border-t-2 border-[var(--cs-accent-solid)] pt-4">
									<h3 className="cs-display text-[17px] font-semibold text-[var(--cs-ink)]">{item.title}</h3>
									<p className="mt-1.5 text-[14.5px] text-[var(--cs-body-soft)]">{item.description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>
			) : null}

			{/* CTA */}
			{study.cta ? (
				<section className="bg-[var(--cs-dark)] px-0 pb-8 pt-16 text-center text-[var(--cs-on-dark)] md:pt-[74px]">
					<div className={WRAP}>
						<Kicker tone="dark">{study.cta.kick}</Kicker>
						<h2 className="cs-display mx-auto mt-3.5 max-w-[640px] text-[30px] font-bold leading-[1.06] tracking-[-0.02em] text-white md:text-[46px]">
							{study.cta.heading}
						</h2>
						<p className="mx-auto mt-[18px] max-w-[520px] text-[var(--cs-on-dark-muted)]">{study.cta.body}</p>

						{study.cta.links ? (
							<div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
								{study.cta.links.map((link, index) => (
									<Link
										key={link.href}
										href={link.href}
										aria-label={link.label}
										{...(link.external ? { target: "_blank", rel: "noopener" } : {})}
									>
										<Button
											variant="outline"
											className={`cs-display rounded-full px-6 text-[14px] font-semibold tracking-[0.02em] transition-transform hover:-translate-y-0.5 ${
												index === 0
													? "border-[var(--cs-accent-solid)] bg-[var(--cs-accent-solid)] text-[var(--cs-on-accent)] hover:border-[var(--cs-accent-solid)] hover:bg-[var(--cs-accent-solid)] hover:text-[var(--cs-on-accent)]"
													: "border-white/[0.14] bg-transparent text-[var(--cs-on-dark)] hover:border-white/[0.14] hover:bg-transparent hover:text-[var(--cs-on-dark)]"
											}`}
										>
											{link.label}
										</Button>
									</Link>
								))}
							</div>
						) : null}

						<div className="cs-mono mt-14 flex flex-wrap justify-between gap-2.5 border-t border-white/[0.14] pt-[22px] text-[12px] text-[var(--cs-muted-dark)]">
							<span>{study.titleLines.join(" ")} · Case Study</span>
							{study.cta.footNote ? <span>{study.cta.footNote}</span> : null}
						</div>

						<div className="mt-10 flex justify-center pb-6">
							<BackToCaseStudies />
						</div>
					</div>
				</section>
			) : null}
		</article>
	);
}
