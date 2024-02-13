import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/site'],
  async beforeAuth(auth, req) {
    // Vor der Authentifizierung keine spezifische Logik erforderlich
  },
  async afterAuth(auth, req) {
    const url = req.nextUrl;

    // Wenn der Benutzer auf der Landingpage (/site) ist, leite ihn zu /agency weiter
    if (url.pathname === '/site') {
      return NextResponse.redirect(new URL('/agency', req.url));
    }

    // Standardverhalten: Weiterleitung auf die angeforderte Seite
    return NextResponse.next();
  },
});

export const config = {
  // Routen, die von der Middleware abgedeckt werden sollen
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/site', '/(api|trpc)(.*)'],
};
