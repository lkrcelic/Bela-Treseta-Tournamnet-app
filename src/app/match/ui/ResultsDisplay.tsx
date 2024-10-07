import React from 'react';
import {Typography} from '@mui/material';
import {Grid} from "@mui/system";
import useMatchStore from "@/app/store/matchStore";

export default function ResultsDisplay() {
    const {results} = useMatchStore();

    return (
            <Grid container spacing={1.5} justifyContent="center">
                {results.map((result, index) => (
                    <Grid key={index} container item size={{ xs: 11 }} justifyContent="space-evenly" alignItems="center"
                          sx={{ backgroundColor: "secondary.main", borderRadius: "20px" , paddingY: 0.5 }}>
                        <Grid item size={{ xs: 4 }}>
                            <Typography variant="h4" textAlign="center" color={"default"} paddingRight={1}>
                                {result.team1Points}
                            </Typography>
                        </Grid>

                        <Grid item size={{ xs: 2 }}>
                            <Typography variant="h4" textAlign="center">
                                •
                            </Typography>
                        </Grid>

                        <Grid item size={{ xs: 4 }}>
                            <Typography variant="h4" textAlign="center" color={"default"} paddingLeft={1}>
                                {result.team2Points}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
    );
}
