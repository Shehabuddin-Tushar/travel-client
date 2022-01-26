import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link,useHistory,useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import Navbar from '../../Shared/Header/Navbar'
import CircularProgress from '@mui/material/CircularProgress';
import './Registration.css'
function Registration() {

    const {handlechangeuservalues,createUser,error,success,isloading,user,setError}=useAuth();
    const history=useHistory();
    const location=useLocation();

    const gotologinpage=()=>{
        setError("");
        history.push("/login")
    }
    return (
        <>
        <title>Registration</title>
         <Navbar/>
        <Box className="registrationimage">
           
            <Container sx={{}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{mt:10,ml:1}} className="loginform">
                    
                  {!isloading && <form onSubmit={createUser}>
                       <Typography variant="h4" style={{textAlign:"center",marginBottom:"30px"}}>Registration form</Typography>
                        {error && <Typography sx={{color:"red"}}>{error}</Typography>}   
                        {success && <Typography sx={{color:"green"}}>{success}</Typography>}
                        
                       <TextField onChange={handlechangeuservalues} name="displayname" id="standard-basic" sx={{display:"block"}} label="Username" variant="standard" />

                       <TextField onChange={handlechangeuservalues} name="email" type="email" id="standard-basic"  sx={{display:"block"}}  label="Email" variant="standard" />
                       <TextField onChange={handlechangeuservalues} name="password" type="password" id="standard-basic"  sx={{display:"block"}}  label="Password" variant="standard" />
                       <TextField onChange={handlechangeuservalues} name="confirmpassword" type="password" id="standard-basic"  sx={{display:"block"}}  label="Confirm Password" variant="standard" />
                       
                       <Button type="submit" variant="contained" style={{marginTop:"30px",width:"100%",marginBottom:"20px"}}>Registration</Button>
                       <Button onClick={gotologinpage} style={{width:"50%"}} variant="contained">Already registered</Button>
                       
                    </form>} 
                    {
                        isloading && <CircularProgress />
                    }
                    
                </Grid>
 
              </Grid>
            </Container>
            
        </Box>
        
        </>
    )
}

export default Registration
