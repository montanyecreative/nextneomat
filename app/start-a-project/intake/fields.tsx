"use client";

import {
	FIELD_LABEL,
	INPUT,
	LEGEND,
	NATIVE_CONTROL,
	NOTE_TEXT,
	OPTIONAL_MARK,
	chipPadding,
	optionCardClass,
	optionCardPadding,
} from "@/components/site/tokens";
import type { Option } from "./data";

/** An inline error, in text rather than colour alone, tied to its field by id. */
export function FieldError({ id, message }: { id: string; message?: string }) {
	if (!message) return null;
	return (
		<p id={id} className="m-0 text-[15px] leading-[1.5] text-[#ff8da1] aktiv-grotesk-semibold">
			{message}
		</p>
	);
}

export function OptionalMark() {
	return <span className={OPTIONAL_MARK}> (optional)</span>;
}

/** A labelled text input. The label is always visible: placeholders are never used as labels. */
export function TextField({
	id,
	label,
	type = "text",
	autoComplete,
	value,
	onChange,
	error,
	help,
	optional = false,
	inputRef,
	rows,
}: {
	id: string;
	label: string;
	type?: string;
	autoComplete?: string;
	value: string;
	onChange: (value: string) => void;
	error?: string;
	help?: string;
	optional?: boolean;
	inputRef?: React.Ref<HTMLInputElement & HTMLTextAreaElement>;
	rows?: number;
}) {
	const errorId = `${id}-error`;
	const helpId = `${id}-help`;
	const describedBy = [help ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
	const shared = {
		id,
		value,
		"aria-invalid": error ? (true as const) : undefined,
		"aria-describedby": describedBy,
		className: `${INPUT} ${error ? "border-[#ff8da1]" : ""}`,
	};

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className={FIELD_LABEL}>
				{label}
				{optional ? <OptionalMark /> : null}
			</label>
			{help ? (
				<p id={helpId} className={`m-0 ${NOTE_TEXT}`}>
					{help}
				</p>
			) : null}
			{rows ? (
				<textarea
					{...shared}
					ref={inputRef}
					rows={rows}
					onChange={(event) => onChange(event.target.value)}
					className={`${shared.className} min-h-[160px] resize-y`}
				/>
			) : (
				<input
					{...shared}
					ref={inputRef}
					type={type}
					autoComplete={autoComplete}
					onChange={(event) => onChange(event.target.value)}
				/>
			)}
			<FieldError id={errorId} message={error} />
		</div>
	);
}

/** Wraps a group of options as a fieldset with a legend, plus optional help and error text. */
function Group({
	name,
	legend,
	help,
	error,
	children,
}: {
	name: string;
	legend: string;
	help?: string;
	error?: string;
	children: React.ReactNode;
}) {
	const helpId = `${name}-help`;
	const errorId = `${name}-error`;
	const describedBy = [help ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

	return (
		<fieldset className="m-0 p-0 border-0 min-w-0" aria-describedby={describedBy}>
			<legend className={LEGEND}>{legend}</legend>
			{help ? (
				<p id={helpId} className={`mt-1 mb-0 ${NOTE_TEXT}`}>
					{help}
				</p>
			) : null}
			<div className="mt-3 flex flex-wrap gap-3">{children}</div>
			<div className="mt-2">
				<FieldError id={errorId} message={error} />
			</div>
		</fieldset>
	);
}

/** Stacked cards with a title and a line of help underneath. */
export function RadioCardGroup({
	name,
	legend,
	options,
	value,
	onChange,
	error,
	help,
	firstInputRef,
}: {
	name: string;
	legend: string;
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	error?: string;
	help?: string;
	firstInputRef?: React.Ref<HTMLInputElement>;
}) {
	return (
		<Group name={name} legend={legend} help={help} error={error}>
			{options.map((option, index) => {
				const selected = value === option.value;
				return (
					<label
						key={option.value}
						className={optionCardClass(
							selected,
							`flex-[1_1_220px] items-start gap-3 min-h-[56px] ${optionCardPadding(selected)}`,
						)}
					>
						<input
							ref={index === 0 ? firstInputRef : undefined}
							type="radio"
							name={name}
							value={option.value}
							checked={selected}
							onChange={() => onChange(option.value)}
							className={`${NATIVE_CONTROL} mt-1`}
						/>
						<span>
							<span className="block text-[17px] aktiv-grotesk-semibold text-white">{option.label}</span>
							{option.help ? <span className={`block ${NOTE_TEXT}`}>{option.help}</span> : null}
						</span>
					</label>
				);
			})}
		</Group>
	);
}

/** One line cards, used where the options are short enough not to need help text. */
export function RadioRowGroup({
	name,
	legend,
	options,
	value,
	onChange,
	error,
	firstInputRef,
}: {
	name: string;
	legend: string;
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	error?: string;
	firstInputRef?: React.Ref<HTMLInputElement>;
}) {
	return (
		<Group name={name} legend={legend} error={error}>
			{options.map((option, index) => {
				const selected = value === option.value;
				return (
					<label
						key={option.value}
						className={optionCardClass(
							selected,
							`flex-[1_1_220px] items-center gap-3 min-h-[56px] ${optionCardPadding(selected)}`,
						)}
					>
						<input
							ref={index === 0 ? firstInputRef : undefined}
							type="radio"
							name={name}
							value={option.value}
							checked={selected}
							onChange={() => onChange(option.value)}
							className={NATIVE_CONTROL}
						/>
						<span className="text-[17px] text-white aktiv-grotesk-regular">{option.label}</span>
					</label>
				);
			})}
		</Group>
	);
}

/** Chips that size to their own label, for the longer lists of short answers. */
export function RadioChipGroup({
	name,
	legend,
	options,
	value,
	onChange,
	error,
	firstInputRef,
}: {
	name: string;
	legend: string;
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	error?: string;
	firstInputRef?: React.Ref<HTMLInputElement>;
}) {
	return (
		<Group name={name} legend={legend} error={error}>
			{options.map((option, index) => {
				const selected = value === option.value;
				return (
					<label
						key={option.value}
						className={optionCardClass(
							selected,
							`flex-[0_1_auto] items-center gap-2.5 min-h-[48px] text-[16px] ${chipPadding(selected)}`,
						)}
					>
						<input
							ref={index === 0 ? firstInputRef : undefined}
							type="radio"
							name={name}
							value={option.value}
							checked={selected}
							onChange={() => onChange(option.value)}
							className={NATIVE_CONTROL}
						/>
						<span className="text-white aktiv-grotesk-regular">{option.label}</span>
					</label>
				);
			})}
		</Group>
	);
}

/** Checkbox cards. Choosing more than one is the point, so these never clear each other. */
export function CheckboxCardGroup({
	name,
	legend,
	help,
	options,
	values,
	onToggle,
}: {
	name: string;
	legend: string;
	help?: string;
	options: Option[];
	values: string[];
	onToggle: (value: string) => void;
}) {
	return (
		<Group name={name} legend={legend} help={help}>
			{options.map((option) => {
				const selected = values.includes(option.value);
				return (
					<label
						key={option.value}
						className={optionCardClass(
							selected,
							`flex-[1_1_220px] items-center gap-3 min-h-[56px] ${optionCardPadding(selected)}`,
						)}
					>
						<input
							type="checkbox"
							name={name}
							value={option.value}
							checked={selected}
							onChange={() => onToggle(option.value)}
							className={NATIVE_CONTROL}
						/>
						<span className="text-[17px] text-white aktiv-grotesk-regular">{option.label}</span>
					</label>
				);
			})}
		</Group>
	);
}
