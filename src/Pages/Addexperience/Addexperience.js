import { Grid } from '@mui/material';
import React from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Header/Navbar'
import Addexbanner from './Addexbanner/Addexbanner';
import Addexform from './Addexform/Addexform';
function Addexperience() {
    return (
        <div>
            <Navbar></Navbar>
            <Addexbanner></Addexbanner>
            <Grid container spacing={2}>
                <Sidebar></Sidebar>
                <Addexform></Addexform>
             

            </Grid>
            <Footer></Footer>
        </div>
    );
}

export default Addexperience;
