import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const navIcons = {
	beschwerden: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-6 h-6">
			<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
			<circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	leistungen: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-6 h-6">
			<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	spezielleTherapien: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-6 h-6">
			<rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
			<rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
			<rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
			<rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	infusions: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-6 h-6">
			<path d="M12 2v6M12 22v-8M12 14a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M8 2h8" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	ueberMich: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-6 h-6">
			<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
			<circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	blog: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-6 h-6">
			<path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	meinBuch: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-6 h-6">
			<path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	appointment: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-6 h-6">
			<rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	healthCheck: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-6 h-6">
			<path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	extras: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-6 h-6">
			<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
};

const Navbar = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const lastScrollY = React.useRef(0);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
			if (window.innerWidth >= 1024) {
				setMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsScrolled(currentScrollY > 10);

			if (currentScrollY <= 10) {
				setIsVisible(true);
			} else if (currentScrollY < lastScrollY.current) {
				setIsVisible(true);
			} else if (currentScrollY > lastScrollY.current) {
				setIsVisible(false);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) {
			let offset = element.offsetTop;
			if (sectionId === "landing-page") {
				offset = 0;
			}
			window.scrollTo({ top: offset, behavior: "smooth" });
			setMenuOpen(false);
		}
	};

	const handleNavigation = (sectionId) => {
		if (location.pathname === '/') {
			scrollToSection(sectionId);
		} else {
			window.location.href = `/#${sectionId}`;
		}
		setMenuOpen(false);
	};

	const NavItem = ({ onClick, icon, label, isLink, to }) => {
		const isActive = isLink && location.pathname === to;
		const inner = (
			<>
				<span className={`${isActive ? "text-[#43a9ab] scale-110" : "text-[#515757]/50"} group-hover:text-[#43a9ab] transition-all duration-300`}>
					{icon}
				</span>
				<span className={`${isActive ? "text-[13px] text-[#43a9ab] font-bold" : "text-[12px] text-[#515757]/60"} group-hover:text-[#43a9ab] transition-all duration-300`}>
					{label}
				</span>
			</>
		);

		if (isLink) {
			return (
				<Link
					to={to}
					className="group flex flex-col items-center gap-1 px-4 py-1 no-underline focus:outline-none"
				>
					{inner}
				</Link>
			);
		}

		return (
			<button
				onClick={onClick}
				className="group flex flex-col items-center gap-1 px-4 py-1 focus:outline-none"
			>
				{inner}
			</button>
		);
	};

	return (
		<>
			<nav
				className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
					isVisible ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<div className="w-full bg-white border-b border-[#515757]/[0.06]">
					{isMobile ? (
						<div className="flex items-center justify-between px-5 py-3">
							<span className="text-sm font-medium tracking-[0.15em] uppercase text-[#515757]">
								ViveCura
							</span>
							<button
								onClick={() => setMenuOpen(!menuOpen)}
								className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
							>
								<span className="block w-5 h-[1.5px] bg-[#515757]"></span>
								<span className="block w-5 h-[1.5px] bg-[#515757]"></span>
							</button>
						</div>
					) : (
						<div className="flex items-center justify-center py-1.5 px-4">
							<div className="flex items-center">
								<NavItem onClick={() => handleNavigation("beschwerden")} icon={navIcons.beschwerden} label={t("navbar.beschwerden")} />
								<NavItem onClick={() => handleNavigation("services")} icon={navIcons.leistungen} label={t("navbar.leistungen")} />
								<NavItem isLink to="/spezielle-therapien" icon={navIcons.spezielleTherapien} label={t("navbar.spezielleTherapien")} />
								<NavItem isLink to="/infusions" icon={navIcons.infusions} label={t("navbar.infusions")} />
								<NavItem isLink to="/health-check" icon={navIcons.healthCheck} label={t("navbar.healthCheck")} />
								<NavItem isLink to="/extras" icon={navIcons.extras} label="Extras" />
								<NavItem isLink to="/ueber-mich" icon={navIcons.ueberMich} label={t("navbar.ueberMich")} />
								<NavItem isLink to="/blog" icon={navIcons.blog} label={t("navbar.blog")} />
								<NavItem isLink to="/mein-buch" icon={navIcons.meinBuch} label={t("navbar.meinBuch")} />
								<a
									href="https://www.doctolib.de/zahnarztpraxis/berlin/die-drei-zahnaerzte/booking/specialities?profile_skipped=true&utm_source=die-drei-zahnaerzte-website-button&utm_medium=referral&utm_campaign=website-button&utm_content=option-8&bookingFunnelSource=external_referral"
									target="_blank"
									rel="noopener noreferrer"
									className="group flex flex-col items-center gap-1 px-4 py-1 no-underline focus:outline-none"
								>
									<span className="text-[#515757]/50 group-hover:text-[#515757] transition-colors duration-300">
										{navIcons.appointment}
									</span>
									<span className="text-[12px] text-[#515757]/60 group-hover:text-[#515757] transition-colors duration-300">
										{t("navbar.appointment")}
									</span>
								</a>
							</div>
						</div>
					)}
				</div>
			</nav>

			{menuOpen && (
				<div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[60]">
					<button
						onClick={() => setMenuOpen(false)}
						className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center"
					>
						<svg className="w-6 h-6 text-[#515757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<div className="flex flex-col space-y-7 text-center">
						<button
							onClick={() => handleNavigation("beschwerden")}
							className="text-2xl font-light tracking-wide text-[#515757] hover:text-[#515757]/60 transition-colors duration-300"
						>
							{t("navbar.beschwerden")}
						</button>
						<button
							onClick={() => handleNavigation("services")}
							className="text-2xl font-light tracking-wide text-[#515757] hover:text-[#515757]/60 transition-colors duration-300"
						>
							{t("navbar.leistungen")}
						</button>
						<Link
							to="/spezielle-therapien"
							className="text-2xl font-light tracking-wide text-[#515757] hover:text-[#515757]/60 transition-colors duration-300 no-underline"
							onClick={() => setMenuOpen(false)}
						>
							{t("navbar.spezielleTherapien")}
						</Link>
						<Link
							to="/infusions"
							className="text-2xl font-light tracking-wide text-[#515757] hover:text-[#515757]/60 transition-colors duration-300 no-underline"
							onClick={() => setMenuOpen(false)}
						>
							{t("navbar.infusions")}
						</Link>
						<Link
							to="/health-check"
							className="text-2xl font-light tracking-wide text-[#515757] hover:text-[#515757]/60 transition-colors duration-300 no-underline"
							onClick={() => setMenuOpen(false)}
						>
							{t("navbar.healthCheck")}
						</Link>
						<Link
							to="/extras"
							className="text-2xl font-light tracking-wide text-[#515757] hover:text-[#515757]/60 transition-colors duration-300 no-underline"
							onClick={() => setMenuOpen(false)}
						>
							Extras
						</Link>
						<Link
							to="/ueber-mich"
							className="text-2xl font-light tracking-wide text-[#515757] hover:text-[#515757]/60 transition-colors duration-300 no-underline"
							onClick={() => setMenuOpen(false)}
						>
							{t("navbar.ueberMich")}
						</Link>
						<Link
							to="/blog"
							className="text-2xl font-light tracking-wide text-[#515757] hover:text-[#515757]/60 transition-colors duration-300 no-underline"
							onClick={() => setMenuOpen(false)}
						>
							{t("navbar.blog")}
						</Link>
						<Link
							to="/mein-buch"
							className="text-2xl font-light tracking-wide text-[#515757] hover:text-[#515757]/60 transition-colors duration-300 no-underline"
							onClick={() => setMenuOpen(false)}
						>
							{t("navbar.meinBuch")}
						</Link>

						<div className="mt-10 flex flex-col items-center space-y-4">
							<a
								href="tel:03069005528"
								className="text-lg text-[#515757]/50 hover:text-[#515757] transition-colors duration-300 no-underline tracking-widest"
							>
								(030) 69005528
							</a>
							<a
								href="https://www.doctolib.de/zahnarztpraxis/berlin/die-drei-zahnaerzte/booking/specialities?bookingFunnelSource=profile"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm tracking-[0.15em] uppercase font-medium text-white bg-[#515757] px-8 py-3.5 rounded-full hover:bg-[#3a3b3f] transition-all duration-300 no-underline hover:no-underline"
							>
								{t("navbar.appointment")}
							</a>
						</div>
					</div>
				</div>
			)}

			<LanguageSwitcher />
		</>
	);
};

export default Navbar;
