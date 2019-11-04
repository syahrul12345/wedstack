import React from 'react'
import Grid from '@material-ui/core/Grid';
import './mainBanner.css'
import { Button } from '@material-ui/core';
import { Picture } from 'react-responsive-picture';
export default function MainBanner() {
    return(
        <div>
            <Grid container spacing = {0}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <p id="intro">Accelerate your Wedding</p>
                    <p id="blurb"> Quickly get started without dealing with scammy wedding planners.
                    What you see is what you get.
                    </p>
                    <Grid item xs={12} className="buttonGrid">
                        <Button 
                        id="getStartedBtn" 
                        variant="contained" 
                        size="large" 
                        > GET STARTED </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} align="center">
                   <Picture
                    sources ={[
                        {
                            srcSet:'/images/wireframeSmall.jpg',
                            media: "(max-width:1200px)"
                        },
                        {
                            srcSet: '/images/wireframe.jpg',
                            media: "(min-width:1201px)"
                        }
                    ]}>
                    </Picture>
                </Grid>
            </Grid>
        </div>
    )
}