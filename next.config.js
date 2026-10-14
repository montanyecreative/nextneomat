/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			// The prints page used to live at /photography; keep old links and search results working
			{
				source: "/photography",
				destination: "/prints",
				permanent: true,
			},
			// The contact form moved to /start-a-project
			{
				source: "/contact",
				destination: "/start-a-project",
				permanent: true,
			},
			/*
				The case studies moved out from under the Website Development page to /portfolio. The
				pattern is pinned to the -case-study suffix every one of their slugs carries, so this
				only catches those URLs and any future /website-development child route is unaffected.
			*/
			{
				source: "/website-development/:caseStudyName([a-z0-9-]+-case-study)",
				destination: "/portfolio/:caseStudyName",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
