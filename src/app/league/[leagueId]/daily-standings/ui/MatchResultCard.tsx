import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import Circle from '@mui/icons-material/Circle';

type MatchResultCardProps = {
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  open?: boolean;
  tableNumber: number;
};

export function MatchResultCard({
                                  team1Name,
                                  team2Name,
                                  team1Score,
                                  team2Score,
                                  active = false,
                                  tableNumber
                                }: MatchResultCardProps) {
  return (
    <Box>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 2,
          position: 'relative',
          height: '100%',
          p: 0
        }}
      >
        <CardContent sx={{p: 2, '&:last-child': {pb: 2}}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1}}>
            <Typography variant="body1" sx={{fontWeight: 'small', color: 'gray'}}>
              Table {tableNumber}
            </Typography>
            {active && <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Circle sx={{
                fontSize: 12,
                mr: 0.5,
                color: 'error.main',
                borderRadius: '50%',
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': {
                    filter: 'drop-shadow(0 0 2px rgba(211, 47, 47, 0.7))',
                    transform: 'scale(1)'
                  },
                  '50%': {
                    filter: 'drop-shadow(0 0 4px rgba(211, 47, 47, 0.5))',
                    transform: 'scale(1.1)'
                  },
                  '100%': {
                    filter: 'drop-shadow(0 0 0px rgba(211, 47, 47, 0))',
                    transform: 'scale(1)'
                  }
                }
              }}/>
              <Typography variant="body1" sx={{fontSize: 14, fontWeight: 'bold', color: 'error.main'}}>LIVE</Typography>
            </Box>}
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
            <Typography variant="body1" sx={{fontWeight: 'medium', flex: 1}}>{team1Name}</Typography>
            <Typography variant="body1" sx={{fontWeight: 'bold'}}>{team1Score}</Typography>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="body1" sx={{fontWeight: 'medium', flex: 1}}>{team2Name}</Typography>
            <Typography variant="body1" sx={{fontWeight: 'bold'}}>{team2Score}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>

  );
}
