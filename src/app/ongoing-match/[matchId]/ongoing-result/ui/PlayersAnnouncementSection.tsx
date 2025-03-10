"use client";

import React from "react";
import useAnnouncementStore from "@/app/_store/bela/announcementStore";
import {Button, Typography} from "@mui/material";
import PlayersContainer from "@/app/ongoing-match/[matchId]/ongoing-result/ui/PlayersContainer";
import useOngoingMatchStore from "@/app/_store/ongoingMatchStore";
import {PlayerPartialResponse} from "@/app/_interfaces/player";
import PlayerName from "@/app/_ui/PlayerName";

export default function PlayersAnnouncementSection() {
    const {
        playersAnnouncements,
        activePlayerId,
        setActivePlayerId,
    } = useAnnouncementStore();
    const {ongoingMatch: {playerPair1, playerPair2}} = useOngoingMatchStore();

    return (
        <PlayersContainer playerPair1={playerPair1} playerPair2={playerPair2}>
            {(player) => (
                <PlayerAnnouncementBox
                    key={player?.id}
                    player={player}
                    announcementValue={
                        playersAnnouncements[player?.id].totalAnnouncements || 0
                    }
                    teamColor={player === playerPair1?.player1 || player === playerPair1?.player2 ? "team1" : "team2"}
                    isActive={activePlayerId === player?.id}
                    onClick={() => setActivePlayerId(player?.id)}
                />
            )}
        </PlayersContainer>
    );
}

type AnnouncementBoxProps = {
    player: PlayerPartialResponse;
    announcementValue: number | string;
    teamColor: string;
    isActive: boolean;
    onClick?: () => void;
};

function PlayerAnnouncementBox({
                                   player,
                                   announcementValue,
                                   teamColor,
                                   onClick,
                                   isActive
                               }: AnnouncementBoxProps) {
    return (
        <Button
            onClick={onClick}
            color={teamColor}
            variant={(isActive ? 'contained' : 'outlined') as 'contained' | 'outlined'}
            sx={{
                width: "100px",
                height: "100px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                paddingX: "5px",
            }}
        >
            <Typography variant="subtitle2">
              <PlayerName firstName={player.first_name} lastName={player.last_name} />
            </Typography>
            <Typography variant="h6">{announcementValue}</Typography>
        </Button>
    );
}
