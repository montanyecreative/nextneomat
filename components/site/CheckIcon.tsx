/**
 * The crimson check used in the "Built into every site" lists. Decorative: the text beside it
 * carries the meaning, so it is hidden from assistive technology.
 */
export default function CheckIcon({ className = "" }: { className?: string }) {
	return (
		<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className={`flex-none ${className}`}>
			<path
				d="M4 10.5 L8.5 15 L16 6"
				fill="none"
				stroke="#c6284a"
				strokeWidth="2.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
