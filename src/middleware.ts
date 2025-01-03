import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {verifyCookie} from "@/app/lib/signCookie";
import {handleLogin} from "@/app/lib/rateLimiting/loginLimiting";
import {Cookie} from "lucia";
import {STATUS} from "@/app/lib/statusCodes";
import {isApiLimited} from "./app/lib/rateLimiting/requestLimiting";

export async function middleware(req: NextRequest) {
  if (
    !(
      req.nextUrl.pathname.startsWith("/api") ||
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/signup")
    )
  ) {
    const authorized = await authenticationMiddleware(req);
    if (!authorized) return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/api/login")) {
    if (await handleLogin(req)) {
      return NextResponse.json({error: "Too many login attempts. Try again later."}, {status: STATUS.TooManyRequests});
    }
  }

  if (req.nextUrl.pathname.startsWith("/api")) {
    if (await isApiLimited(req)) {
      return NextResponse.json({error: "Too many requests. Slow down!"}, {status: STATUS.TooManyRequests});
    }
  }

  return NextResponse.next();
}

async function authenticationMiddleware(req: NextRequest) {
  const reqCookie = req.cookies.get(process.env.AUTH_COOKIE ?? "BelaTresetaSession");
  const cookie = await verifyCookie(reqCookie as Cookie);
  return cookie === null ? false : true;
}

// TODO: Implement rate limiting per IP address.
// TODO: Maybe include redirecting on API calls as well?

export const config = {
  matcher: [
    /*
     * Match all pages except for:
     * - Static files (/_next/ and /public)
     */
    "/((?!_next|static|favicon.ico).*)",
  ],
};
