import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});
function Blog() {
    const classes = useStyles();
    return (
        <Grid item md={8.5} style={{margin:"0px 10px"}}>
            <div style={{margin:"20px 5px",textAlign:"center"}}>
                <Typography variant='h4' textAlign="center">Dream Your Next Trip</Typography>
                <Typography variant='h6' textAlign="center" style={{ letterSpacing: "3px", color: "gray",marginBottom:"10px"}}>Weekend getaways from Dhaka City.Where to next?</Typography>
                <Typography>==========================</Typography>
            </div>
            
            <Grid container spacing={2}>
                 
                {
                    [...Array(10).keys()]
                        .map(() => {
                            return (
                                <Grid item lg={4}md={6} sm={6} xs={12}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://i.postimg.cc/VLBNFG5t/registrationimage.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Share</Button>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
               
                
            
                
           </Grid>
        </Grid>
         );
}

export default Blog;
