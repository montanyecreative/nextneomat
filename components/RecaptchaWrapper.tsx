"use client";

import { ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface RecaptchaWrapperProps {
	children: ReactNode;
	siteKey: string;
}

export default function RecaptchaWrapper({ children, siteKey }: RecaptchaWrapperProps) {
	// Always provide the provider context to prevent hook errors
	// Use a test key if no key is provided (Google's test key for development)
	const key = siteKey || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={key}
			scriptProps={{
				async: false,
				defer: false,
				appendTo: "head",
				nonce: undefined,
			}}
		>
			{children}
		</GoogleReCaptchaProvider>
	);
}
