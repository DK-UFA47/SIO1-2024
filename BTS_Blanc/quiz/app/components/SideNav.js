'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './Links.js';
import { SessionProvider } from 'next-auth/react';

export default function SideNav() {
  	return (
		<nav className="flex flex-col p-2">
			<div className="bg-green-600 p-4 mb-2 flex h-40 w-52 justify-center items-center rounded-md " href="/">
				<Image src="/images/logo.svg" alt="Logo" width={100} height={100}/>
			</div>
			<div className="flex flex-col grow justify-between space-x-0 space-y-2">
				<SessionProvider>
				  	<NavLinks />
				</SessionProvider>
			</div>
		</nav>
  	);
}