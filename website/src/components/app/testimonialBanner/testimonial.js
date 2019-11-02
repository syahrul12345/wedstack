import React from 'react'
import Grid from '@material-ui/core/Grid';
import TestimonialCard from '../../reuse/testimonialcard'
import './testimonial.css'
class Testimonial extends React.Component {
    render(){
        const clients = [
            {name:'Azhar',review:'Good service'},
            {name:'Sheizal',review:'OK service'},
            {name:'Hairi',review:'Not bad service'},
            {name:'Hakim',review:'Amazing service'},
        ]
        return(
            <Grid container spacing={2} className = "testimonialGrid">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <p className="testimonialHeader">Read from our happy customers: </p>
                </Grid>
                {clients.map((client) => (
                    <Grid item xs={6} sm={6} md={3} lg={3} key={client.name}>
                        <TestimonialCard clientName={client.name} review={client.review}/>
                    </Grid>
                ))}
            </Grid>
        )
    }
    
}
export default Testimonial