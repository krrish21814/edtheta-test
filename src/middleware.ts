/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import VerifyTokenAction from "./lib/actions/user/verify";

export async function middleware(req: NextRequest) {
  // // Get the token from cookies or query params
  // const token = req.nextUrl.searchParams.get("token")
  //   ? req.nextUrl.searchParams.get("token")
  //   : req.cookies.get("auth_token")?.value;
  // const currentPath = req.nextUrl.pathname;
  // // Redirect to "/schools" if no token is found
  // if (!token) {
  //   if (currentPath.includes("/login") || currentPath.includes("/signup")) {
  //     return NextResponse.next();
  //   }
  //   return NextResponse.redirect(new URL("/schools", req.url));
  // }

  // try {
  //   const user = await VerifyTokenAction(token);
  //   const decoded = user.data;

  //   // Set the token in cookies

  //   if (currentPath === "/") {
  //     const res = NextResponse.redirect(new URL(`/schools`, req.url));
  //     res.cookies.set("auth_token", token);
  //     return res;
  //   }

  //   if (currentPath === "/login" || currentPath === "/signup") {
  //     return NextResponse.redirect(new URL(`/schools`, req.url));
  //   }
  //   // Match the URL structure `/dashboard/<school-slug>/admin`
  //   const schoolSlug = currentPath.split("/")[2]; // Extract school slug from the URL

  //   // Ensure the slug matches the user's school from the token
  //   if (schoolSlug !== decoded?.school_slug) {
  //     return NextResponse.redirect(new URL("/schools", req.url));
  //   }

  //   if (decoded.role === "admin" && !currentPath.includes("/admin")) {
  //     return NextResponse.redirect(
  //       new URL(`/dashboard/${schoolSlug}/admin`, req.url)
  //     );
  //   }

  //   if (decoded.role === "principal" && !currentPath.includes("/principal")) {
  //     return NextResponse.redirect(
  //       new URL(`/dashboard/${schoolSlug}/principal`, req.url)
  //     );
  //   }

  //   if (decoded.role === "teacher" && !currentPath.includes("/teacher")) {
  //     return NextResponse.redirect(
  //       new URL(`/dashboard/${schoolSlug}/teacher`, req.url)
  //     );
  //   }

  //   if (decoded.role === "student" && !currentPath.includes("/student")) {
  //     return NextResponse.redirect(
  //       new URL(`/dashboard/${schoolSlug}/student`, req.url)
  //     );
  //   }

  //   return NextResponse.next();
  // } catch (error) {
  //   console.log("error", error);
  //   return NextResponse.redirect(new URL("/schools/auth/login", req.url));
  // }
  return NextResponse.next();
}
export const config = {
  matcher: [], // Empty array means no middleware runs
};
// Specify which routes this middleware should run on
// export const config = {
//   matcher: ["/dashboard/:path*/:path*", "/", "/schools/auth/:path*"],
// };
