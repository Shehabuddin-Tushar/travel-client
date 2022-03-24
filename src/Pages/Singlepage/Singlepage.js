import { Container, Grid, Typography } from '@mui/material';
import React,{useState,useEffect} from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Header/Navbar'
import { useParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import './Singlepage.css'

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
                    
                    <Typography className="maintitle" variant='h2'>{ blog.title}</Typography> 
                </Container>
            </div>
            <Grid container spacing={2}>
                <Sidebar></Sidebar>
                <Grid item xs={8} style={{ margin: "0px 10px" }}>
                    <div>
                        <ul class="img-list" style={{ width: "100%" }}>

                            <li><img src={blog.image} width="100%" height="80%" style={{border:"2px solid gray"}} /></li>

                        </ul>
                    </div>
                    
                    
                    <Typography style={{marginBottom:"20px"}} variant="h4" className="titleinblog">TITLE:{blog.title}</Typography>
                    <Typography style={{ marginBottom: "20px" }} variant="h5" className="titleinblog">EXPENSE:{blog.expense} TK</Typography>
                    <Typography style={{ marginBottom: "20px" }} variant="h5" className="titleinblog">TRAVELER INFO: { blog.traveler}</Typography>
                    <Typography style={{ marginBottom: "20px" }} variant="h5" className="titleinblog">TRAVEL LOCATION: { blog.location}</Typography>
                    <Typography style={{ marginBottom: "20px" }} variant="h5" className="titleinblog">
                        
                       Blog rating: {blog.ratings} rating
                    </Typography>
                    <Typography style={{ marginBottom: "20px",fontSize:"25px",fontWeight:"bold" }} className="titleinblog">TRAVEL DESCRIPTION: <span className="textDesign">{blog.description}</span></Typography>
                </Grid>


            </Grid>
            <Footer></Footer>
            
        </div>
    );
}

export default Singlepage;

