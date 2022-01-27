import { Container, Grid, Typography } from '@mui/material';
import React,{useState,useEffect} from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Header/Navbar'
import { useParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

function Singlepage() {
    const [blog, setBlog] = useState({});
    const {id }= useParams();
    console.log(id)
    useEffect(() => {
        axios.get(`https://morning-coast-07202.herokuapp.com/singleblog/${id}`).then((res) =>setBlog(res.data)).catch(err => console.log(err))
    }, [id])
    return (
        <div>
            <Navbar></Navbar>
            <div className="blogsearch-image">
                <Container style={{ top: "500px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", height: "150%", opacity: ".8" }}>
                    
                    <Typography variant='h3'>{ blog.title}</Typography> 
                </Container>
            </div>
            <Grid container spacing={2}>
                <Sidebar></Sidebar>
                <Grid item xs={8} style={{ margin: "0px 10px" }}>
                    <img src={blog.image} width="80%" style={{border:"10px solid gray",borderRadius:"20px",marginBottom:"10px"}}/>
                    <Typography variant="h4">TITLE:{blog.title}</Typography>
                    <Typography variant="h5">EXPENSE:{blog.expense} TK</Typography>
                    <Typography variant="h5">TRAVELER INFO: { blog.traveler}</Typography>
                    <Typography variant="h5">TRAVEL LOCATION: { blog.location}</Typography>
                    <Typography variant="h5">
                        
                       Blog rating: {blog.ratings} rating
                    </Typography>
                    <Typography>TRAVEL DESCRIPTION: { blog.description}</Typography>
                </Grid>


            </Grid>
            <Footer></Footer>
            
        </div>
    );
}

export default Singlepage;

