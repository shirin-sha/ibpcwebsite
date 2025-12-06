'use client'

import Link from 'next/link'

type ShareButtonsProps = {
	url: string
	title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
	const handleShare = (platform: string, e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		let shareUrl = ''
		
		switch (platform) {
			case 'facebook':
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
				break
			case 'twitter':
				shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
				break
			case 'linkedin':
				shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
				break
			default:
				return
		}
		
		window.open(shareUrl, '_blank', 'width=600,height=400')
	}

	return (
		<div className="social-links style2">
			<ul className="list-wrap">
				<li>
					<Link href="#" onClick={(e) => handleShare('facebook', e)}>
						<i className="fab fa-facebook-f" />
					</Link>
				</li>
				<li>
					<Link href="#" onClick={(e) => handleShare('twitter', e)}>
						<i className="fab fa-twitter" />
					</Link>
				</li>
				<li>
					<Link href="#" onClick={(e) => handleShare('linkedin', e)}>
						<i className="fab fa-linkedin-in" />
					</Link>
				</li>
				<li>
					<Link href="https://www.instagram.com/" target="_blank">
						<i className="fab fa-instagram" />
					</Link>
				</li>
			</ul>
		</div>
	)
}





