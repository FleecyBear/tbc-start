import { NextRequest, NextResponse } from 'next/server';
import { sessionStatus } from './app/utils/session'; 

export async function middleware(request) {
  const session = await sessionStatus(); 
  const publicPaths = ['/', '/login', '/register']; 
  const pathname = request.nextUrl.pathname;

  console.log('Middleware triggered');
  console.log('Current session:', session);
  console.log('Current pathname:', pathname);

  if (session === false && !publicPaths.includes(pathname)) {
    console.log('Redirecting to login page');
    const absoluteUrl = new URL("/login", request.nextUrl.origin); 
    return NextResponse.redirect(absoluteUrl.toString());
  }

  console.log('No redirect, proceeding');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'
  ],
};

