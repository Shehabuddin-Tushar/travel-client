import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link,useHistory,useLocation} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import Navbar from '../../Shared/Header/Navbar'
import './Login.css'
function Login() {

  const {Logout,user,signupWithgoogleLogin,setUservalues,handleloginchange,singinLogin,error,setError,loginuser,setIsloading}=useAuth();
  let location=useLocation();
  const redirect_url=location.state?.from || "/";
  console.log(redirect_url)
  const history=useHistory();
  /**google login */
  const handlegooglelogin = () => {
    signupWithgoogleLogin().then((result) => {

      history.push(redirect_url);
      console.log(result.user)

    }).finally(() => { setIsloading(false) })
  }





  /*its email password login */
  const handleemailpasswordlogin=(e)=>{
    e.preventDefault();
    
    if(loginuser.email===""){
       setError("your field is empty");
       
       return  
    }
    if(loginuser.password.length<6){
      setError("your password is less then 6 characters");
      
      return
    }
      setIsloading(true)
        singinLogin()
        .then((result) => {
           
           console.log(result.user.email)
           if(result.user.email){
            setError("");
            setUservalues({});
            history.push(redirect_url);
            window.location.reload();
            
           }
           
          
        
      }).catch((error) => {
          setError(error.message);
         
        }).finally(()=>setIsloading(false));
  }

  const gotoregisterpage=()=>{
    setError("");
    history.push("/registration")
  }
     
     
    return (
        <>
        <title>Login</title>
         <Navbar/>
          <Box className="loginbackground">
           
            <Container sx={{mb:5}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{mt:20,ml:1}} className="loginform">
                  <form onSubmit={handleemailpasswordlogin}>
                       
                       <Typography variant="h4" style={{textAlign:"center",marginBottom:"30px"}}>Login form</Typography>
                       <Typography sx={{color:"red"}}>{error}</Typography>
                       <TextField onChange={handleloginchange} name="email" type="email" id="standard-basic"  sx={{display:"block"}}  label="Email" variant="standard" />
                       <TextField onChange={handleloginchange} name="password" type="password" id="standard-basic"  sx={{display:"block"}}  label="Password" variant="standard" />
                       <Button type="submit" variant="contained" style={{marginTop:"30px",width:"100%",marginBottom:"20px"}}>Login</Button>
                       <Button onClick={handlegooglelogin} variant="contained" style={{width:"50%"}}><i class="fab fa-google" style={{marginRight:"10px"}}></i>Google login</Button> <Button onClick={gotoregisterpage} style={{width:"49%"}}  variant="contained">Register here</Button>
                       
                    </form> 
                    
                </Grid>
             </Grid>
            </Container>
           </Box>
        
      </>
    )
}

export default Login
