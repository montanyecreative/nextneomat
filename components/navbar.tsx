import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { navLinks } from "@/lib/navLinks";

const logo = "/logo.webp";

export default function Navbar() {
	const [active, setActive] = useState("Home");
	const [toggle, setToggle] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const currentRoute = usePathname();
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

	/** A parent is marked active when the visitor is on any of its children. */
	const isChildActive = (nav: (typeof navLinks)[0]) => nav.children?.some((child) => currentRoute === "/" + child.link) ?? false;

	const handleNavClick = (e: React.MouseEvent, nav: (typeof navLinks)[0]) => {
		e.preventDefault();
		setIsModalOpen(true);
		setActive(nav.title);
		// Close mobile menu after a short delay to allow modal to open
		setTimeout(() => {
			setToggle(false);
		}, 100);
	};

	useEffect(() => {
		if (openSubmenu === null) return;

		const handlePointerDown = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(`[data-submenu-id="${openSubmenu}"]`)) {
				setOpenSubmenu(null);
			}
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpenSubmenu(null);
		};

		document.addEventListener("mousedown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("mousedown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [openSubmenu]);

	useEffect(() => {
		const controlNavbar = () => {
			const currentScrollY = window.scrollY;

			// Always show navbar at the top of the page
			if (currentScrollY < 10) {
				setShow(true);
			} else {
				// Hide when scrolling down, show when scrolling up
				if (currentScrollY > lastScrollY && currentScrollY > 100) {
					setShow(false);
				} else if (currentScrollY < lastScrollY) {
					setShow(true);
				}
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY]);

	// submenu-open lets the CSS lift the nav pill's `overflow: hidden` while a desktop submenu is showing,
	// otherwise the panel is clipped by the bar itself.
	const navClassName = `w-full flex flex-col lg:flex-row py-6 justify-between items-center navbar ${show && "nav-show"} ${
		toggle ? "mobile-menu-open" : ""
	} ${openSubmenu !== null ? "submenu-open" : ""}`;

	return (
		<nav className={navClassName} id="navbar">
			<div className="w-full px-4 md:px-6 lg:px-8">
				<div className="flex justify-between items-center">
					<div className="logo">
						<Link href="/" className="flex">
							<Image src={logo} alt="logo" width="40" height="25" />
							<span
								className={`text-white ml-2 text-[20px] proxima-nova-regular ${
									currentRoute === "/" ? "custom-underline" : ""
								}`}
							>
								Montanye Creative
							</span>
						</Link>
					</div>

					<ul className="list-none lg:flex hidden justify-end flex-1 items-center">
						{navLinks.map((nav) =>
							nav.children ? (
								<li
									key={nav.id}
									data-submenu-id={nav.id}
									className="relative text-white proxima-nova-regular cursor-pointer text-[14px] lg:text-[16px] mr-3 md:mr-5 lg:mr-8"
									onMouseEnter={() => setOpenSubmenu(nav.id)}
									onMouseLeave={() => setOpenSubmenu(null)}
									onFocus={() => setOpenSubmenu(nav.id)}
								>
									{/*
										A span, not a button: it carries the same classes and inline box as the sibling links,
										so it sits flush with them and the global button rules never reach it.
										It only opens; Escape, an outside click or leaving the menu closes it.
									*/}
									<span
										role="button"
										tabIndex={0}
										aria-expanded={openSubmenu === nav.id}
										aria-haspopup="true"
										onClick={() => setOpenSubmenu(nav.id)}
										onKeyDown={(event) => {
											if (event.key === "Enter" || event.key === " ") {
												event.preventDefault();
												setOpenSubmenu(nav.id);
											}
										}}
										className={`hover:custom-hover ${isChildActive(nav) ? "custom-underline" : ""}`}
									>
										{nav.title}
									</span>
									{/*
										The wrapper's transparent padding clears the nav pill and bridges the gap,
										so the pointer never crosses dead space on its way to the links.
									*/}
									<div
										className={`absolute -left-[17px] top-full z-20 pt-7 transition-opacity duration-200 ${
											openSubmenu === nav.id ? "opacity-100" : "pointer-events-none opacity-0"
										}`}
									>
										<ul className="nav-submenu min-w-[220px] list-none py-2">
											{/* Padding sits on the row so the link keeps the same inline box as the nav links above */}
											{nav.children.map((child) => (
												<li
													key={child.id}
													className="px-4 py-2 text-white proxima-nova-regular text-[14px] lg:text-[16px]"
												>
													<a
														href={`/${child.link}`}
														onClick={() => {
															setActive(child.title);
															setOpenSubmenu(null);
														}}
														className={`hover:custom-hover ${
															currentRoute === "/" + child.link ? "custom-underline" : ""
														}`}
													>
														{child.title}
													</a>
												</li>
											))}
										</ul>
									</div>
								</li>
							) : (
								<li
									key={nav.id}
									className="text-white proxima-nova-regular cursor-pointer text-[14px] lg:text-[16px] mr-3 md:mr-5 lg:mr-8"
									onClick={() => setActive(nav.title)}
								>
									<a
										className={`hover:custom-hover ${currentRoute === "/" + nav.link ? "custom-underline" : ""}`}
										href={`/${nav.link}`}
									>
										{nav.title}
									</a>
								</li>
							),
						)}
					</ul>
					<button
						className="lg:hidden w-[28px] h-[28px] flex items-center justify-center"
						onClick={() => setToggle(!toggle)}
						aria-label="Toggle menu"
					>
						<div className={`hamburger-icon ${toggle ? "rotate" : ""}`}>
							{toggle ? <Cross1Icon className="w-8 h-8 text-white" /> : <HamburgerMenuIcon className="w-8 h-8 text-white" />}
						</div>
					</button>
				</div>

				<ul className={`list-none lg:hidden flex flex-col items-start flex-1 mobile-menu-items ${toggle ? "show" : ""}`}>
					{navLinks.map((nav, index) => (
						<li
							key={nav.id}
							className={`mobile-menu-item font-medium text-[18px] ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
						>
							{nav.children ? (
								<>
									{/* Heading only: the parent has no page of its own */}
									<span className="block text-white/60">{nav.title}</span>
									<ul className="list-none mt-2 ml-4">
										{nav.children.map((child, childIndex) => (
											<li
												key={child.id}
												className={`cursor-pointer ${childIndex === nav.children!.length - 1 ? "mb-0" : "mb-3"}`}
												onClick={() => {
													setActive(child.title);
													setToggle(false);
												}}
											>
												<a
													href={`/${child.link}`}
													className={currentRoute === "/" + child.link ? "custom-underline" : ""}
												>
													{child.title}
												</a>
											</li>
										))}
									</ul>
								</>
							) : (
								<a
									href={`/${nav.link}`}
									className={`cursor-pointer ${currentRoute === "/" + nav.link ? "custom-underline" : ""}`}
									onClick={() => {
										setActive(nav.title);
										setToggle(false);
									}}
								>
									{nav.title}
								</a>
							)}
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
