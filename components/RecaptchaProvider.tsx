"use client";

import { GoogleRecaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode } from "react";

interface RecaptchaProviderProps {
	children: ReactNode;
}

export default function RecaptchaProvider({ children }: RecaptchaProviderProps) {
	const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

	if (!recaptchaSiteKey) {
		console.warn("reCAPTCHA site key is not set. Please add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables.");
		return <>{children}</>;
	}

	return (
		<GoogleRecaptchaProvider
			reCaptchaKey={recaptchaSiteKey}
			scriptProps={{
				async: false,
				defer: false,
				appendTo: "head",
				nonce: undefined,
			}}
		>
			{children}
		</GoogleRecaptchaProvider>
	);
}

