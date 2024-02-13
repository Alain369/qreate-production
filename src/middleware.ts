import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: [process.env.NEXT_PUBLIC_URL + '/site'],
  async beforeAuth(auth, req) {
    // Vor der Authentifizierung den Benutzer zur Landingpage weiterleiten
    const url = new URL(process.env.NEXT_PUBLIC_URL + '/site');

    if (url.pathname !== '/site') {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_URL + '/site');
    }
  },
  async afterAuth(auth, req) {
    const url = new URL(req.url);

    // Nach der Authentifizierung den Benutzer zur Zielroute weiterleiten
    if (url.pathname === '/site') {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_URL + '/agency');
    }

    // Standardverhalten: Weiterleitung auf die angeforderte Seite
    return NextResponse.next();
  },
});

export const config = {
  // Routen, die von der Middleware abgedeckt werden sollen
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/site', '/(api|trpc)(.*)'],
};
