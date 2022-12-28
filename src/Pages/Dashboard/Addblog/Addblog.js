import { Button, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addblog() {
    const [reviewnumber, setReviewnumber] = React.useState();
    const [hotelcategory, setHotelcategory] = React.useState();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = async (data) => {
        ///////////////////////////////

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
            status: "approved"

        };

        axios.post(`https://travel-server-ckcf.onrender.com/addexperience`, blogData)
            .then(res => {
                console.log(res)
                if (res.data.insertedId) {
                    toast.success("blog add successfully");
                    return
                } else {
                    toast.error("please change your title")
                }

            })
            .catch(err => console.log(err))
        reset();

        /////////////////////
    };
    return (

        <Grid item md={8} style={{ margin: "0px 10px" }}>
            <Grid container spacing={2}>
                <Grid item lg={10} md={10} sm={10} xs={10} className="expform">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <ToastContainer />


                        <TextField id="standard-basic" {...register("title", { required: true })} style={{ width: "80%", height: "100px" }} label="Blog title" variant="standard" />
                        <Typography sx={{ color: "red" }}>{errors.title && <span>title is required</span>}</Typography>

                        <TextField id="standard-basic" {...register("expense", { required: true })} style={{ width: "80%", height: "100px" }} label="expense" variant="standard" />
                        <Typography sx={{ color: "red" }}>{errors.expense && <span>expense is required</span>}</Typography>

                        <TextField id="standard-basic" {...register("travelerinfo", { required: true })} style={{ width: "80%", height: "100px" }} label="Traveler information" variant="standard" />
                        <Typography sx={{ color: "red" }}>{errors.travelerinfo && <span>traveler information is required</span>}</Typography>

                        <TextField id="standard-basic" {...register("location", { required: true })} style={{ width: "80%", height: "100px" }} label="travel location" variant="standard" />
                        <Typography sx={{ color: "red" }}>{errors.location && <span>travel location is required</span>}</Typography>

                        <InputLabel id="demo-simple-select-label2" sx={{ marginTop: "20px" }}>hotel category</InputLabel>
                        <Select
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

                        <TextField type="text" {...register("date", { required: true })} label="example (10oct - 15oct 22)" style={{ width: "80%", height: "70px" }} id="standard-basic" variant="standard" />
                        <Typography sx={{ color: "red" }}>{errors.date && <span>date is required</span>}</Typography>
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
                        <input id="contained-button-file" type="file" {...register("image", { required: true })} />
                        <Typography sx={{ color: "red" }}>{errors.image && <span>image is required</span>}</Typography>
                        <TextareaAutosize
                            maxRows={4}
                            aria-label="maximum height"
                            placeholder="Maximum 4 rows"
                            {...register("description", { required: true })}
                            style={{ width: "100%", height: "200px", marginTop: "20px" }}
                        />
                        <Typography sx={{ color: "red" }}>{errors.description && <span>description is required</span>}</Typography>

                        <Button type="submit" variant="contained" style={{ marginTop: "30px", width: "100%", marginBottom: "20px" }}>Add Experience</Button>

                    </form>
                </Grid>
            </Grid>
        </Grid>

    );
}

export default Addblog;
