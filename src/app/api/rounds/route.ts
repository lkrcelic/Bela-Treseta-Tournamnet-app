import {NextRequest, NextResponse} from "next/server";
import {STATUS} from "@/app/_lib/statusCodes";
import {matchTeams} from "@/app/_lib/matching/matching";
import {getLeagueTeamsWithScores} from "@/app/_lib/helpers/query/leagueScores";
import {CreateRound} from "@/app/_interfaces/round";
import {checkCurrentUserIsAdmin} from "@/app/_lib/auth";
import {insertPairRounds} from "@/app/_lib/service/round/insertPairRounds";

export async function POST(request: Request) {
  try {
    const isUserAdmin = await checkCurrentUserIsAdmin(request as NextRequest);
    if (!isUserAdmin)
      return NextResponse.json("You are not authorized for this action.", {status: STATUS.Unauthorized});

    const req_data = await request.json();
    const parsedRequest = CreateRound.parse(req_data);

    const teamData = await getLeagueTeamsWithScores(parsedRequest.league_id);
    console.log("Team data: ",teamData);
    if (!teamData || teamData.length === 0) return NextResponse.json("Invalid league id.", {status: STATUS.BadRequest});

    // filter out teams that are not present
    const filteredTeams = teamData.filter((team) => parsedRequest.present_teams.includes(team.id));
    const pairs = matchTeams(filteredTeams);

    const roundNum = await insertPairRounds(pairs, parsedRequest.league_id);

    return NextResponse.json({round_number: roundNum}, {status: STATUS.OK});
  } catch (error) {
    //console.error(error);
    return NextResponse.json({error: "Failed to create round."}, {status: STATUS.BadRequest});
  }
}
