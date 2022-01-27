import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import StarIcon from '@mui/icons-material/Star';

import axios from 'axios';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({

    cardbottom: {
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid #CFD8DC"
    },

    coursetitle: {
        textShadow: "1px 2px #cfd8dc",

    },
    borderstyle: {
        border: "3px solid #29b6f6",
        marginBottom: "10px",
        width: "30px"
    },
    calendartime: {
        display: "flex",
        alignItems: "center"
    },
    calendaricon: {
        fontSize: "15px",
        marginRight: "10px"
    }

}))
function Blogsearch(props) {
    const classes = useStyles();

    const [allBlogs, setAllblogs] = useState([]);
    console.log(props.rating)
    useEffect(() => {
        axios.get(`https://morning-coast-07202.herokuapp.com/blogs/${props.rating}`).then((res) => setAllblogs(res.data)).catch(err => console.log(err))
    }, [props.rating])
    return (
        <Grid item md={12} style={{ margin: "0px 10px" }}>
            <div style={{ margin: "20px 5px", textAlign: "center" }}>
                <Typography variant='h4' textAlign="center">Dream Your Next Trip</Typography>
                <Typography variant='h6' textAlign="center" style={{ letterSpacing: "3px", color: "gray", marginBottom: "10px" }}>Weekend getaways from Dhaka City.Where to next?</Typography>
                <Typography>==========================</Typography>
            </div>

            <Grid container spacing={2}>

                {
                    allBlogs
                        .map((blog) => {
                            return (
                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                    <Card className="myblogcard">
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={blog.image}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" className={classes.coursetitle}>
                                                {blog.title}
                                            </Typography>
                                            <Typography className={classes.borderstyle}></Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" className={classes.calendartime}>
                                                <CalendarTodayIcon className={classes.calendaricon} /> <Typography>{blog.date}</Typography>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" className={classes.calendartime}>
                                                <Typography>{blog.description.slice(0, 70)}.</Typography>
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.cardbottom}>
                                            <Button size="small" color="primary">
                                                {
                                                    [...Array(parseInt(blog.ratings)).keys()]
                                                        .map(() => {
                                                            return <StarIcon sx={{ color: "goldenrod" }} />
                                                        })
                                                }
                                            </Button>
                                            <Button size="small" color="primary">
                                                <Link to={`/singlepage/${blog._id}`}>Details</Link>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}




            </Grid>
        </Grid>
    );
}

export default Blogsearch;
