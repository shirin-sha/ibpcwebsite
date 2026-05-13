import Image from "next/image"
import type { CSSProperties } from "react"

export type CmsImageProps = {
	src: string | null | undefined
	alt: string
	/** Parent must be `position: relative` with explicit dimensions */
	fill?: boolean
	width?: number
	height?: number
	sizes: string
	className?: string
	style?: CSSProperties
	priority?: boolean
}

/**
 * Uses next/image for optimizable URLs; falls back to `<img>` for data URLs
 * (Mongo embedded images) since those are not resized by the Image optimizer.
 */
export default function CmsImage({
	src,
	alt,
	fill,
	width = 800,
	height = 450,
	sizes,
	className,
	style,
	priority,
}: CmsImageProps) {
	if (!src) return null

	if (src.startsWith("data:")) {
		return (
			// eslint-disable-next-line @next/next/no-img-element -- data URLs are not optimized by next/image
			<img
				src={src}
				alt={alt}
				className={className}
				style={style}
				decoding="async"
				loading={priority ? "eager" : "lazy"}
			/>
		)
	}

	if (fill) {
		return (
			<Image
				src={src}
				alt={alt}
				fill
				sizes={sizes}
				className={className}
				style={{ ...style, objectFit: (style?.objectFit as React.CSSProperties["objectFit"]) || "cover" }}
				priority={priority}
			/>
		)
	}

	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			sizes={sizes}
			className={className}
			style={style}
			priority={priority}
		/>
	)
}
