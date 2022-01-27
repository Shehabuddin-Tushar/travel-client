import { Box, Container, Grid, Typography } from '@mui/material';

import React from 'react';
import './Addexbanner.css'
function Addexbanner() {
  
    return (
        <div className="addexbanner-image">
            <Container style={{ top:"500px",display: "flex", justifyContent: "center", alignItems:"center", backgroundColor:"white",height:"150%",opacity:".5"}}>
            
                        <Typography variant="h2" textAlign="center">Add your experience</Typography>
            </Container>
         </div>
  );
}

export default Addexbanner;
