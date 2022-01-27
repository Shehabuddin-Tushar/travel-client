import { Button, Grid, Modal, Typography } from '@mui/material'
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
    const [blog,setBlog]=useState({})
    const [allblogs, setAllblogs] = useState([]);
    const { user } = useAuth();


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
    };
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                                                    <Button onClick={() => changestatus(blog._id)} variant="contained">edit</Button>&nbsp;
                                                    <Button onClick={() => deleteblog(blog._id)} variant="contained">delete</Button>&nbsp;
                                                    <Button onClick={() => viewblog(blog._id)} variant="contained">view</Button>
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
                                Location:{blog.location}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                           {blog.description}
                        </Typography>
                    </Box>
                </Modal>
            }
            
        </Box>
    )
}

export default Manageblogs;

