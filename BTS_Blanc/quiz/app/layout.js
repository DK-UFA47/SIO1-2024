import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SideNav from "./components/SideNav";
import "@/public/styles/output.css";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  	return (
  	  	<html lang="fr">
  	  	  	<head>
  	  	  	  	<meta name="viewport" content="width=device-width, initial-scale=1" />
  	  	  	  	<meta name="description" content="Application Quiz" />
  	  	  	  	<link rel="icon" href="/favicon.ico" />
  	  	  	  	<title>Application Quiz</title>
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