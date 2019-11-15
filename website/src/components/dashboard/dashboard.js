import React, { useState } from 'react'
import {Grid,Card,Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {Helmet} from "react-helmet";
import './dashboard.css'
const useStyles = makeStyles({
    avatar: {
        margin:10,
        width:80,
        height:80,
    }
})
export default function Dashboard() {
    const classes = useStyles()
    const [values,setValues] = useState({
        name:'',
        email:'',
        address:'',
        tier:'',
    })

    
    return(
        <div id="grad">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard</title>
                <link rel="canonical" href="https://wedstack.io/dashboard" />
            </Helmet>
            <Grid 
            justify="center"
            contianer
            style={{minHeight:'100vh'}}
            >
               <Grid item xs={12} id="dashboardGrid">
                    <Card>
                        <Grid 
                        justify="center"
                        alignItems="center"
                        container>
                            <Grid 
                            item 
                            md={4}
                            style={{borderRight:'1px solid grey'}} 
                            id="profileColumn">
                                <Grid
                                container
                                alignItems="center"
                                style={{paddingLeft:'10px'}}
                                >
                                  <Grid item xs={12}>
                                    <p> 13 OCTOBER 2019</p>
                                  </Grid>
                                  <Grid item xs={12}>
                                  <Avatar className={classes.avatar}></Avatar>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <p> SINGAPORE </p>
                                    <p> SYAHRUL NIZAM </p>
                                    <p> SYAHRUL@WEDSTACK.IO</p>
                                    <p> Blk 437 Woodlands Street 41 #02-370</p>
                                    <p> Tier: GOLD <a href="https://google.com"> Change</a></p>
                                  </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={8} id="weddingColumn">
                                <p> Your data</p>
                            </Grid>
                        </Grid>
                    </Card>
               </Grid>
            </Grid>
        </div>
    )
}