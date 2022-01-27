import { Box, Button, Container, Grid, Typography } from '@mui/material';

import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

import './Footer.css'
function Footer() {

    const { user, Logout } = useAuth();
    return (
        <Box className="footer-wrapper" sx={{ bgcolor:"#2a72d8",padding:"50px 0px",marginTop:"50px"}}>
            
            <Container>

               <Grid container spacing={2}>
               
                    <Grid item xs={12} sm={6} md={3} className="links">
                      <Typography variant="h3" sx={{color:"#fff",fontSize:"30px",mb:3}}>Quick link</Typography>
                        <ul>
                            <li><Link exact to="/"><i class="fas fa-angle-double-right"></i> Home</Link></li>
                            <li><Link to="/blog"><i class="fas fa-angle-double-right"></i> Blog</Link></li>
                            {
                                user.email &&
                                <>
                                    
                                    <li><Link to="/addexperience"><i class="fas fa-angle-double-right"></i> Add your experience</Link></li>
                                    <li><Button onClick={Logout} style={{ marginLeft: "-10px" }}><Link><i class="fas fa-angle-double-right"></i> Logout</Link></Button></li>
                                </>
                            }
                            
                            {
                                !user.email &&
                                <li><Link to="/login"><i class="fas fa-angle-double-right"></i> Login</Link></li>
                            }
                            
                            
                         </ul> 
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Box className="contactus">
                            <Typography variant="h3" sx={{ color: "#fff", fontSize: "30px",mb: 3 }}>Contact us</Typography>
                            <Typography sx={{ color: "#fff" }}><Link to="/home"><i class="fas fa-phone-alt"></i> 01405130409</Link></Typography>
                            <Typography sx={{ my: 3 }}>Matuail-jatrabari-1362</Typography>
                            <Typography sx={{ mb: 3 }}>travel&destination@gmail.com</Typography>
                            <Box className="social-link">
                                <a href="//twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
                                <a href="//www.facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a>
                                <a href="//www.youtube.com/" target="_blank"><i class="fab fa-youtube"></i></a>

                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>

                        <Box className="hotblog">
                            <Typography variant="h3" sx={{ color: "#fff", fontSize: "30px", textAlign: "center", mb: 3 }}>Our Gellery</Typography>
                            <Box>
                                <img src="https://i.postimg.cc/YCDQh1Yh/blogimage2.jpg"></img>
                                <img src="https://i.postimg.cc/6ppdWH7k/blogimage1.jpg"></img>
                                <img src="https://i.postimg.cc/YCDQh1Yh/blogimage2.jpg"></img>
                                <img src="https://i.postimg.cc/FsZyQtKb/blogimage3.jpg"></img>
                                <img src="https://i.postimg.cc/YCDQh1Yh/blogimage2.jpg"></img>
                            </Box>
                            <Box>
                                <img src="https://i.postimg.cc/YCDQh1Yh/blogimage2.jpg"></img>
                                <img src="https://i.postimg.cc/YCDQh1Yh/blogimage2.jpg"></img>
                                <img src="https://i.postimg.cc/6ppdWH7k/blogimage1.jpg"></img>
                                <img src="https://i.postimg.cc/FsZyQtKb/blogimage3.jpg"></img>
                                <img src="https://i.postimg.cc/YCDQh1Yh/blogimage2.jpg"></img>
                            </Box>
                            <Box>
                                <img src="https://i.postimg.cc/YCDQh1Yh/blogimage2.jpg"></img>
                                <img src="https://i.postimg.cc/YCDQh1Yh/blogimage2.jpg"></img>
                                <img src="https://i.postimg.cc/YCDQh1Yh/blogimage2.jpg"></img>
                                <img src="https://i.postimg.cc/6ppdWH7k/blogimage1.jpg"></img>
                                <img src="https://i.postimg.cc/FsZyQtKb/blogimage3.jpg"></img>
                            </Box>
                        </Box>

                    </Grid>
                    
                    
                   
                </Grid>
               </Container>
                   
              
               
                    
             
                
               
          
            
            
        </Box>
    )
}

export default Footer

