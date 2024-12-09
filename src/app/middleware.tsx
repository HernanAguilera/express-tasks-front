import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  alert("Middleware");

  return NextResponse.redirect(new URL("/login", request.url));
}
