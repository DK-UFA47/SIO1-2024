'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

// Map of links to display in the side navigation.

export default function NavLinks() {
  	const pathname = usePathname();
  	const { data: session } = useSession();
	
  	const userRole = session?.user?.role;

  	const links = [
  	  	{ name: 'Information', href: '/', roles: ['stagiaire', 'formateur'] },
  	  	{ name: 'Quiz', href: '/quiz', roles: ['stagiaire'] },
  	  	{ name: 'Gestion des quizzes', href: '/gestion_quiz', roles: ['formateur'] },
  	];

  	const filteredLinks = userRole
  	  	? links.filter(link => link.roles.includes(userRole))
  	  	: [];

  	return (
  	  	<>
  	  	  	{filteredLinks.map((link) => {
  	  	  	  	return (
  	  	  	  	    <Link
  	  	  	  	        key={link.name}
  	  	  	  	        href={link.href}
  	  	  	  	        className={clsx(
  	  	  	  	            	'flex h-[72px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-5 text-lg font-medium hover:bg-sky-100 hover:text-blue-600',
  	  	  	  	            	{'bg-sky-100 text-blue-600': pathname === link.href,},
  	  	  	  	          	)}>
  	  	  	  	        <p className="">{link.name}</p>
  	  	  	  	    </Link>
  	  	  	  	);
  	  	  	})}
  	  	</>
  	);
}