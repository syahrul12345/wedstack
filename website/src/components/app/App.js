// export default App;
import React from 'react';
import Header from  './header'
import MainBanner from './mainBanner'
import Testimonial from './testimonialBanner'
import Info from './infoBanner'
import Grid from '@material-ui/core/Grid';
import './App.css'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow:1
  }
}));

export default function App() {
  const classes = useStyles()
  return (
    <div className={classes.root} id="grad">
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
      </Grid>
    </div>
  )
};
  
  // <div id="grad" style={{width:'100%'}}>
  //   <Box display="flex" flexDirection="column">
  //     <Box>
  //       <Header></Header>
  //     </Box>
  //     <Box>
  //       <MainBanner></MainBanner>
  //     </Box>
  //   </Box>
  // </div>
