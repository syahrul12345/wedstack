import React from 'react'
import Grid from '@material-ui/core/Grid';
import PlanCard from '../../reuse/plancard'
import './plan.css'
export default function Plan() {

    return(
        <div>
            <Grid container spacing={2} className="planGrid">
                <Grid item xs={12}>
                    <p id="planTitle"> Plans</p>
                    <p id="planBlurb"> Ranging from affordable to luxurious</p>
                </Grid>
                <Grid container spacing={2} align="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <PlanCard
                        imagePath="/images/key.png" 
                        planName="Bronze"
                        planBlurb="Affordable without cutting corners"></PlanCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <PlanCard
                        imagePath="/images/key.png" 
                        planName="Silver"
                        planBlurb="Extra bling without the extragant prices."></PlanCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <PlanCard
                        imagePath="/images/key.png" 
                        planName="Gold"
                        planBlurb="All out weddings set to impress your friends and family"></PlanCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <PlanCard
                        imagePath="/images/key.png" 
                        planName="Platinum"
                        planBlurb="No expense is spared for the absolute best"></PlanCard>
                    </Grid>
                    
                </Grid>

            </Grid>
        </div>
    )
}