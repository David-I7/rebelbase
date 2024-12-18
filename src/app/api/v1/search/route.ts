import { search } from "@/services/igdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query)
    return new NextResponse(
      JSON.stringify({
        status: "error",
        data: { message: "Request is missing query param 'q'" },
      }),
      { status: 400, statusText: "Bad request" }
    );

  const { data, error } = await search(query);

  if (error)
    return new NextResponse(
      JSON.stringify({
        status: "error",
        data: { message: "Internal Server Error" },
      }),
      { status: 500, statusText: "Internal Server Error" }
    );

  return NextResponse.json(data!);
}
