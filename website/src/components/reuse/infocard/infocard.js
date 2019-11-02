import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
export default function InfoCard(props) {
    var cardStyle = {
        display: 'block',
    }
    return (
        <div>
            <Card style={cardStyle}>
                <CardContent>
                    <img 
                    width ="60"
                    height="60"
                    alt="Flexible" 
                    src={props.imagePath} />
                    <Typography 
                    variant="h5"
                    style={{textAlign:'center'}}>{props.title}</Typography>
                    <Typography varient="body2">{props.blurb}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}