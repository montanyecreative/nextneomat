"use client";

import { useCallback, useRef } from "react";
import { trackVideoComplete, trackVideoProgress, trackVideoStart, type VideoContext } from "@/lib/gtag";

/** GA4 reports video progress at these milestones. */
const PROGRESS_MILESTONES = [10, 25, 50, 75];

/**
 * Video engagement tracking for a native <video> element.
 *
 * Not used yet — wire it up when video ships:
 *
 *   const video = useVideoAnalytics({ title: "Studio reel", provider: "html5" });
 *   <video onPlay={video.onPlay} onTimeUpdate={video.onTimeUpdate} onEnded={video.onEnded} />
 *
 * For a YouTube embed, add `enablejsapi=1` to the iframe src and drive the same
 * callbacks from the YouTube IFrame Player API's onStateChange handler.
 */
export function useVideoAnalytics(meta: { title: string; url?: string; provider?: VideoContext["provider"] }) {
	const startedRef = useRef(false);
	const completedRef = useRef(false);
	const firedRef = useRef<Record<number, boolean>>({});

	const context = useCallback(
		(currentTime: number, duration: number): VideoContext => ({
			title: meta.title,
			url: meta.url || (typeof window !== "undefined" ? window.location.href : ""),
			duration,
			currentTime,
			percent: duration > 0 ? Math.round((currentTime / duration) * 100) : 0,
			provider: meta.provider || "html5",
		}),
		[meta.title, meta.url, meta.provider]
	);

	const onPlay = useCallback(
		(currentTime: number, duration: number) => {
			if (startedRef.current) return; // Resuming after a pause is not a new start.
			startedRef.current = true;
			trackVideoStart(context(currentTime, duration));
		},
		[context]
	);

	const onTimeUpdate = useCallback(
		(currentTime: number, duration: number) => {
			if (!duration) return;

			const percent = (currentTime / duration) * 100;

			for (let i = 0; i < PROGRESS_MILESTONES.length; i++) {
				const milestone = PROGRESS_MILESTONES[i];
				if (!firedRef.current[milestone] && percent >= milestone) {
					firedRef.current[milestone] = true;
					trackVideoProgress({ ...context(currentTime, duration), percent: milestone });
				}
			}
		},
		[context]
	);

	const onEnded = useCallback(
		(duration: number) => {
			if (completedRef.current) return;
			completedRef.current = true;
			trackVideoComplete({ ...context(duration, duration), percent: 100 });
		},
		[context]
	);

	/** Call when swapping the player to a different video. */
	const reset = useCallback(() => {
		startedRef.current = false;
		completedRef.current = false;
		firedRef.current = {};
	}, []);

	return { onPlay, onTimeUpdate, onEnded, reset };
}
