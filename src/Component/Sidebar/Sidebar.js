import React,{useEffect, useState} from 'react'
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Sidebar() {
    let i=0
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [allBlogs, setAllblogs] = useState([]);
    

    useEffect(() => {
        axios.get("https://morning-coast-07202.herokuapp.com/blogs").then((res) => setAllblogs(res.data)).catch(err => console.log(err))
    }, [])
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <Grid item md={3} sm={12} xs={12}>
            
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    allBlogs
                        .map((blog) => {
                            return (
                                <>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                            <Link to={`/singlepage/${blog._id}`}><img src={blog.image} height="60px" width="100px" style={{ border: "1px solid red", borderRadius: "5px", marginRight: "5px" }} /></Link>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Brunch this weekend?"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Ali Connors
                                                </Typography>
                                                {" — I'll be in your neighborhood doing errands this…"}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                  <Divider variant="inset" component="li" />
                                </>
                            )
                        })
                }
               
             </List>
         </Grid>
               
    );
}

export default Sidebar;
