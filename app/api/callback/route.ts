import { NextRequest, NextResponse } from "next/server";

const githubTokenUrl = "https://github.com/login/oauth/access_token";

function callbackHtml(payload: string) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>GitHub authorization</title>
  </head>
  <body>
    <script>
      (function () {
        var provider = "github";
        var message = ${JSON.stringify(payload)};
        var origin = window.location.origin;

        function receiveMessage(event) {
          if (event.data === "authorizing:" + provider) {
            window.removeEventListener("message", receiveMessage);
            window.opener.postMessage(message, event.origin);
          }
        }

        window.addEventListener("message", receiveMessage);
        window.opener.postMessage("authorizing:" + provider, origin);
      })();
    </script>
    <p>Authorization complete. You can close this window.</p>
  </body>
</html>`;
}

function successPayload(token: string) {
  return `authorization:github:success:${JSON.stringify({ token, provider: "github" })}`;
}

function errorPayload(message: string) {
  return `authorization:github:error:${JSON.stringify({ message })}`;
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get("github_oauth_state")?.value;

  let payload: string;

  if (!clientId || !clientSecret) {
    payload = errorPayload("Missing GitHub OAuth environment variables.");
  } else if (!code) {
    payload = errorPayload("GitHub did not return an authorization code.");
  } else if (!state || !savedState || state !== savedState) {
    payload = errorPayload("Invalid GitHub OAuth state.");
  } else {
    const redirectUri = new URL("/api/callback", request.url);
    const response = await fetch(githubTokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri.toString(),
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error || !data.access_token) {
      payload = errorPayload(data.error_description || data.error || "GitHub token exchange failed.");
    } else {
      payload = successPayload(data.access_token);
    }
  }

  const response = new NextResponse(callbackHtml(payload), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });

  response.cookies.delete("github_oauth_state");

  return response;
}
