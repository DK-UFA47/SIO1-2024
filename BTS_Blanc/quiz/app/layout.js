import Link from "next/link";
import Image from "next/image";
import SideNav from "./components/SideNav";
import "./styles/output.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="quiz de Alexandre Mikhael" />
        <link rel="icon" href="/favicon.ico" />
        <title>Application Quiz</title>
        <link rel="stylesheet" href="/styles/output.css" />
      </head>
      <body className="min-h-full flex">
        <div className="flex flex-row w-full">
          <aside className="sticky top-0 z-50 h-screen">
            <SideNav />
          </aside>
          <main className="flex-grow p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}