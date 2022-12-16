import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
function Makeadmin() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = data => {
        const confirmchange = window.confirm("Are you sure you want Make admin this email");
        if (confirmchange) {

            axios.put(`https://travel-server-five.vercel.app/makeadmin/${data.email}`).then(res => {
                if (res.data === false) {
                    toast.error("This email is not valid")
                } else {
                    toast.success(res.data)
                }
                reset()

            }).catch(err => console.log(err))
        }

    }
    return (


        <Box>
            <title>Make admin</title>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} className="adminmakeform">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ToastContainer />
                        <Typography variant="h4" style={{ textAlign: "center", marginBottom: "30px" }}>Make admin</Typography>


                        <TextField type="email"   {...register("email", { required: true })} id="standard-basic" style={{ width: "100%" }} label="Enter Email" variant="standard" />
                        <Typography sx={{ color: "red" }}>{errors.email && <span>email is required</span>}</Typography>


                        <Button type="submit" variant="contained" style={{ marginTop: "30px", width: "100%", marginBottom: "20px" }}>Make Admin</Button>

                    </form>

                </Grid>

            </Grid>
        </Box>
    )
}

export default Makeadmin
