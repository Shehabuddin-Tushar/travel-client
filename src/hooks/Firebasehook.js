import React,{useState,useEffect} from 'react'
import { getAuth, signInWithPopup,GoogleAuthProvider,onAuthStateChanged,signOut,
   createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword} from "firebase/auth";
import travelAuthantication from '../Firebase/firebase.init';
import {useHistory,Redirect} from 'react-router-dom'
travelAuthantication();
const auth = getAuth();
const googleprovider = new GoogleAuthProvider();

const useFirebase=()=>{
    const [user,setUser]=useState({});
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");
    const [isloading,setIsloading]=useState(true);
   const history = useHistory();
   
   /** google login */
   const signupWithgoogleLogin = () => {

      return signInWithPopup(auth, googleprovider)
   }

/*login start */

 const [loginuser,setLoginuser]=useState({
    email:"",password:""
 });

 const handleloginchange=(e)=>{
    
   const newloginuser={...loginuser}
   newloginuser[e.target.name]=e.target.value
   setLoginuser(newloginuser);
   console.log(loginuser);
 }

 const singinLogin=()=>{
  return signInWithEmailAndPassword(auth, loginuser.email, loginuser.password)
  }
/*login end */



/* register start */
const [uservalues,setUservalues]=useState({
    displayname:"",email:"",password:"",confirmpassword:""
 });



 const handlechangeuservalues=(e)=>{
    const newuser={...uservalues} 
    newuser[e.target.name]=e.target.value
    setUservalues(newuser);
    console.log(e.target.value)
 }

const createUser=(e)=>{

   e.preventDefault();
   
    if(uservalues.displayname===""){
        setSuccess('')
        setError("your field is empty");
       
        return  
     }
    if(uservalues.email===""){
       setSuccess('')
       setError("your field is empty");
      
       return  
    }
    if(uservalues.password.length<6){
        setSuccess('')
        setError("your password is less then 6 characters");
      
        return
      }
    if(uservalues.password!==uservalues.confirmpassword){
        setSuccess('')
        setError("your password and confirm password does not matched");
       
        return  
   }
  
    
  setIsloading(true) 
  createUserWithEmailAndPassword(auth,uservalues.email,uservalues.password)
  .then((result) => {
     saveuser(uservalues.email,uservalues.password)
     setusername()
     setError('');
     setUservalues({})
     setSuccess('User created successfully');
     Logout();

     setTimeout(()=>{
         setSuccess("");
        
     },3000)
  })
  .catch((error) => {
      setSuccess('')
     
      setError(error.message);
  }).finally(()=>{
      setUservalues({})
      setUser({})
      setIsloading(false);
     
    });
}
const setusername=()=>{
  
  updateProfile(auth.currentUser, {
    displayName:uservalues.displayname
  }).then(() => {
    
  }).catch((error) => {
    
  });
 }

/* register end */

/**user save in database */

const saveuser=(email,password)=>{
   const userdata={
      email:email,
      password:password,
      role:"viewer"
   }
   fetch("http://localhost:5000/saveuser",{
      method:"POST",
      headers:{
         "content-type":"application/json"
      },
      body:JSON.stringify(userdata)
   }).then(res=>res.json()).then(data=>console.log(data))
}
/**user save in database end */

const Logout=()=>{
       
    signOut(auth).then(() => {
       setUser({});
       setUservalues({})
       console.log(user)
     }).catch((error) => {
       console.log(error.message)
     })
}

useEffect(()=>{
    setIsloading(true)
    const unsubscribed=onAuthStateChanged(auth, (user) => {
      if (user) {
        
         setUser(user) 
      }else{
         setUser({})
      }

      setIsloading(false)
    });
    return unsubscribed;
   }
  ,[]);


  
   return {
    signupWithgoogleLogin,isloading,setIsloading,loginuser,singinLogin,user,setUservalues,
    Logout,handlechangeuservalues,createUser,error,setError,success,handleloginchange
}
}
export default useFirebase;