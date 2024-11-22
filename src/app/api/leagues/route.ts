import {prisma} from "@/app/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {STATUS} from "@/app/lib/statusCodes";
import {checkCurrentUserIsAdmin} from "@/app/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await checkCurrentUserIsAdmin(request);
    if (!isAdmin)
      return NextResponse.json({error: "You are not authorized for this action."}, {status: STATUS.Unauthorized});

    const allData = await prisma.league.findMany();

    return NextResponse.json(allData, {status: STATUS.OK});
  } catch (error) {
    return NextResponse.json({error: "Failed to fetch data."}, {status: STATUS.ServerError});
  }
}
