import { type NextRequest, NextResponse } from 'next/server'

// Takes care of redirecting /studio to /studio/en as Sanity Studio workspaces requires the same number of
// path segments in `basePath`. In other words, two workspaces with basePath `/en/studio` and '/no/studio' is allowed
// while `/studio` and '/no/studio' is not

export const config = {
  matcher: '/studio/:tool*',
}

export function middleware(request: NextRequest) {
  // @TODO come back to this later and figure out how to make it work without causing an infinite redirect loop
  /*
  const { pathname } = new URL(request.url)
  if (
    pathname.endsWith(request.nextUrl.pathname) &&
    !pathname.endsWith(`${request.nextUrl.locale}${request.nextUrl.pathname}`)
  ) {
    const url = request.nextUrl.clone()
    url.pathname = `/${request.nextUrl.locale}${request.nextUrl.pathname}`
    return NextResponse.redirect(url)
  }
  // */

  return undefined
}
