"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";

const formSchema = z.object({
	salary: z.string().min(1, {
		message: "Please enter at least one choice.",
	}),
});

export default function HouseSalaryCalculator() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			salary: "",
		},
	});

	useEffect(() => {
		const salaryInput = document.getElementById("salary");
		salaryInput!.focus();
	}, []);

	function calculateHousingSalaryCap(event: { preventDefault: () => void }) {
		const salary: any = (document.querySelector("#salary") as HTMLInputElement)!.value;
		const salaryInput = document.getElementById("salary");
		const showCap = document.getElementById("showCap");
		const showMaxCost = document.getElementById("showMaxCost");
		var mortgageLimit = 0;
		var mortgageFactor = 0.3;
		var calculatedSalary = 0;
		var taxFactor = 0.3;
		var taxDifference = 0;
		var monthlyIncome = 0;
		var months = 12;
		var maxCost = 0;
		var maxCostMultiplier = 3;
		var defaultValues = "0.00";

		if (!salary) {
			alert("Please enter your salary.");
			salaryInput!.focus();
			event.preventDefault();
		} else {
			calculatedSalary = salary * taxFactor;
			taxDifference = salary - calculatedSalary;
			monthlyIncome = taxDifference / months;
			mortgageLimit = monthlyIncome * mortgageFactor;
			maxCost = salary * maxCostMultiplier;

			if (isNaN(mortgageLimit)) {
				alert("Please only enter numbers.");
				showCap!.innerHTML = defaultValues;
				showMaxCost!.innerHTML = defaultValues;
				event.preventDefault();
			} else {
				showCap!.innerHTML = mortgageLimit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				showMaxCost!.innerHTML = maxCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				event.preventDefault();
			}
		}
	}

	function clearResults(event: { preventDefault: () => void }) {
		const salaryInput = document.getElementById("salary") as HTMLInputElement;
		const showCap = document.getElementById("showCap");
		const showMaxCost = document.getElementById("showMaxCost");
		var defaultValues = "0.00";

		showCap!.innerHTML = defaultValues;
		showMaxCost!.innerHTML = defaultValues;
		salaryInput!.value = "";
		salaryInput!.focus();
		event.preventDefault();
	}

	return (
		<main>
			<Navbar />
			<div className="bg-black">
				<div className="page-banner-filler bg-black"></div>
				<div className="container mx-auto pt-5 pb-20 text-white">
					<div className="tools-container mx-auto md:mx-30">
						<h1 className="text-[32px] mt-5 text-center">House Salary Calculator</h1>
						<p className="my-2 mx-auto sm:mx-5 md:mx-unset text-center">
							The point of this calculator is to make sure you are looking at a safe maximum to pay monthly for a mortgage
							using the salary you are at or planning to have.
						</p>
						<p className="my-2 mx-auto sm:mx-5 md:mx-unset text-center">The calculator also works the same for rent.</p>
						<p className="my-2 mx-auto sm:mx-5 md:mx-unset text-center">
							The calculator is taking taxes at a rate of roughly 1/3 your salary and factoring that into the results.
						</p>
						<div className="my-10">
							<Form {...form}>
								<form className="space-y-8">
									<FormField
										control={form.control}
										name="salary"
										render={({ field }) => (
											<FormItem className="avatar-shadow">
												<FormControl>
													<Input
														placeholder="Enter salary"
														{...field}
														type="number"
														id="salary"
														className="text-[16px]"
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
										onClick={calculateHousingSalaryCap}
									>
										Calculate
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
								<span id="money">Max house cost: $</span>
								<span id="showMaxCost">0.00</span>
							</p>
							<p className="text-[16px] font-bold text-center md:text-left">
								<span id="money">Monthly payment max after tax calculations: $</span>
								<span id="showCap">0.00</span>
							</p>
						</div>
						<p className="mt-20 mx-auto sm:mx-5 md:mx-unset text-center italic opacity-50">
							*You are responsible for your own investment decisions. Montanye Creative LLC will not be responsible for any
							errors or omissions in articles or postings, for hyperlinks embedded in messages, or for any results obtained
							from the use of such information. Montanye Creative LLC will not be liable for any loss or damage caused by a
							reader&apos;s reliance on information obtained in our assets. If you don&apos;t accept this responsibility for
							yourself, then you should not use Montanye Creative LLC.
						</p>
					</div>
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
