import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FREEPIK_BASE_URL = "https://api.freepik.com/v1/icons";

export async function GET(request: Request): Promise<NextResponse> {
  const apiKey = process.env.FREEPIK_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing FREEPIK_API_KEY. Add it to .env.local before making requests.",
      },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "Path parameter 'id' must be a valid numeric icon id." },
      { status: 400 }
    );
  }

  const response = await fetch(`${FREEPIK_BASE_URL}/${id}`, {
    headers: {
      "x-freepik-api-key": apiKey,
    },
  });

  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
