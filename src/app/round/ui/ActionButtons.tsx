"use client";

import DoubleActionButton from "@/app/_ui/DoubleActionButton";
import {useParams, useRouter} from "next/navigation";
import React from "react";
import useOngoingMatchStore from "@/app/_store/ongoingMatchStore";
import {createOngoingMatchAPI} from "@/app/_fetchers/ongoingMatch/create";

export default function ActionButtons() {
    const router = useRouter();
    const {roundId} = useParams();
    const seatingOrder = useOngoingMatchStore(state => state.ongoingMatch.seating_order)

    const startMatch = async () => {
        const data = await createOngoingMatchAPI({
            round_id: Number(roundId),
            seating_order_ids: seatingOrder?.map((player) => player.id),
            current_shuffler_index: Math.floor(Math.random() * 4),
            score_threshold: 1001,
        });

        router.push(`/ongoing-match/${data.id}`);
    }

    return <DoubleActionButton secondButtonOnClick={startMatch} secondButtonLabel="Započni rundu"/>

}
