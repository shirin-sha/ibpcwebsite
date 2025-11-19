import Layout from "@/components/layout/Layout"
import Section1 from "@/components/sections/home1/section1"
import Section12 from "@/components/sections/home5/section12"
import Section3 from "@/components/sections/home1/section3"
import Section4 from "@/components/sections/home1/section4"
import Section5 from "@/components/sections/home1/section5"
import Section6 from "@/components/sections/home1/section6"
import Section63 from "@/components/sections/home3/section6"
import Section7 from "@/components/sections/home1/section7"
import Section8 from "@/components/sections/home1/section8"
import Section9, { type NewsCard } from "@/components/sections/home1/section9"
import Section2 from "@/components/sections/home1/section2"
import Section10 from "@/components/sections/home1/section10"
import { getBaseUrl } from "@/lib/getBaseUrl"

async function getLatestNews(): Promise<NewsCard[]> {
	try {
		const baseUrl = getBaseUrl()
		const res = await fetch(`${baseUrl}/api/news?limit=3`, { cache: "no-store" })
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
				<Section12 />
				<Section2 />
				<Section3 />
				<Section4 />
				<Section5 />
				<Section6 />
				<Section7 />
				<Section8 />
				<Section9 items={news} />
				<Section63 />
				<Section10 />
			</Layout>
		</>
	)
}