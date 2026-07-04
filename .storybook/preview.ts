import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: "dark",
			values: [
				{ name: "dark", value: "#151515" },
				{ name: "navy", value: "#002b49" },
				{ name: "light", value: "#f2f2f2" },
			],
		},
		layout: "padded",
	},
	options: {
		storySort: {
			order: ["Brand", ["Button", "Cards", "Colors", "Forms", "Links", "Typography"]],
		},
	},
};

export default preview;
