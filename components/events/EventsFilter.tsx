'use client'

import { useRouter } from 'next/navigation'

type EventsFilterProps = {
	currentFilter: "upcoming" | "past" | "all"
}

export default function EventsFilter({ currentFilter }: EventsFilterProps) {
	const router = useRouter()

	const filters = [
		{ key: "all", label: "All Events" },
		{ key: "upcoming", label: "Upcoming Events" },
		{ key: "past", label: "Past Events" }
	]

	const handleFilterClick = (filterKey: string, e: React.MouseEvent) => {
		e.preventDefault()
		const url = filterKey === "all" ? "/events" : `/events?filter=${filterKey}`
		router.push(url, { scroll: false })
	}

	return (
		<div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
			{filters.map((filter) => {
				const isActive = currentFilter === filter.key
				return (
					<button
						key={filter.key}
						type="button"
						onClick={(e) => handleFilterClick(filter.key, e)}
						style={{
							padding: "10px 24px",
							borderRadius: "8px",
							border: `1px solid ${isActive ? "var(--tg-theme-primary)" : "#e5e7f0"}`,
							background: isActive ? "var(--tg-theme-primary)" : "#ffffff",
							color: isActive ? "#ffffff" : "#4b5563",
							fontSize: "14px",
							fontWeight: isActive ? 600 : 500,
							textDecoration: "none",
							transition: "all 0.2s",
							cursor: "pointer",
							fontFamily: "inherit",
						}}
						onMouseEnter={(e) => {
							if (!isActive) {
								e.currentTarget.style.borderColor = "var(--tg-theme-primary)"
								e.currentTarget.style.color = "var(--tg-theme-primary)"
								e.currentTarget.style.background = "rgba(62, 128, 255, 0.05)"
							}
						}}
						onMouseLeave={(e) => {
							if (!isActive) {
								e.currentTarget.style.borderColor = "#e5e7f0"
								e.currentTarget.style.color = "#4b5563"
								e.currentTarget.style.background = "#ffffff"
							}
						}}
					>
						{filter.label}
					</button>
				)
			})}
		</div>
	)
}

