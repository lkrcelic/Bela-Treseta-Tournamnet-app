import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { STATUS } from "@/app/lib/statusCodes";

export async function GET() {
    try {
      // TODO?: implement limit/offset
      const allMatches = await prisma.belaPlayerAnnouncement.findMany();
  
      return NextResponse.json(allMatches, { status: STATUS.OK });
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch matches." }, { status: STATUS.ServerError });
    }
  }