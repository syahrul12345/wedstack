import React from 'react'
import Grid from '@material-ui/core/Grid';
import InfoCard from '../../reuse/infocard'
import './info.css'
export default function Info() {
    return(
        <div>
           <Grid container spacing={2} className="infoGrid">
               <Grid item xs={12}>
                   <p id="infoHeader">Revolutionary format for weddings</p>
                   <p id="infoBlurb">
                       Simply choose, configure, pay and turn up for your wedding
                   </p>
               </Grid>
               <Grid item xs={12}>
               <Grid container spacing={2} align="center">
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <InfoCard
                        imagePath="/images/key.png" 
                        title="Accessible"
                        blurb="We have plans available for everyone, to those who instead prefer
                        spending on their honeymoon and those who splurge."/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <InfoCard
                        imagePath="/images/transparency.png"
                        title="Transparent"
                        blurb="What you see in your online dahsboard is what you will get. Easily see how much is due to be paid, and what are you entitled to for your plan."/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <InfoCard
                        imagePath="/images/dancer-pose.png"
                        title="Flexible"
                        blurb="Have a ceremony that doesn't fit the criteria of our ready made plans? Easily add on customizable options for a small fee."/>
                    </Grid>
                    </Grid>
                </Grid>
           </Grid>
        </div>
    )
}