import React from 'react'
import { Grid } from '@material-ui/core'
import './features.css'
import FeatureCard from '../../reuse/featurecard'
export default function Features() {
    return(
        <div>
            <Grid container spacing={2} className="featureGrid">
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <p id="featureHeader"> LEADING PLATFORM</p>
                    <p id="featureBlurb"> Quickly choose a personalzied plan online, and our friendly consultant
                    will get in touch with you.
                    </p>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Grid container spacing={2} id="subGrid">
                        <Grid item xs={12}>
                            <FeatureCard 
                            title="Sign up for an account" 
                            blurb="It's totally free, no strings attached!"></FeatureCard>
                        </Grid>
                        <Grid item xs={12}>
                            <FeatureCard 
                            title="Choose a plan" 
                            blurb="Choose from either the Bronze,Silver,Gold or Platinum plans. Each plan covers a specific need,
                            and they're customizable based on your needs"></FeatureCard>
                        </Grid>
                        <Grid item xs={12}>
                            <FeatureCard 
                            title="Customize your plan"
                            blurb="Selected a plan but doesn't exactly cover your needs? Don't worry, you can easily add on options
                            such as additional pax or more decor."></FeatureCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}