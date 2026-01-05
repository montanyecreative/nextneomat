"use client";

import { ReactNode } from "react";
import RecaptchaWrapper from "./RecaptchaWrapper";

interface RecaptchaProviderProps {
	children: ReactNode;
}

export default function RecaptchaProvider({ children }: RecaptchaProviderProps) {
	const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

	if (!recaptchaSiteKey) {
		console.warn("reCAPTCHA site key is not set. Please add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables.");
	}

	return <RecaptchaWrapper siteKey={recaptchaSiteKey}>{children}</RecaptchaWrapper>;
}

