import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/site'],
  async beforeAuth(auth, req) {
    // Logik für vor der Authentifizierung (falls benötigt)
    // Hier kannst du Code hinzufügen, der vor der Authentifizierung ausgeführt werden soll
  },
  async afterAuth(auth, req) {
    const url = req.nextUrl;

    if (url.pathname === '/') {
      // Wenn der Benutzer auf der Landingpage ist, leite ihn zu /agency weiter
      return NextResponse.redirect(new URL('/agency', req.url));
    }

    // Wenn der Benutzer nicht auf der Landingpage ist, keine Änderungen vornehmen
    return NextResponse.next();
  },
});

export const config = {
  // Matcher-Konfiguration wie zuvor
};
