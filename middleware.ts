import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  checkAdminRoute,
  checkLoginRoute,
  checkUserRoute,
  redirectToDashboard,
  redirectToLogin,
  rewriteToDenied,
} from "@/lib/middleware.utils";
import { AuthenticatedNextRequest } from "@/types/middleware.types";
import { getRoles, hasRole, hasAnyRole, isValidAuthentication } from "@/lib/auth.utils";

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|demo-light.png|demo-dark.png|demo-mobile-light.png|demo-mobile-dark.png|auth$).*)",
  ],};


export default auth((req: AuthenticatedNextRequest) => {
  try {
    const { nextUrl } = req;
    const isAuthenticated = isValidAuthentication(req);

    const isLoginRoute = checkLoginRoute(nextUrl.pathname);
    const isAdminRoute = checkAdminRoute(nextUrl.pathname);
    const isUserRoute = checkUserRoute(nextUrl.pathname);
    
    if (isLoginRoute && isAuthenticated) {
      return redirectToDashboard(nextUrl);
    }

    if (!isLoginRoute && !isAuthenticated) {
      return redirectToLogin(nextUrl);
    }


    const roles = getRoles(req);

    if (isAdminRoute && !hasRole(roles, "Admin") || isUserRoute && !hasAnyRole(roles, ["User", "Admin"])) {
      return rewriteToDenied(nextUrl);
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return redirectToLogin(req.nextUrl);
  }
});