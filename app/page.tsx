import Layout from "@/components/layout/Layout"
import Section1 from "@/components/sections/home1/section1"
import Section3 from "@/components/sections/home1/section3"
import Section4 from "@/components/sections/home1/section4"
import Section5 from "@/components/sections/home1/section5"
import Section6 from "@/components/sections/home1/section6"
import Section63 from "@/components/sections/home3/section6"
import Section7 from "@/components/sections/home1/section7"
import Section9, { type NewsCard } from "@/components/sections/home1/section9"
import Section2 from "@/components/sections/home1/section2"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const Section12 = dynamic(() => import("@/components/sections/home5/section12"))
const Section8 = dynamic(() => import("@/components/sections/home1/section8"))
const Section10 = dynamic(() => import("@/components/sections/home1/section10"))

function BelowFoldFallback() {
	return <div style={{ minHeight: "200px" }} aria-hidden />
}
import { CMS_NEWS_TAG } from "@/lib/cms-revalidate"
import { getBaseUrl } from "@/lib/getBaseUrl"

async function getLatestNews(): Promise<NewsCard[]> {
	try {
		const baseUrl = getBaseUrl()
		const res = await fetch(`${baseUrl}/api/news?limit=12`, { next: { tags: [CMS_NEWS_TAG] } })
		if (!res.ok) return []
		const json = await res.json()
		return json?.data ?? []
	} catch (error) {
		console.error("Failed to load news", error)
		return []
	}
}

export default async function Home() {
	const news = await getLatestNews()

	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<Section1 />
				<Suspense fallback={<BelowFoldFallback />}>
					<Section12 />
				</Suspense>
				<Section2 />
				<Section3 />
				<Section4 />
				<Section5 />
				<Section6 />
				<Section7 />
				<Suspense fallback={<BelowFoldFallback />}>
					<Section8 />
				</Suspense>
				<Section9 items={news} />
				<Section63 />
				<Suspense fallback={<BelowFoldFallback />}>
					<Section10 />
				</Suspense>
			</Layout>
		</>
	)
}