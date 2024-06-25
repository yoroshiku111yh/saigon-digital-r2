import type { Metadata } from "next";
import "../assets/css/globals.css";
import "../assets/css/components.css";
import "../assets/css/animate.css";
import Header from "./layout/header";
import { ContextCommonProvider } from "./providers";
import PopupSearch from "./components/popupSearch";
import LoadingScreen from "./components/loadingScreen";
export const metadata: Metadata = {
  title: "gleamy",
  description: "we are a digital production team.",
  other: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ContextCommonProvider>
          <Header />
          {children}
          <LoadingScreen />
          <PopupSearch />
        </ContextCommonProvider>
      </body>
    </html>
  );
}
