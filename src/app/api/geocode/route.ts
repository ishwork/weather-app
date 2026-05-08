import { NextRequest, NextResponse } from "next/server";

import { fetchGeoSuggestions } from "@/lib";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await fetchGeoSuggestions(q);
    return NextResponse.json(
      { results },
      {
        headers: {
          // City coordinates rarely change — cache for 24 h, serve stale
          // for 5 min while revalidating in the background.
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("Geocode API error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
