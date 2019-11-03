import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './plancard.css'

export default function PlanCard(props) {
    return (
        <div>
            <Card>
                <CardContent>
                    <img 
                    width ="60"
                    height="60"
                    alt={props.imagePath} 
                    src={props.imagePath} />
                    <p id ="planCardName"> {props.planName}</p>
                    <p id ="planCardBlurb"> {props.planBlurb}</p>
                </CardContent>
            </Card>
        </div>

    )
}