import {prisma} from "@/app/lib/prisma";

export async function getOngoingMatchWithResultsAndAnnouncements(ongoingMatchId: number): Promise<unknown> {
    return prisma.ongoingMatch.findUnique({
        where: {id: ongoingMatchId},
        include: {belaResults: {include: {belaPlayerAnnouncements: true}}}
    });
}