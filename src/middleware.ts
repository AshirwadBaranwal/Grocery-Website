import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";



// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const {isAuthenticated} = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if(!isUserAuthenticated){
        return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/', request.url));
    }
};
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/cart/:path*','/'],
}