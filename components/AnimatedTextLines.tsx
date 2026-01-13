"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedTextLinesProps {
	children: string;
	className?: string;
}

export default function AnimatedTextLines({ children, className = "" }: AnimatedTextLinesProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [wrappedLines, setWrappedLines] = useState<JSX.Element[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		// Small delay to ensure container is properly sized
		const timeoutId = setTimeout(() => {
			if (!containerRef.current) return;

			const container = containerRef.current;
			const words = children.split(" ");

			// Create a temporary span to measure text width
			const temp = document.createElement("span");
			const containerStyles = window.getComputedStyle(container);
			temp.style.position = "absolute";
			temp.style.visibility = "hidden";
			temp.style.whiteSpace = "nowrap";
			temp.style.fontSize = containerStyles.fontSize;
			temp.style.fontFamily = containerStyles.fontFamily;
			temp.style.fontWeight = containerStyles.fontWeight;
			temp.style.letterSpacing = containerStyles.letterSpacing;
			document.body.appendChild(temp);

			const containerWidth = container.offsetWidth;
			const lines: string[] = [];
			let currentLine = "";

			words.forEach((word, index) => {
				const testLine = currentLine ? `${currentLine} ${word}` : word;
				temp.textContent = testLine;
				const testWidth = temp.offsetWidth;

				if (testWidth > containerWidth && currentLine) {
					// This word would cause a line break
					lines.push(currentLine);
					currentLine = word;
				} else {
					currentLine = testLine;
				}

				if (index === words.length - 1 && currentLine) {
					lines.push(currentLine);
				}
			});

			document.body.removeChild(temp);

			// Wrap each line, even if there's only one
			const wrapped = lines.map((line, index) => (
				<span key={index} className="animated-underline-line inline-block">
					{line}
					{index < lines.length - 1 && " "}
				</span>
			));

			setWrappedLines(wrapped);
		}, 0);

		return () => clearTimeout(timeoutId);
	}, [children]);

	// Recalculate on window resize
	useEffect(() => {
		const handleResize = () => {
			setWrappedLines([]);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [children]);

	return (
		<div ref={containerRef} className={className}>
			{wrappedLines.length > 0 ? wrappedLines : children}
		</div>
	);
}
