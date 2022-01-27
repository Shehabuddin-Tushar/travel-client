import { Container, Grid } from '@mui/material';
import React from 'react';
import Blog from '../../Component/Blog/Blog';
import Sidebar from '../../Component/Sidebar/Sidebar';
import MySlider from '../../Component/Slider/MySlider';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Header/Navbar';

function Home() {
    return (
        <div>
            <Navbar></Navbar> 
            <MySlider></MySlider>
          
             <Grid container spacing={2}>
                <Sidebar></Sidebar>
                <Blog column={8.5}></Blog>
                
            </Grid>
            <Footer></Footer>
            
        </div>
    );
}

export default Home;
