import React from 'react';
import {useParams, usePathname, useRouter} from "next/navigation";
import useMatchStore from "@/app/store/matchStore";
import useRoundStore from "@/app/store/RoundStore";
import useResultStore from "@/app/store/bela/resultStore";
import SingleActionButton from "@/app/ui/singeActionButton";

export default function Action() {
    const {matchData: {player_pair1_score, player_pair2_score}, resetMatch} = useMatchStore();
    const {addMatch} = useRoundStore();
    const {resetResult, setMatchId} = useResultStore();
    const router = useRouter();
     const {matchId} = useParams();
    const pathname = usePathname();


    const getProps = () => {
        if (player_pair1_score >= 1001 || player_pair2_score >= 1001) {
            return {
                label: "Završi meč",
                onClick: () => {
                    addMatch({player_pair1_score, player_pair2_score});
                    resetMatch();
                    resetResult();
                },

            }
        } else {
            return {
                label: "Upiši igru",
                onClick: () => {
                    setMatchId(Number(matchId));
                    router.push(`${pathname}/ongoing-result/trump-caller`);
                },
            }
        }
        //TODO dodati kada oboje prijeđu 1001
    };

    const props = getProps();

    return <SingleActionButton label={props.label} onClick={props.onClick}/>
}
