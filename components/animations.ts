"use client";

import { useEffect, useLayoutEffect, RefObject } from "react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates an element sliding in from the left on page load
 * Returns initial styles to apply directly in JSX to prevent flash
 */
export function useSlideInFromLeft(
	ref: RefObject<HTMLElement | null>,
	options: { duration?: number; ease?: string; delay?: number } = {}
) {
	// Set initial state immediately before paint
	useLayoutEffect(() => {
		if (ref.current) {
			gsap.set(ref.current, {
				x: -100,
				opacity: 0,
				force3D: true,
				immediateRender: true,
			});
		}
	}, [ref]);

	useEffect(() => {
		if (ref.current) {
			gsap.to(ref.current, {
				x: 0,
				opacity: 1,
				duration: options.duration ?? 1,
				ease: options.ease ?? "power3.out",
				delay: options.delay ?? 0,
				force3D: true,
			});
		}
	}, [ref, options.duration, options.ease, options.delay]);

	// Return initial styles to apply in JSX for immediate hiding
	return {
		style: {
			opacity: 0,
			transform: "translate3d(-100px, 0, 0)",
			willChange: "transform, opacity",
		} as React.CSSProperties,
	};
}

/**
 * Animates an element sliding in from the right on page load
 * Returns initial styles to apply directly in JSX to prevent flash
 */
export function useSlideInFromRight(
	ref: RefObject<HTMLElement | null>,
	options: { duration?: number; ease?: string; delay?: number } = {}
) {
	// Set initial state immediately before paint
	useLayoutEffect(() => {
		if (ref.current) {
			gsap.set(ref.current, {
				x: 100,
				opacity: 0,
				force3D: true,
				immediateRender: true,
			});
		}
	}, [ref]);

	useEffect(() => {
		if (ref.current) {
			gsap.to(ref.current, {
				x: 0,
				opacity: 1,
				duration: options.duration ?? 1,
				ease: options.ease ?? "power3.out",
				delay: options.delay ?? 0,
				force3D: true,
			});
		}
	}, [ref, options.duration, options.ease, options.delay]);

	// Return initial styles to apply in JSX for immediate hiding
	return {
		style: {
			opacity: 0,
			transform: "translate3d(100px, 0, 0)",
			willChange: "transform, opacity",
		} as React.CSSProperties,
	};
}

/**
 * Animates an element fading in from the bottom on page load
 * Returns initial styles to apply directly in JSX to prevent flash
 */
export function useFadeInFromBottom(
	ref: RefObject<HTMLElement | null>,
	options: { duration?: number; ease?: string; delay?: number; distance?: number } = {}
) {
	const distance = options.distance ?? 50;

	// Set initial state immediately before paint
	useLayoutEffect(() => {
		if (ref.current) {
			gsap.set(ref.current, {
				y: distance,
				opacity: 0,
				force3D: true,
				immediateRender: true,
			});
		}
	}, [ref, distance]);

	useEffect(() => {
		if (ref.current) {
			gsap.to(ref.current, {
				y: 0,
				opacity: 1,
				duration: options.duration ?? 1,
				ease: options.ease ?? "power3.out",
				delay: options.delay ?? 0,
				force3D: true,
			});
		}
	}, [ref, options.duration, options.ease, options.delay, distance]);

	// Return initial styles to apply in JSX for immediate hiding
	return {
		style: {
			opacity: 0,
			transform: `translate3d(0, ${distance}px, 0)`,
			willChange: "transform, opacity",
		} as React.CSSProperties,
	};
}

/**
 * Animates an element fading in from the bottom when scrolled into view
 * Returns initial styles to apply directly in JSX to prevent flash
 */
export function useFadeInFromBottomOnScroll(
	ref: RefObject<HTMLElement | null>,
	options: { duration?: number; ease?: string; distance?: number; start?: string } = {}
) {
	const distance = options.distance ?? 50;

	// Set initial state immediately before paint
	useLayoutEffect(() => {
		if (ref.current) {
			gsap.set(ref.current, {
				y: distance,
				opacity: 0,
				force3D: true,
				immediateRender: true,
			});
		}
	}, [ref, distance]);

	useEffect(() => {
		if (!ref.current) return;

		const animation = gsap.to(ref.current, {
			y: 0,
			opacity: 1,
			duration: options.duration ?? 1,
			ease: options.ease ?? "power3.out",
			force3D: true,
			scrollTrigger: {
				trigger: ref.current,
				start: options.start ?? "top 80%",
				toggleActions: "play none none none",
			},
		});

		return () => {
			if (animation.scrollTrigger) {
				animation.scrollTrigger.kill();
			}
			animation.kill();
		};
	}, [ref, options.duration, options.ease, distance, options.start]);

	// Return initial styles to apply in JSX for immediate hiding
	return {
		style: {
			opacity: 0,
			transform: `translate3d(0, ${distance}px, 0)`,
			willChange: "transform, opacity",
		} as React.CSSProperties,
	};
}

/**
 * Animates an element fading in from the left when scrolled into view
 * Returns initial styles to apply directly in JSX to prevent flash
 */
export function useFadeInFromLeftOnScroll(
	ref: RefObject<HTMLElement | null>,
	options: { duration?: number; ease?: string; distance?: number; start?: string } = {}
) {
	const distance = options.distance ?? 100;

	// Set initial state immediately before paint
	useLayoutEffect(() => {
		if (ref.current) {
			gsap.set(ref.current, {
				x: -distance,
				opacity: 0,
				force3D: true,
				immediateRender: true,
			});
		}
	}, [ref, distance]);

	useEffect(() => {
		if (!ref.current) return;

		const animation = gsap.to(ref.current, {
			x: 0,
			opacity: 1,
			duration: options.duration ?? 1,
			ease: options.ease ?? "power3.out",
			force3D: true,
			scrollTrigger: {
				trigger: ref.current,
				start: options.start ?? "top 80%",
				toggleActions: "play none none none",
			},
		});

		return () => {
			if (animation.scrollTrigger) {
				animation.scrollTrigger.kill();
			}
			animation.kill();
		};
	}, [ref, options.duration, options.ease, distance, options.start]);

	// Return initial styles to apply in JSX for immediate hiding
	return {
		style: {
			opacity: 0,
			transform: `translate3d(-${distance}px, 0, 0)`,
			willChange: "transform, opacity",
		} as React.CSSProperties,
	};
}
