import "/public/assets/css/bootstrap.min.css"
import "/public/assets/css/fontawesome-all.min.css"
import "/public/assets/css/swiper-bundle.min.css"
import "/public/assets/css/default.css"
import "/public/assets/css/style.css"
import type { Metadata } from "next"

/** Same families/weights as theme CSS; `display=swap` is in the query string (Google serves matching @font-face). */
const GOOGLE_FONTS_STYLESHEET =
	"https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"

export const metadata: Metadata = {
    title: "IBPC Kuwait",
    description: "IBPC Kuwait",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="stylesheet" href={GOOGLE_FONTS_STYLESHEET} />
            </head>
            <body className='white-bg'>
                {children}
            </body>
        </html>
    )
}
