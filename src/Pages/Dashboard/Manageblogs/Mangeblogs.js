import { Button, Grid, InputLabel, MenuItem, Modal, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Manageblogs() {
    const [blog, setBlog] = useState({})
    const [editBlog, seteditBlog] = useState({})
    const [allblogs, setAllblogs] = useState([]);
    const { user } = useAuth();
    const [reviewnumber, setReviewnumber] = React.useState();
    const [hotelcategory, setHotelcategory] = React.useState();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();


    useEffect(() => {

        axios.get(`https://morning-coast-07202.herokuapp.com/allblogs`).then(res => setAllblogs(res.data)).catch(err => console.log(err))

    }, [allblogs])



    const changestatus = (id) => {
        const confirmchange = window.confirm("Are you sure you want to change status?");
        if (confirmchange) {

            axios.put(`https://morning-coast-07202.herokuapp.com/changestatus/${id}`).then(res => {

                toast.success(res.data)
            }).catch(err => console.log(err))
        }
    }

    const deleteblog = (id) => {
        const confirmchange = window.confirm("Are you sure you want to delete this blog?");
        if (confirmchange) {

            axios.delete(`https://morning-coast-07202.herokuapp.com/deleteblog/${id}`).then(res => {

                toast.success(res.data)
            }).catch(err => console.log(err))
        }
    }
    const viewblog = (id) => {
        console.log(id)
        axios.get(`https://morning-coast-07202.herokuapp.com/singleblog/${id}`).then((res) => setBlog(res.data)).catch(err => console.log(err))
        handleOpen()
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow: 'scroll',
        height: '100%',
        display: 'block'
    };
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const [editopen, setEditopen] = React.useState(false);
    const handleeditOpen = () => setEditopen(true);
    const handleeditClose = () => setEditopen(false);

    const editblog = (id) => {
        axios.get(`https://morning-coast-07202.herokuapp.com/singleblog/${id}`).then((res) => seteditBlog(res.data)).catch(err => console.log(err))
        handleeditOpen()
    }

    const onSubmit = async (data) =>console.log(data)
    return (
        <Box>
            <title>Manage orders</title>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" sx={{ mb: 2 }}>Manage all blogs</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>title</StyledTableCell>
                                    <StyledTableCell align="right">Expense</StyledTableCell>
                                    <StyledTableCell align="right">location</StyledTableCell>
                                    
                                    <StyledTableCell align="center">status</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <ToastContainer />
                                {
                                    allblogs.map((blog) => {
                                        return (
                                            <StyledTableRow key={blog._id}>
                                                <StyledTableCell component="th" scope="row">{blog.title}</StyledTableCell>
                                                <StyledTableCell align="right">{blog.expense} tk</StyledTableCell>
                                                <StyledTableCell align="right">{blog.location}</StyledTableCell>
                                                
                                                <StyledTableCell align="center">
                                                    
                                                    {
                                                        blog.status === "pending" ? <Button onClick={() => changestatus(blog._id)} variant="contained">{blog.status}</Button> : <Button disabled variant="contained">{blog.status}</Button>
                                                    }
                                                        
                                                    
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Button onClick={() => viewblog(blog._id)} variant="contained">view</Button>&nbsp;
                                                    <Button onClick={() => deleteblog(blog._id)} variant="contained">delete</Button>&nbsp;
                                                    <Button onClick={() => editblog(blog._id)} variant="contained">edit</Button>
                                                    
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        )

                                    })
                                }


                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>
            {
                blog &&
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <img src={blog.image} width="100%" />
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                           Title:{blog.title}
                            </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                               Expense:{blog.expense}tk
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Date:{blog.date}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                category:{blog.category}
                            </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                Location:{blog.location}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                           {blog.description}
                        </Typography>
                    </Box>
                </Modal>
            }


            {
                editBlog &&
                <Modal
                    open={editopen}
                    onClose={handleeditClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                        <Box sx={style}>
                            
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <ToastContainer />


                                <TextField id="standard-basic" defaultValue={editBlog.title}{...register("title", { required: true })} style={{ width: "80%", height: "100px" }} label="Blog title" variant="standard" />
                                <Typography sx={{ color: "red" }}>{errors.title && <span>title is required</span>}</Typography>

                                <TextField id="standard-basic" defaultValue={ editBlog.expense}{...register("expense", { required: true })} style={{ width: "80%", height: "100px" }} label="expense" variant="standard" />
                                <Typography sx={{ color: "red" }}>{errors.expense && <span>expense is required</span>}</Typography>

                                <TextField id="standard-basic"{...register("travelerinfo", { required: true })} style={{ width: "80%", height: "100px" }} label="Traveler information" variant="standard" />
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
                            
                    </Box>
                </Modal>
            }
            
        </Box>
    )
}

export default Manageblogs;

