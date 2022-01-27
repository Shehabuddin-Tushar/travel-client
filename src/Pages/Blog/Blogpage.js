import { Container, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React,{useState} from 'react';

import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Header/Navbar'
import Blogsearch from './Blogsearch/Blogsearch';
import './Blogsearch/Blogsearch.css'

function Blogpage() {
    const [reviewnumber, setReviewnumber] = React.useState();
    const [ratingselect, setRatingselect] = useState(10);
    
    const handleChange = (e) => {
        setRatingselect(e.target.value)
    }
    
    return <div>
        <Navbar></Navbar>
        <div className="blogsearch-image">
            <Container style={{ top: "500px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", height: "150%", opacity: ".8" }}>
                <form>
                <InputLabel id="demo-simple-select-label" sx={{ marginTop: "20px" }}>Filter by Rating</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="rating"
                    value={reviewnumber}
                    label="Rating the product"
                    onChange={handleChange}
                    sx={{ width: "300px" }}
                    
                    >
                    <MenuItem value={10}>All star</MenuItem>
                    <MenuItem value={0}>zero star</MenuItem>
                    <MenuItem value={1}>one star</MenuItem>
                    <MenuItem value={2}>Two star</MenuItem>
                    <MenuItem value={3}>Three star</MenuItem>
                    <MenuItem value={4}>Four star</MenuItem>
                    <MenuItem value={5}>Five star</MenuItem>
                    </Select>
                </form>
            </Container>
        </div>
        <Grid container spacing={2}>
           <Container>
             <Blogsearch rating={ratingselect} ></Blogsearch>

            </Container>
        </Grid>
        <Footer></Footer>
  </div>;
}

export default Blogpage;
