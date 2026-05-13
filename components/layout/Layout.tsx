
'use client'
import dynamic from 'next/dynamic'
import type { FC } from 'react'

// Define the props interface (same as above)
interface BootstrapComponentsProps { }

// Type the dynamic import
const BootstrapComponents = dynamic<BootstrapComponentsProps>(
	() => import('@/util/BootstrapComponents'),
	{ ssr: false } // Disable SSR since this is client-side only
) as FC<BootstrapComponentsProps>
import { dataBg } from '@/util/data-bg'
import useMaskImage from '@/util/useMaskImage'
import useMobileMenu from '@/util/useMobileMenu'
import useStickyHeader from '@/util/useStickyHeader'
import AnimatedText from '@/util/useTextAnimation'
import { useEffect, useState } from "react"
import BackToTop from '../elements/BackToTop'
import Breadcrumb from './Breadcrumb'
import MobileMenu from './MobileMenu'
import Footer1 from './footer/Footer1'
import Header1 from "./header/Header1"

interface LayoutProps {
	children?: React.ReactNode
	breadcrumbTitle?: string
}


export default function Layout({ breadcrumbTitle, children }: LayoutProps) {
	const [scroll, setScroll] = useState<boolean>(false)
	// Mobile Menu
	const [isMobileMenu, setMobileMenu] = useState<boolean>(false)
	const handleMobileMenu = (): void => setMobileMenu(!isMobileMenu)

	useEffect(() => {
		const handleScroll = (): void => {
			setScroll((prev) => {
				const scrollCheck = window.scrollY > 100
				return scrollCheck !== prev ? scrollCheck : prev
			})
		}
		document.addEventListener("scroll", handleScroll)
		return () => document.removeEventListener("scroll", handleScroll)
	}, [])
	dataBg()
	AnimatedText()
	useMobileMenu()
	useStickyHeader()
	useMaskImage()
	// useBootstrap()
	return (
		<>
			<div id="top" />
			<BootstrapComponents />
			<Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
			<MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />

			<main className="fix">
				{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

				{children}
			</main>

			<Footer1 />

			<BackToTop target="#top" />
		</>
	)
}
