"use client";

import {useState, useEffect} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import {getRoundsByRoundNumber} from "@/app/_fetchers/round/getRoundsByRoundNumber";
import {RoundMatchup} from "@/app/_lib/service/round/getRoundMatchups";

export interface MatchupTableEntry {
  id: number;
  team1: string;
  team2: string;
}

interface MatchupTableProperties {
  roundNumber: number;
}

export default function OpponentsTable({roundNumber}: MatchupTableProperties) {
  const [entries, setEntries] = useState<MatchupTableEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRoundsByRoundNumber(roundNumber);
      setEntries(
        data.map((round: RoundMatchup) => ({
          id: round.id,
          team1: round.team1?.team_name ?? "",
          team2: round.team2?.team_name ?? "",
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{borderBottom: "1px solid black"}}>
              Stol
            </TableCell>
            <TableCell align="center" sx={{borderBottom: "1px solid black"}}>
              Ime ekipe
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry, i) => (
            <TableRow key={entry.id}>
              <TableCell align="center" sx={{borderBottom: "1px solid lightgray"}}>
                {i+1}
              </TableCell>
              <TableCell align="center" sx={{borderBottom: "1px solid lightgray"}}>
                {entry.team1} <br/>
                {entry.team2}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
