import type { ImgHTMLAttributes } from "react"

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
	alt: string
	/** LCP / visible immediately (header logos, preloader, hero). Default: lazy. */
	eager?: boolean
}

/**
 * Native lazy-loading for static `<img>` tags; keeps layout/CSS unchanged.
 */
export default function LazyImg({ eager, loading, decoding = "async", alt, ...rest }: Props) {
	return (
		<img
			{...rest}
			alt={alt}
			loading={eager ? "eager" : loading ?? "lazy"}
			decoding={decoding}
		/>
	)
}
