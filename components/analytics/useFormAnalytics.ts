"use client";

import { useCallback, useRef } from "react";
import { trackFormError, trackFormStart, trackFormSubmit, trackFormSuccess, type FormContext } from "@/lib/gtag";

/**
 * Form interaction tracking.
 *
 * GA4 Enhanced Measurement only sees forms that submit natively. The forms on
 * this site submit through fetch, so form_start/form_submit are raised here
 * instead.
 *
 * Wire it up with:
 *   <form onSubmit={...} onFocus={onFirstInteraction} onChange={onFirstInteraction}>
 */
export function useFormAnalytics(form: FormContext) {
	// form_start is a once-per-mount event: the first sign of engagement.
	const started = useRef(false);

	const onFirstInteraction = useCallback(() => {
		if (started.current) return;
		started.current = true;
		trackFormStart(form);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.id, form.name, form.destination, form.submitText]);

	const onSubmit = useCallback(() => {
		trackFormSubmit(form);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.id, form.name, form.destination, form.submitText]);

	const onSuccess = useCallback(() => {
		trackFormSuccess(form);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.id, form.name, form.destination, form.submitText]);

	const onError = useCallback(
		(reason: string, fields?: string[]) => {
			trackFormError(form, reason, fields);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[form.id, form.name, form.destination, form.submitText]
	);

	return { onFirstInteraction, onSubmit, onSuccess, onError };
}
