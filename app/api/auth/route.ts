import { NextRequest, NextResponse } from "next/server";

const githubAuthorizeUrl = "https://github.com/login/oauth/authorize";

export function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new NextResponse("Missing GITHUB_CLIENT_ID", { status: 500 });
  }

  const provider = request.nextUrl.searchParams.get("provider");

  if (provider !== "github") {
    return new NextResponse("Unsupported auth provider", { status: 400 });
  }

  const state = crypto.randomUUID();
  const scope = request.nextUrl.searchParams.get("scope") || "repo";
  const redirectUri = new URL("/api/callback", request.url);
  const authorizeUrl = new URL(githubAuthorizeUrl);

  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri.toString());
  authorizeUrl.searchParams.set("scope", scope);
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);

  response.cookies.set("github_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    maxAge: 60 * 10,
    path: "/",
  });

  return response;
}
