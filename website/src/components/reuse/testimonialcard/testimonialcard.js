import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

export default function TestimonialCard(props) {
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h5">{props.clientName}</Typography>
                    <Typography varient="body2">{props.review}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}