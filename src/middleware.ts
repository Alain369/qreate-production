import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: [process.env.NEXT_PUBLIC_URL + 'site'],
});

export const config = {
  // Routen, die von der Middleware abgedeckt werden sollen
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/site', '/(api|trpc)(.*)'],
};
