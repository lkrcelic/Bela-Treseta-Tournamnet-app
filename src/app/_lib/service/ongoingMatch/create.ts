import {prisma} from "@/app/_lib/prisma";
import {checkPlayersValid, insertPlayerPair} from "@/app/_lib/validation/playersValidation";
import {OngoingMatch} from "@prisma/client";

export async function createOngoingMatch(createRequest: unknown): Promise<OngoingMatch > {
    const seatingOrderIds = createRequest.seating_order_ids!;

    if (!await checkPlayersValid(seatingOrderIds)) {
        throw new Error( "Valid players for both teams must be provided!");
    }

    const playerPair1 = {player_id1: seatingOrderIds[0], player_id2: seatingOrderIds[2]}
    const playerPair2 = {player_id1: seatingOrderIds[1], player_id2: seatingOrderIds[3]}
    createRequest.player_pair_id1 = await insertPlayerPair(playerPair1);
    createRequest.player_pair_id2 = await insertPlayerPair(playerPair2);

    //TODO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ongoingMatch =  await prisma.ongoingMatch.create({data: createRequest as any});

    await prisma.round.update({
        where: { id: createRequest.round_id },
        data: { active: true },
    });

    return ongoingMatch;
}