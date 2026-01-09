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

	return (
		<nav
			className={`w-full flex flex-col lg:flex-row py-6 justify-between items-center navbar ${show && "nav-show"} ${
				toggle ? "mobile-menu-open" : ""
			}`}
			id="navbar"
		>
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
						{navLinks.map((nav, index) => (
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
						))}
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
							className={`mobile-menu-item font-medium cursor-pointer text-[18px] ${
								index === navLinks.length - 1 ? "mb-0" : "mb-4"
							}`}
							onClick={() => {
								setActive(nav.title);
								setToggle(false);
							}}
						>
							<a href={`/${nav.link}`} className={currentRoute === "/" + nav.link ? "custom-underline" : ""}>
								{nav.title}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
