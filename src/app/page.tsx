"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Box, Button, Container, Paper, Stack, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';

// API fetchers
import {logoutUser} from "@/app/_fetchers/authentication/logout";
import {getOpenRoundByPlayerIdAPI} from "@/app/_fetchers/round/getOpenByPlayerId";

const ActionButton = ({onClick, label, color = "primary", fullWidth = true, icon = null}) => (
  <Button
    variant="contained"
    color={color}
    onClick={onClick}
    fullWidth={fullWidth}
    sx={{
      py: 1.8,
      px: 3,
      borderRadius: 2.5,
      textTransform: 'none',
      fontSize: '1.05rem',
      fontWeight: 'medium',
      display: 'flex',
      gap: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '54px',
      boxShadow: 2,
      '&:active': {
        transform: 'scale(0.98)',
        boxShadow: 1,
      },
      transition: 'transform 0.1s, box-shadow 0.1s'
    }}
  >
    {icon}
    {label}
  </Button>
);

export default function Home() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    fetch('/api/session/is-admin')
      .then((res) => res.json())
      .then((data) => setIsAdmin(data))
      .catch((err) => console.error('Failed to fetch session', err));
  }, []);

  // Navigation handlers
  const handleStartGame = async () => {
    try {
      const {roundId, ongoingMatchId} = await getOpenRoundByPlayerIdAPI();

      if (ongoingMatchId) {
        router.push(`/ongoing-match/${ongoingMatchId}`);
      } else {
        router.push(`/round/${roundId}/players-seating`);
      }
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigateTo = (path) => () => {
    router.push(path);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 90px)',
      width: '100%',
      position: 'relative',
      overflowY: 'hidden',
    }}>
      {/* Fixed Header - Top Grid Area */}
      <Box sx={{
        gridArea: "top",
        width: "100%",
        backgroundColor: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        pb: 2,
        position: 'sticky',
        zIndex: 10
      }}>
        <Typography variant="h5" component="h1" sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'primary.main'
        }}>
          Piatnik Bela Liga
        </Typography>
      </Box>

      <Box sx={{
        gridArea: "body",
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        py: 2,
      }}>
        <Container maxWidth="sm" sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          p: 1,
          width: '100%'
        }}>
          {/* Main Actions Section */}
          <Paper elevation={3} sx={{
            p: 3,
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <Typography variant="h6" component="h2" sx={{mb: 1, fontWeight: 'bold'}}>
              Tournament Actions
            </Typography>

            <ActionButton
              onClick={handleStartGame}
              label="Start Game"
              color="primary"
              icon={<PlayArrowIcon/>}
            />

            <ActionButton
              onClick={navigateTo("/league/1/daily-standings")}
              label="Daily Standings"
              color="primary"
              icon={<CalendarMonthIcon/>}
            />

            <ActionButton
              onClick={navigateTo("/league/1/standings")}
              label="League Standings"
              color="primary"
              icon={<EmojiEventsIcon/>}
            />
          </Paper>

          {/* Admin Section - Only visible to admins */}
          {isAdmin && (
            <Paper elevation={3} sx={{
              p: 2,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <Typography variant="h6" component="h2" sx={{mb: 1, fontWeight: 'bold'}}>
                Admin Controls
              </Typography>

              <Stack direction="row" spacing={2}>
                <ActionButton
                  onClick={navigateTo("/createRound")}
                  label="Create Round"
                  color="secondary"
                  fullWidth
                  icon={<AddCircleOutlineIcon/>}
                />

                <ActionButton
                  onClick={navigateTo("/teams/new")}
                  label="Create Team"
                  color="secondary"
                  fullWidth
                  icon={<GroupAddIcon/>}
                />
              </Stack>
            </Paper>
          )}
        </Container>
      </Box>

      {/* Fixed Footer - Actions Grid Area */}
      <Box sx={{
        gridArea: "actions",
        width: "100%",
        backgroundColor: 'none',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        py: 2,
        position: 'sticky',
        bottom: 0,
        zIndex: 10
      }}>
        <Container maxWidth="sm" sx={{display: 'flex', justifyContent: 'center', p: 1}}>
          <ActionButton
            onClick={handleLogout}
            label="Log Out"
            color="secondary"
            icon={<LogoutIcon/>}
          />
        </Container>
      </Box>
    </Box>
  );
}
