// Flat config, which is the only format ESLint 9 reads. It replaces
// .eslintrc.json, and `npm run lint` now calls eslint directly: `next lint`
// was removed in Next 16, so the old script pointed at nothing.
//
// eslint-config-next ships its own flat config and already ignores .next, out,
// build and next-env.d.ts. The rule set is deliberately the same one the
// .eslintrc used — core-web-vitals and nothing more. Adding
// eslint-config-next/typescript on top would turn on the whole
// typescript-eslint recommended set, which is a separate decision from getting
// the command working again.
import next from "eslint-config-next/core-web-vitals";

const config = [
	{
		ignores: [
			// Built Storybook, which is committed output rather than source.
			"public/storybook/**",
			"storybook-static/**",
		],
	},
	...next,
];

export default config;
