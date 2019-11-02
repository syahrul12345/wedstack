import React,{useState} from 'react';
import {
        Drawer,
        Toolbar,
        Typography,
        IconButton,
        List,
        ListItem,
        ListItemIcon,
        ListItemText
} from '@material-ui/core';
import {DragHandle,MoveToInbox } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import './Header.css'

const useStyles = makeStyles({
    list: {
        width:'auto',
    }
})

export default function Header() {
    const classes = useStyles();
    const [drawerAppear,updateDrawerAppear] = useState(false)
    const toggleDrawer = () => {
        updateDrawerAppear(!drawerAppear)
    }
    const listItem = (name) => (
        <ListItem button>
            <ListItemIcon>
                <MoveToInbox />
            </ListItemIcon>
            <ListItemText>
               {name}
            </ListItemText>
        </ListItem>
    );

    const sideList = () => (
        <div
        className={classes.list}
        role="presentation"
        >   
            <List>
               {listItem("Home")}
               {listItem("About")}
               {listItem("Gallery")}
               {listItem("Pricing")}
               {listItem("Team")}
               {listItem("Contact")}
            </List>
        </div>
    )
    return (
        <div id="navBar">
            <Toolbar>
            <Typography 
                variant="h6">
                Wedstack
            </Typography>
            <IconButton
                onClick={toggleDrawer}
                edge='end'
                style={{position:"absolute",right:10}}
            >
             <DragHandle/>
             <Drawer anchor="right" open= {drawerAppear} >
                 {sideList()}
            </Drawer>
            </IconButton>
            </Toolbar>
        </div>
        
    );
}
