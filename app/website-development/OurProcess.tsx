"use client";

interface ProcessStep {
	number: string;
	title: string;
	description: string;
}

const processSteps: ProcessStep[] = [
	{
		number: "01",
		title: "Kickoff Meeting",
		description:
			"Give us 15 minutes of your time over a call or meeting, and we’ll get a clear sense of what you’re aiming to achieve and who you want to reach. From there, we’ll walk you through the many ways we can help you succeed — combining thoughtful conversation or workshops to shape a solution that is natural, supportive, and genuinely aligned with your end goal.",
	},
	{
		number: "02",
		title: "Design & Development",
		description:
            "Once we've started the project, you can expect our design and development phase to progress swiftly. From conversations and workshops, we create beautiful, user-centered designs and bring them to life with clean, performant code. This is done iteratively so that you can see the build in progress as it is built in a test environment before going live. We constantly take feedback in this phase and make any changes necessary to achieve the vision you want for your site.",
        },
	{
		number: "03",
		title: "Launch & Optimization",
		description:
            "After your site is completely built and we’re getting ready to go live, we step through a final workshop and have you review the complete build. When it is looking good to go, we handle the launch of your website at a time that won’t impact your business. Once it is online we will do performative tests to make sure everything is running as expected. From there we can either teach you how to work the website and hand it off to you or we can continue to support you at an affordable discounted rate. Our number one goal is making sure you are happy with your solution and feel that you could understand the larger picture of how it works without us.",
	},
];

export default function OurProcess() {
	return (
		<section className="w-full py-10 aktiv-grotesk-regular">
			<div className="container-fluid mx-auto px-4 md:px-10">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					{processSteps.map((step, index) => (
						<div
							key={step.number}
							className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden"
						>
							<div className="mb-6 flex items-center gap-3">
								<span className="text-[20px] md:text-[24px] font-bold text-white/60 proxima-nova-semibold leading-none">
									{step.number}
								</span>
								<div className="w-[2px] h-8 bg-mcRed"></div>
                                <h3 className="text-[24px] md:text-[28px] text-white proxima-nova-semibold">
								{step.title}
							</h3>
							</div>
							<p className="text-white/80 text-sm md:text-base aktiv-grotesk-regular leading-relaxed">
								{step.description}
							</p>

							<div
								className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl pointer-events-none"
								style={{
									background: `radial-gradient(circle, rgba(198, 40, 74, 0.4) 0%, transparent 70%)`,
									transform: "translate(20%, -20%)",
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
