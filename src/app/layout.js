import Header from "./components/Header";
import Footer from "./components/Footer";
import "./global.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically
export const metadata = {
  title: "React App",
  description: "Web site created with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        ></link>
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
        <div className="App">
          <Header />
          <main className="main">{children}</main>
          {/* <div id="root">{children}</div> */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
