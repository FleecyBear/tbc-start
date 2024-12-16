import "./global.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { UserProvider } from "@auth0/nextjs-auth0/client";

config.autoAddCss = false;

export const metadata = {
  title: "React App",
  description: "Web site created with Next.js.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
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
