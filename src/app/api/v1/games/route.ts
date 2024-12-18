import { NextRequest, NextResponse } from "next/server";
import { extractFields } from "@/lib/validation/queryFieldsValidation";
import { getQueryData } from "@/services/igdb";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;

  const { queryParams } = extractFields(Object.fromEntries(searchParams));

  const { data, error } = await getQueryData(queryParams);

  if (error)
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      statusText: "Internal Server Error",
    });

  return NextResponse.json(data);
}
