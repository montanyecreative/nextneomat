import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json();

		if (!token) {
			return NextResponse.json({ success: false, error: "Token is required" }, { status: 400 });
		}

		const secretKey = process.env.RECAPTCHA_SECRET_KEY;

		if (!secretKey) {
			console.error("RECAPTCHA_SECRET_KEY is not set");
			return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 });
		}

		// Verify the token with Google
		const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

		const response = await fetch(verificationUrl, {
			method: "POST",
		});

		const data = await response.json();

		if (data.success && data.score >= 0.5) {
			// Score of 0.5 or higher is generally considered legitimate
			// You can adjust this threshold based on your needs (0.0 to 1.0)
			return NextResponse.json({ success: true, score: data.score });
		} else {
			return NextResponse.json(
				{ success: false, error: "reCAPTCHA verification failed", score: data.score },
				{ status: 403 }
			);
		}
	} catch (error) {
		console.error("reCAPTCHA verification error:", error);
		return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
	}
}

