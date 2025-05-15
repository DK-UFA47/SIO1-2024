import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  	const { pathname } = request.nextUrl;
  	const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
	
  	if (
  	  	token &&
  	  	(pathname.startsWith('/connexion') || pathname.startsWith('/inscription'))
  	) {
  	  	return NextResponse.redirect(new URL('/', request.url));
  	}

  	if (
  	  	!token &&
  	  	!pathname.startsWith('/connexion') &&
  	  	!pathname.startsWith('/inscription') &&
  	  	!pathname.startsWith('/_next') &&
  	  	!pathname.startsWith('/favicon.ico')
  	) {
  	  	return NextResponse.redirect(new URL('/connexion', request.url));
  	}

  	if (
  	  	pathname.startsWith('/gestion_quiz') &&
  	  	(!token || token.role !== 'formateur')
  	) {
  	  	return NextResponse.redirect(new URL('/', request.url));
  	}

	if (
  	  	pathname.startsWith('/quiz') &&
  	  	(!token || token.role !== 'stagiaire')
  	) {
  	  	return NextResponse.redirect(new URL('/', request.url));
  	}

  	return NextResponse.next();
}

export const config = {
  	matcher: ['/((?!api|_next|favicon.ico).*)'],
};