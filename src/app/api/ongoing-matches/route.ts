import {OngoingMatchCreateRequestValidation} from "@/app/lib/interfaces/match";
import {checkPlayersValid, insertPlayerPair} from "@/app/lib/belaValidation/playersValidation";
import {NextResponse} from "next/server";
import {STATUS} from "@/app/lib/statusCodes";
import {prisma} from "@/app/lib/prisma";
import {z} from "zod";

export async function POST(request: Request) {
    try {
        const req_data = await request.json();
        let createRequest = OngoingMatchCreateRequestValidation.parse(req_data);

        if (!await checkPlayersValid(createRequest)) {
            return NextResponse.json({error: "Valid players for both teams must be provided!"},
                {status: STATUS.BadRequest});
        }

        createRequest.player_pair_id1 = await insertPlayerPair(createRequest.player_pair1);
        createRequest.player_pair_id2 = await insertPlayerPair(createRequest.player_pair2);

        delete createRequest.player_pair1;
        delete createRequest.player_pair2;

        const ongoingMatch = await prisma.ongoingMatch.create({data: createRequest});

        return NextResponse.json({"match": ongoingMatch}, {status: STATUS.OK});
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({error: error.issues}, {status: STATUS.BadRequest});
        }
        return NextResponse.json({error: error}, {status: STATUS.ServerError});
    }
}