// export default App;
import React from 'react';
import Header from  './header'
import MainBanner from './mainBanner'
import Testimonial from './testimonialBanner'
import Info from './infoBanner'
import Features from './featuresBanner'
import Plan from './planBanner'
import Grid from '@material-ui/core/Grid';
import './App.css'
import { makeStyles } from '@material-ui/styles';
import {Helmet} from "react-helmet";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow:1
  }
}));

export default function App() {
  const classes = useStyles()
  return (
    <div className={classes.root} id="grad">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Wedstack - Revolutionary Weddings</title>
          <link rel="canonical" href="https://wedstack.io" />
      </Helmet>
      <Grid container spacing={1}>
        <Grid item xs={12} m={12} l={12}>
          <Header></Header>
        </Grid>
        <Grid item xs={12} m={12} l={12} >
          <MainBanner></MainBanner>
        </Grid>
        <Grid item xs={12} m={12} l={12}>
         <Testimonial></Testimonial>
        </Grid>
        <Grid item xs={12} m={12} l={12}>
         <Info></Info>
        </Grid>
        <Grid item xs={12} m={12} l={12}>
          <Features></Features>
        </Grid>
        <Grid item xs={12} m={12} l={12}>
          <Plan></Plan>
        </Grid>
      </Grid>
    </div>
  )
};
  
