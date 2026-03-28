import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

  const { searchParams } = new URL(request.url);

  const term = searchParams.get("term")?.trim();
  if (!term) {
    return NextResponse.json(
      { error: "Please enter a term in the search bar" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.freepik.com/v1/icons?${searchParams.toString()}`,
    {
      headers: {
        "x-freepik-api-key": apiKey,
      }
    }
  );

  const payload = await response.json();

  return NextResponse.json(payload?.data, { status: response.status });
}
