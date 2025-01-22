import {prisma} from "@/app/lib/prisma";

export async function getBelaResultWithAnnouncements(ongoingResultId: number): Promise<unknown> {
  return prisma.ongoingBelaResult.findUnique({
    where: {result_id: ongoingResultId},
    include: {belaPlayerAnnouncements: true},
  });
}
