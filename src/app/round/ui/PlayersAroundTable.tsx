"use client";

import React from "react";
import {Box, Typography} from "@mui/material";
import {Grid} from "@mui/system";
import PlayerPairSelector from "@/app/round/ui/PlayerPairSelector";

export default function PlayersAroundTable() {
    return (
        <Grid container spacing={2} sx={{position: "relative", width: "100%", height: "400px"}}>
            <PlayerPairSelector/>
            <Grid
                item
                size={{xs: 12}}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: "190px",
                        height: "190px",
                        borderRadius: "50%",
                        backgroundColor: "secondary.main",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5">Stol</Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
