import {NextRequest, NextResponse} from "next/server";
import {STATUS} from "@/app/lib/statusCodes";
import {getCurrentRoundMatchups} from "@/app/lib/service/round/getRoundMatchups";

export async function GET(request: NextRequest) {
  try {
    const rounds = await getCurrentRoundMatchups();
    if (!rounds) return NextResponse.json({error: "There was an error fetching rounds."}, {status: STATUS.ServerError});

    return NextResponse.json(rounds, {status: STATUS.OK});
  } catch (error) {
    return NextResponse.json({error: "Failed to fetch rounds."}, {status: STATUS.BadRequest});
  }
}
