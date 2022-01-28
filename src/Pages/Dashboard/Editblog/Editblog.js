import { Button, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Editblog() {
    const { id } = useParams();
    const [reviewnumber, setReviewnumber] = React.useState();
    const [hotelcategory, setHotelcategory] = React.useState();
   
   
    const [editBlog, seteditBlog] = useState({});
  
    useEffect(async() => {
        let result = await axios.get(`https://morning-coast-07202.herokuapp.com/singleblog/${id}`);
        let finalresult = await result.data;
        seteditBlog(finalresult);
        
        
    },[])
    console.log(id)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    
   
    const onSubmit = async (data) => {
     

        console.log(typeof (data.rating))
        let imageURL
        const imageData = new FormData();
        imageData.set("key", "06a916692ea087d185221539196ef3a5");
        imageData.append("image", data.image[0]);
        try {
            const res = await axios.post(
                "https://api.imgbb.com/1/upload",
                imageData
            );
            imageURL = res.data.data.display_url;
        } catch (error) {

            return alert("Failed to upload the image!");
        }


        const blogData = {
            image: imageURL,
            title: data.title,
            expense: data.expense,
            traveler: data.travelerinfo,
            location: data.location,
            category: data.category,
            date: data.date,
            description: data.description,
            ratings: data.rating,
            status: "pending"

        };
       

        axios.put(`https://morning-coast-07202.herokuapp.com/updateblog/${id}`, blogData)
            .then(res => {
                if (res.data === false) {
                    toast.error("Please again write all the field minimum one letter if you edit this blog")
                } else {
                    toast.success(res.data)
                }
                    
              })
            .catch(err => console.log(err))
        reset();

        
    };
    
    return (
        <Grid item md={8} style={{ margin: "0px 10px" }}>
            <Grid container spacing={2}>
                <Grid item lg={10} md={10} sm={10} xs={10} className="expform">
                    <Typography variant="h4" style={{ marginBottom: "10px" }}>Edit Blog</Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <ToastContainer />
                    <input id="standard-basic" placeholder="title" defaultValue={editBlog?.title} {...register("title")} required style={{ width: "80%", height: "50px",marginBottom:"10px",fontSize:"18px" }} label="Blog title" variant="standard" />
                    <input defaultValue={editBlog.expense} placeholder='expense' id="standard-basic" {...register("expense")} required style={{ width: "80%", height: "50px", marginBottom: "10px", fontSize: "18px"}} label="expense" variant="standard" />
                    <input defaultValue={editBlog.traveler} placeholder='traveler info' id="standard-basic" {...register("travelerinfo")} required style={{ width: "80%", height: "50px", marginBottom: "10px", fontSize: "18px"}} label="Traveler information" variant="standard" />
                    <input defaultValue={editBlog.location} id="standard-basic" placeholder='location' {...register("location")} required style={{ width: "80%", height: "50px", marginBottom: "10px", fontSize: "18px"}} label="travel location" variant="standard" />
                    <InputLabel id="demo-simple-select-label2" sx={{ marginTop: "20px" }}>hotel category</InputLabel>
                    <Select
                            defaultValue={editBlog.category}
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select"
                            {...register("category", { required: true })}
                            value={hotelcategory}
                            label="Hotel category"
                            // onChange={handleChange}
                            sx={{ width: "300px" }}
                         >
                          <MenuItem value="three star hotel">Three star hotel</MenuItem>
                          <MenuItem value="four star hotel">Four star hotel</MenuItem>
                          <MenuItem value="five star hotel">Five star hotel</MenuItem>
                    </Select>
                    <Typography sx={{ color: "red" }}>{errors.category && <span>rating is required</span>}</Typography>

                    <input type="text" defaultValue={editBlog.date} placeholder='date(ex:12oct-16oct 22)' {...register("date")} required label="example (10oct - 15oct 22)" style={{ width: "80%", height: "50px", marginBottom: "10px", marginTop: "10px", fontSize: "18px"}} id="standard-basic" variant="standard" />
                    <InputLabel id="demo-simple-select-label" sx={{ marginTop: "20px" }}>Rating the experience</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...register("rating", { required: true })}
                        value={reviewnumber}
                        label="Rating the product"
                        // onChange={handleChange}
                        sx={{ width: "300px" }}
                       >
                            <MenuItem value={0}>zero star</MenuItem>
                            <MenuItem value={1}>one star</MenuItem>
                            <MenuItem value={2}>Two star</MenuItem>
                            <MenuItem value={3}>Three star</MenuItem>
                            <MenuItem value={4}>Four star</MenuItem>
                            <MenuItem value={5}>Five star</MenuItem>
                     </Select>
                     <Typography sx={{ color: "red" }}>{errors.rating && <span>rating is required</span>}</Typography>
                     <br></br><br></br>
                     <img src={editBlog.image} width="200px"/><br/>
                     <input id="contained-button-file" type="file" {...register("image", { required: true })} />
                     <Typography sx={{ color: "red" }}>{errors.image && <span>image is required</span>}</Typography>
                     <textarea
                        required
                        defaultValue={editBlog.description}
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        {...register("description")}
                        style={{ width: "100%", height: "150px", marginTop: "20px", fontSize: "16px"}}
                     />
                     <Button type="submit" variant="contained" style={{ marginTop: "30px", width: "100%", marginBottom: "20px" }}>update blog</Button>
                 </form>
                </Grid>
            </Grid>
        </Grid> 
    );
}

export default Editblog;
