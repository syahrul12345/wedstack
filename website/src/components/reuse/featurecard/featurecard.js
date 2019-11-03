import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './featurecard.css'
export default function FeatureCard(props) {
    var cardStyle = {
        display: 'block',
    }
    return(
        <div>
            <Card style={cardStyle}>
                <CardContent>
                    <p id="featureCardTitle">{props.title}</p>
                    <p id="featureCardBlurb">{props.blurb}</p>
                </CardContent>
            </Card>
        </div>
    )
}