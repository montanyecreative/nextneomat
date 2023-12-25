"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";

const formSchema = z.object({
	choices: z.string().min(1, {
		message: "Please enter at least one choice.",
	}),
});

export default function DecisionMaker() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			choices: "",
		},
	});

	useEffect(() => {
		const choicesInput = document.getElementById("choices");
		choicesInput!.focus();
		document.getElementById("resolution")!.innerHTML = "";
	}, []);

	function chooseOption(event: { preventDefault: () => void }) {
		var makeDecisionButton = document.getElementById("makeDecisionButton");
		const choicesInput = document.getElementById("choices");
		var choicesInputValue = (document.getElementById("choices") as HTMLInputElement)!.value;
		var choicesArray = choicesInputValue.split(/[\n,]/);
		const randomChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];

		document.getElementById("resolution")!.innerHTML = randomChoice;
		makeDecisionButton!.innerHTML = "On second thought, choose again";
		event.preventDefault();
	}

	function clearResults(event: { preventDefault: () => void }) {
		const choicesInput = document.getElementById("choices") as HTMLInputElement;
		var makeDecisionButton = document.getElementById("makeDecisionButton");

		makeDecisionButton!.innerHTML = "Make decision";
		choicesInput!.value = "";
		document.getElementById("resolution")!.innerHTML = "";
		choicesInput!.focus();
		event.preventDefault();
	}

	return (
		<main>
			<Navbar />
			<div className="bg-black">
				<div className="page-banner-filler bg-black"></div>
				<div className="container mx-auto pt-5 pb-20 text-white">
					<div className="tools-container">
						<h1 className="text-[32px] mt-5 text-center">
							Decision Maker - <br className="flex md:hidden" />
							The Choosinator
						</h1>
						<p className="my-2 mx-auto sm:mx-5 md:mx-unset text-center">
							A random picker to help you pick an option from many when you are feeling indecisive.
						</p>
						<p className="my-2 mx-auto sm:mx-5 md:mx-unset text-center">
							Enter your choices below, separating them by a &quot;,&quot; (comma) or new line (enter) and click the button to
							make a decision.
						</p>
						<p className="my-2 mx-auto sm:mx-5 md:mx-unset text-center italic">
							If you accidentally add an extra new line (enter), it will get added to the result possibility, making it look
							like the tool is returning an incorrect result.
						</p>
						<div className="my-10">
							<Form {...form}>
								<form className="space-y-8">
									<FormField
										control={form.control}
										name="choices"
										render={({ field }) => (
											<FormItem className="avatar-shadow">
												<FormControl>
													<Textarea
														placeholder=""
														{...field}
														id="choices"
														className="choices-field text-[16px]"
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
										className="rounded-full px-10 mx-auto md:mx-3 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
										id="makeDecisionButton"
										onClick={chooseOption}
									>
										Make decision
									</Button>
									<Button
										type="submit"
										variant="outline"
										className="rounded-full px-10 mx-auto md:mx-3 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]"
										onClick={clearResults}
									>
										Clear results
									</Button>
								</form>
							</Form>
						</div>
						<div className="mt-10 mb-5">
							<p className="text-[16px] font-bold text-center md:text-left">
								<span id="resolutionLabel">Result: </span>
								<span id="resolution"></span>
							</p>
						</div>
						<p className="mt-20 mx-auto sm:mx-5 md:mx-unset text-center italic opacity-50">
							*You are responsible for your own decisions. Montanye Creative LLC will not be responsible for any errors or
							omissions in articles or postings, for hyperlinks embedded in messages, or for any results obtained from the use
							of such information. Montanye Creative LLC will not be liable for any loss or damage caused by a reader&apos;s
							reliance on information obtained in our assets. If you don&apos;t accept this responsibility for yourself, then
							you should not use Montanye Creative LLC.
						</p>
					</div>
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
