import { AuthenticatedNextRequest } from "@/types/middleware.types";

export function isValidAuthentication(req: AuthenticatedNextRequest): boolean {
    const session = req.auth;
    if (!session?.user) {
      return false;
    }
    const token = session.idToken;
    if (!token) {
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (session.exp && session.exp < currentTime) {
      console.log("Token has expired");
      return false;
    }
    return true;
  }
  
  export function getRoles(req: AuthenticatedNextRequest): string[] {
    return req.auth?.user?.roles ?? [];
  }
  
  export function hasRole(roles: string[], expectedRole: string): boolean {
    return roles.includes(expectedRole);
  }
  
  export function hasAnyRole(roles: string[], expectedRoles: string[]): boolean {
    return expectedRoles.some(role => roles.includes(role));
  }
  
  export function hasAllRoles(roles: string[], expectedRoles: string[]): boolean {
    return expectedRoles.every(role => roles.includes(role));
  }