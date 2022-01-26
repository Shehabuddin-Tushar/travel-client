import { Container, Grid } from '@mui/material';
import React from 'react';
import Blog from '../../Component/Blog/Blog';
import Sidebar from '../../Component/Sidebar/Sidebar';
import MySlider from '../../Component/Slider/MySlider';
import Navbar from '../../Shared/Header/Navbar';

function Home() {
    return (
        <div>
             <Navbar></Navbar> 
            <MySlider></MySlider>
          
             <Grid container spacing={2}>
                <Sidebar></Sidebar>
                <Blog></Blog>
                
                </Grid>
            
        </div>
    );
}

export default Home;
