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
		];
	},
};

module.exports = nextConfig;
