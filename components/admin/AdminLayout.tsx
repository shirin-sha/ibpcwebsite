'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import LogoutButton from "./LogoutButton"

type AdminLayoutProps = {
	children: React.ReactNode
	active?: "news" | "news-list" | "events" | "events-list" | "hero-sliders" | "hero-sliders-list" | "gallery"
}

export default function AdminLayout({ children, active = "news" }: AdminLayoutProps) {
	const pathname = usePathname()
	const router = useRouter()
	const [clickedLink, setClickedLink] = useState<string | null>(null)
	const [isNavigating, setIsNavigating] = useState(false)

	// Determine active link based on pathname
	const getActiveLink = () => {
		if (pathname?.includes('/hero-sliders')) return 'hero-sliders-list'
		if (pathname?.includes('/news')) return 'news-list'
		if (pathname?.includes('/events')) return 'events-list'
		return active
	}

	const currentActive = getActiveLink()

	const handleLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		setClickedLink(href)
		setIsNavigating(true)
		
		// Navigate immediately
		router.push(href)
		
		// Reset clicked state after navigation completes
		setTimeout(() => {
			setClickedLink(null)
			setIsNavigating(false)
		}, 300)
	}

	const navLinks = [
		{ href: "/admin/hero-sliders/list", label: "Hero Sliders", key: "hero-sliders-list" },
		{ href: "/admin/news/list", label: "News", key: "news-list" },
		{ href: "/admin/events/list", label: "Events", key: "events-list" }
	]
	return (
		<div style={{ minHeight: "100vh", backgroundColor: "#f5f6fa" }}>
			<header
				style={{
					position: "sticky",
					top: 0,
					zIndex: 50,
					backgroundColor: "#ffffff",
					borderBottom: "1px solid #e4e6f0",
					padding: "14px 0",
					boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)"
				}}
			>
				<div className="container">
					<div className="d-flex align-items-center justify-content-between">
						<div className="d-flex align-items-center" style={{ gap: "12px" }}>
							<div
								style={{
									width: "40px",
									height: "40px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<img 
									src="/assets/img/logo/logo.png" 
									alt="IBPC Logo" 
									style={{ 
										width: "100%", 
										height: "100%", 
										objectFit: "contain" 
									}} 
								/>
							</div>
							<div>
								<div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>IBPC Admin</div>
								<div style={{ fontSize: "12px", color: "#6b7280" }}>Content Management</div>
							</div>
						</div>
						<div>
							<LogoutButton />
						</div>
					</div>
				</div>
			</header>

			<main style={{ padding: "30px 0 40px" }}>
				<div className="container">
					<div
						className="admin-shell"
						style={{
							display: "flex",
							gap: "28px",
							alignItems: "flex-start"
						}}
					>
						<aside
							style={{
								width: "260px",
								backgroundColor: "#ffffff",
								borderRadius: "16px",
								boxShadow: "0 18px 45px rgba(15, 23, 42, 0.04)",
								padding: "20px 16px",
								position: "sticky",
								top: "90px",
								alignSelf: "flex-start",
								minHeight: "calc(100vh - 150px)"
							}}
						>
							<h6 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "10px" }}>
								Sections
							</h6>
							<ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
								{navLinks.map((link) => {
									const isActive = currentActive === link.key
									const isClicked = clickedLink === link.href
									const shouldHighlight = isActive || isClicked
									
									return (
										<li key={link.key}>
											<Link
												href={link.href}
												prefetch={true}
												onClick={(e) => handleLinkClick(link.href, e)}
												style={{
													display: "block",
													padding: "8px 10px",
													borderRadius: "8px",
													fontSize: "14px",
													fontWeight: shouldHighlight ? 600 : 500,
													color: shouldHighlight ? "var(--tg-theme-primary)" : "#4b5563",
													backgroundColor: shouldHighlight ? "rgba(62, 128, 255, 0.12)" : "transparent",
													textDecoration: "none",
													transition: "all 0.15s ease",
													cursor: "pointer",
													transform: isClicked ? "scale(0.98)" : "scale(1)",
													position: "relative"
												}}
												onMouseEnter={(e) => {
													if (!shouldHighlight) {
														e.currentTarget.style.backgroundColor = "rgba(62, 128, 255, 0.05)"
													}
												}}
												onMouseLeave={(e) => {
													if (!shouldHighlight) {
														e.currentTarget.style.backgroundColor = "transparent"
													}
												}}
											>
												{isClicked && (
													<span
														style={{
															position: "absolute",
															left: 0,
															top: 0,
															bottom: 0,
															width: "3px",
															backgroundColor: "var(--tg-theme-primary)",
															borderRadius: "0 4px 4px 0"
														}}
													/>
												)}
												{link.label}
											</Link>
										</li>
									)
								})}
							</ul>
						</aside>
						<div style={{ flex: 1, minWidth: 0, position: "relative" }}>
							{isNavigating && (
								<div
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										right: 0,
										height: "3px",
										backgroundColor: "var(--tg-theme-primary)",
										zIndex: 100,
										animation: "slide-right 0.3s ease-out",
										transformOrigin: "left"
									}}
								/>
							)}
							<div
								style={{
									opacity: isNavigating ? 0.6 : 1,
									transition: "opacity 0.2s ease"
								}}
							>
								{children}
							</div>
						</div>
					</div>
				</div>
			</main>

			<style
				dangerouslySetInnerHTML={{
					__html: `
						@keyframes slide-right {
							from {
								transform: scaleX(0);
							}
							to {
								transform: scaleX(1);
							}
						}
						@media (max-width: 991px) {
							.admin-shell {
								flex-direction: column;
							}
							.admin-shell aside {
								width: 100%;
								position: relative;
								top: 0;
								min-height: auto;
							}
						}
					`
				}}
			/>
		</div>
	)
}


