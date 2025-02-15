"use client";

import {logoutUser} from "@/app/_fetchers/authentication/logout";
import {Box, Button} from "@mui/material";
import {useRouter} from "next/navigation";
import {getActiveRoundByPlayerIdAPI} from "@/app/_fetchers/round/getActiveByPlayerId";
import Image from "next/image";
import {useEffect, useState} from "react";

export default function Home() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  async function logOut(): Promise<void> {
    await logoutUser();
    window.location.reload();
  }


  useEffect(() => {
    fetch('/api/session/is-admin')
      .then((res) => res.json())
      .then((data) => setIsAdmin(data))
      .catch((err) => console.error('Failed to fetch session', err));
  }, []);


  async function startGame(): Promise<void> {
    const {roundId, ongoingMatchId} = await getActiveRoundByPlayerIdAPI()
    if (ongoingMatchId) {
      router.push(`/ongoing-match/${ongoingMatchId}`);
    } else {
      router.push(`/round/${roundId}/players-seating`);
    }
  }

  async function createTeam() {
    router.push("/teams/new");
  }


  async function createRound() {
    router.push("/createRound");
  }

  async function table() {
    router.push("/league/1/standings");
  }

  return (
    <>
      <Box sx={{gridArea: "top", alignItems: "center", display: "flex", justifyContent: "center"}}>
        <Image src="/TitleBackgroundSponsors.png"
               alt="Logo"
               width={1000}
               height={1000}
               style={{width: '100%', height: 'auto', maxWidth: "600px"}}
        />
      </Box>
      <Box
        sx={{
          gridArea: "body",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {isAdmin &&
          <Button variant="contained" color="primary" onClick={createRound}>
            Create round
          </Button>
        }
        {isAdmin &&
          <Button variant="contained" color="primary" onClick={createTeam}>
          Create team
        </Button>
        }
        <Button variant="contained" color="primary" onClick={startGame}>
          Start game
        </Button>
        <Button variant="contained" color="primary" onClick={table}>
          League Standings
        </Button>
        <Button variant="contained" color="secondary" onClick={logOut}>
          Log out
        </Button>
      </Box>
    </>
  );
}
