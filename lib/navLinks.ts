export type NavLink = {
	id: number;
	title: string;
	/** Parent items that only open a submenu have no link of their own. */
	link?: string;
	children?: NavLink[];
};

export const navLinks: NavLink[] = [
	{
		id: 1,
		title: "Website Development",
		link: "website-development",
	},
	{
		id: 2,
		title: "Photography",
		children: [
			{
				id: 21,
				title: "Prints",
				link: "prints",
			},
			{
				id: 22,
				title: "Photo/VHS Digitization",
				link: "photo-vhs-digitization",
			},
		],
	},
	{
		id: 4,
		title: "Resume",
		link: "resume",
	},
	{
		id: 5,
		title: "Contact",
		link: "contact",
	},
];

/** Every item that actually navigates, submenu children included. */
export const flatNavLinks: NavLink[] = navLinks.flatMap((nav) => (nav.children ? nav.children : nav.link ? [nav] : []));
