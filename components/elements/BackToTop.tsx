'use client'
import { useEffect, useState } from "react"

export default function BackToTop({ target }: any) {
	const [hasScrolled, setHasScrolled] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			setHasScrolled(window.scrollY > 100)
		}

		window.addEventListener("scroll", onScroll)
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const handleClick = () => {
		const el = document.querySelector(target)
		if (!el) return
		window.scrollTo({
			top: (el as HTMLElement).offsetTop,
			behavior: 'smooth'
		})
	}

	return (
		<>
			{hasScrolled && (
				<button type="button" className="scroll__top scroll-to-target" onClick={handleClick} aria-label="Scroll to top">
					<i className="fas fa-arrow-up" />
				</button>
			)}
		</>
	)
}
