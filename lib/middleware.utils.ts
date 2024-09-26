import { NextResponse } from "next/server";

export function checkLoginRoute(pathname: string) {
  console.log("path", pathname)
  return ["/login"].includes(pathname);
}
export function checkLoginRoute2(pathname: string) {
  return ["/login2"].includes(pathname);
}
export function checkLoginRoute3(pathname: string) {
  return ["/sign-in"].includes(pathname);
}

export function redirectToLogin(nextUrl: URL) {
  return NextResponse.redirect(new URL("/login", nextUrl.origin));
}

export function redirectToDashboard(nextUrl: URL) {
  return NextResponse.redirect(new URL("/auth", nextUrl.origin));
}

export function rewriteToDenied(nextUrl: URL) {
  return NextResponse.rewrite(new URL("/auth/denied", nextUrl));
}

const userRoutes = [
  "/auth/roles/middleware/user",
];

const adminRoutes = [
  "/auth/roles/middleware/admin",
];

export function checkAdminRoute(pathname: string) {
  return adminRoutes.includes(pathname);
}

export function checkUserRoute(pathname: string) {
  return userRoutes.includes(pathname);
}