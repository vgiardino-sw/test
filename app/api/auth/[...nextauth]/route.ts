// https://authjs.dev/guides/upgrade-to-v5#configuration
import { handlers } from "@/auth"
import { NextRequest } from "next/server"

const reqWithTrustedOrigin = (req: NextRequest): NextRequest => {
	if (process.env.AUTH_TRUST_HOST !== 'true') return req
	const proto = req.headers.get('x-forwarded-proto')
	const host = req.headers.get('x-forwarded-host')
	if (!proto || !host) {
		console.warn("Missing x-forwarded-proto or x-forwarded-host headers.")
		return req
	}
	const envOrigin = `${proto}://${host}`
	const { href, origin } = req.nextUrl
	return new NextRequest(href.replace(origin, envOrigin), req)
}

export const GET = (req: NextRequest) => {
    console.log("Headers GET:", req.headers.get('x-forwarded-proto'), req.headers.get('x-forwarded-host'));
	return handlers.GET(reqWithTrustedOrigin(req))
}

export const POST = (req: NextRequest) => {
    console.log("Headers POST:", req.headers.get('x-forwarded-proto'), req.headers.get('x-forwarded-host'));
	return handlers.POST(reqWithTrustedOrigin(req))
}