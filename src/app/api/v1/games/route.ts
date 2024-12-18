import { NextRequest, NextResponse } from "next/server";
import { extractFields } from "@/lib/validation/queryFieldsValidation";
import { getQueryData } from "@/services/igdb";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;

  const { queryParams } = extractFields(getSearchParams(searchParams));

  const { data, error } = await getQueryData(queryParams);

  if (error)
    return new NextResponse(
      JSON.stringify({
        status: "error",
        data: { message: "Internal Server Error" },
      }),
      { status: 500, statusText: "Internal Server Error" }
    );

  return NextResponse.json(data);
}

function getSearchParams(searchParams: URLSearchParams): {
  [key: string]: string | string[] | undefined;
} {
  const res: ReturnType<typeof getSearchParams> = {};

  searchParams.entries().forEach(([key, val]) => {
    if (res[key]) {
      if (Array.isArray(res[key])) {
        res[key].push(val);
      } else {
        res[key] = [res[key], val];
      }
    } else {
      res[key] = val;
    }
  });

  return res;
}
