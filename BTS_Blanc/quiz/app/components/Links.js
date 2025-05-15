'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
const links = [
  { name: 'Information', href: '/information', },
  { name: 'Connexion', href: '/connexion', },
  { name: 'Inscription', href: '/inscription', },
  { name: 'Quiz', href: '/quiz', },
  { name: 'Gestion des quizzes', href: '/gestion_quiz', },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
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