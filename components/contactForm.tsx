"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
	date: z.string().max(100, {
		message: "Incorrect date.",
	}),
	name: z.string().min(2, {
		message: "Name must be at least 1 character.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	phone: z.string().min(10, {
		message: "Please enter a valid phone number.",
	}),
	message: z.string().min(1, {
		message: "Message must be at least 1 character.",
	}),
});

export default function ContactForm() {
	// Always call the hook (must be called unconditionally per React rules)
	// It will be undefined if provider isn't set up, which we handle in onSubmit
	const recaptcha = useGoogleReCaptcha();
	const executeRecaptcha = recaptcha?.executeRecaptcha;
	const recaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
	const [isSubmitting, setIsSubmitting] = useState(false);

	const date = new Date().toDateString();
	var hours = new Date().getHours();
	var minutes = new Date().getMinutes();
	var timeDay = hours >= 12 ? "pm" : "am";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? 0 + minutes : minutes;
	const seconds = new Date().getSeconds();
	const time = hours + ":" + minutes + ":" + seconds + timeDay;
	const currentDate = date + " " + time;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date: currentDate,
			name: "",
			email: "",
			phone: "",
			message: "",
		},
	});

	const FORM_URL = process.env.NEXT_PUBLIC_USEBASIN_FORM_URL || "";

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (isSubmitting) return;

		if (!FORM_URL) {
			console.error("USEBASIN_FORM_URL is not set. Please add NEXT_PUBLIC_USEBASIN_FORM_URL to your environment variables.");
			alert("Form configuration error. Please contact support.");
			return;
		}

		setIsSubmitting(true);

		try {
			// Only verify reCAPTCHA if it's enabled and available
			if (recaptchaEnabled && executeRecaptcha) {
				// Execute reCAPTCHA
				const token = await executeRecaptcha("contact_form");

				// Verify the token with our API
				const verifyResponse = await fetch("/api/verify-recaptcha", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token }),
				});

				const verifyData = await verifyResponse.json();

				if (!verifyData.success) {
					alert("reCAPTCHA verification failed. Please try again.");
					setIsSubmitting(false);
					return;
				}
			}

			// Submit the form (with or without reCAPTCHA verification)
			const submitResponse = await fetch(FORM_URL, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					accept: "application/json",
				},
				body: JSON.stringify(values),
			});

			if (submitResponse.status === 200) {
				form.reset();
				alert("Thank you for your submission! We'll be in contact soon!");
			} else {
				alert("There was an error submitting your form. Please try again.");
			}
		} catch (error) {
			console.error("Form submission error:", error);
			alert("There was an error submitting your form. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				method="POST"
				action={FORM_URL}
				className="space-y-8 aktiv-grotesk-regular glass-form-deep-blue p-8 rounded-2xl relative"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Name"
									{...field}
									className="text-[16px] !shadow-none !bg-black/40 !border-white/10 hover:!bg-black/50 focus:!bg-black/50 focus:!border-white/20"
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Email"
									{...field}
									className="text-[16px] !shadow-none !bg-black/40 !border-white/10 hover:!bg-black/50 focus:!bg-black/50 focus:!border-white/20"
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Phone"
									{...field}
									className="text-[16px] !shadow-none !bg-black/40 !border-white/10 hover:!bg-black/50 focus:!bg-black/50 focus:!border-white/20"
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="What can we help you with?"
									{...field}
									className="text-[16px] min-h-[120px] !shadow-none !bg-black/40 !border-white/10 hover:!bg-black/50 focus:!bg-black/50 focus:!border-white/20"
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					variant="outline"
					disabled={isSubmitting}
					className="rounded-full px-10 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSubmitting ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
