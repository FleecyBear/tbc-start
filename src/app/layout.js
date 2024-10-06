import Header from './components/Header'
import Footer from './components/Footer'
import './global.css'

export const metadata = {
    title: 'React App',
    description: 'Web site created with Next.js.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* <meta charset="utf-8" /> */}
                {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> */}
                {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
                {/* <meta name="theme-color" content="#000000" /> */}
                {/* <meta
                    name="description"
                    content="Web site created using create-react-app"
                /> */}
                {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}

                {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}

            </head>

            <body>
                <div className='App'>
                <Header />
                <div id="root">{children}</div>
                <Footer />/
                </div>
            </body>
        </html>
    )
}

