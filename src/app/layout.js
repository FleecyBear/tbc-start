import "./global.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

config.autoAddCss = false;

export const metadata = {
  title: "React App",
  description: "Web site created with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <UserProvider>
        <body>
          <div className="app-layout">
            <main className="main-layout">{children}</main>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
