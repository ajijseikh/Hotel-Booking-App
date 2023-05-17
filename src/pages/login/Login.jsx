import { AuthContext } from "../../context/AuthContext copy";
import "./login.scss";
import axios from "axios"
import React, { useContext, useState, } from 'react';
import { useNavigate} from "react-router-dom";

const Login =()=>{

    const [credentials, setCredentials]=useState({
        username:undefined,
        password:undefined,
    })
     const {loading,error,dispatch}=useContext(AuthContext);

const navigate=useNavigate()

     const handleChange=(e)=>{
       setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
     };

     const handleClick= async e =>{
         e.preventDefault()
         dispatch({type:"LOGIN_START"})
       
         try{
             
             const res= await axios.post('/auth/login',credentials);
            //    console.log("res.data",res.data.details.email)
            //    console.log("res.data.password",res.data.password)

           
             if(res.data.details.isAdmin){
              dispatch({type:"LOGIN_SUCCESS",payload:res.data.details})

              navigate("/")
             }else{
              dispatch({type:"LOGIN_FAILURE",payload:{message:"You are not allowed!"}})
             }
            
         }catch(err){
            // console.log("server error")
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data, status:"wrong user"})
         }
     }

      
 
    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange}  className="lInput"></input>

                <input type="password" placeholder="password" id="password" onChange={handleChange}  className="lInput"></input>
                
                <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
                {error && <span>{error.message}</span>}
            </div>
           
        </div>
    )
}

export default Login;