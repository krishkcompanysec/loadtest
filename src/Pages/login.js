/* ######################   Styling   ########################### */
import './login.css';


/* ######################  Components ########################### */
import HomeHeader from './Components/homeheader';

import login_bg from './Images/login.jpg'

/* ######################    Links    ########################### */
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom";
import React, {useLayoutEffect,useState} from 'react';
import axios from 'axios';

/* ######################    Comments    ########################### */
/* localStorage.getItem("token")!= "undefined"  --- undefined is the real one using ! to check condition */

import { Link } from 'react-router-dom';


var token;
function Login() {
    
    let history = useHistory();
    useLayoutEffect(() => {
        sessionStorage.setItem("contacts",""); 
        if(sessionStorage.getItem("token")!=null) 
                                                        
        {
          history.push('/userhome');  
        }
        console.log("Req done");
        console.log(sessionStorage.getItem("token"));
        
    },[])
    
    const [state,setState] = useState({
      
          email :null,
          password :null
      
            
    })
    
    /* ######################  Fetch Contacts ########################### */
    /* */
    function fetch_contacts(){
        var config = {
        method: 'get',
        url: 'https://themeshapp.herokuapp.com/authentication/profile/show/',
        headers: { 
            'Authorization': 'Token ' + token, 
            'Content-Type': 'application/json'
        }
        };

        axios(config).then(function (response) {
          /*   console.log(JSON.stringify(response.data)); */
           sessionStorage.setItem("contacts",JSON.stringify(response.data["contacts"])); 
           /*  console.log("state");
            console.log(state); */
           
            

        }).catch(function (error) {
            console.log(error);
        });
    }
    
     function fetch_name(){
        var config = {
        method: 'get',
        url: 'https://themeshapp.herokuapp.com/authentication/profile/show/',
        headers: { 
            'Authorization': 'Token ' + token, 
            'Content-Type': 'application/json'
        }
        };

        axios(config).then(function (response) {
            /* console.log(JSON.stringify(response.data)); */
             console.log((response.data["name"])); 
         
             sessionStorage.setItem("name",response.data["name"]);
           
           /*  console.log("state");
            console.log(state);
            console.log("name");
            console.log(response["name"]); */
           
        }).catch(function (error) {
            console.log(error);
        });
            
    }
    
    
    /* ######################  Send to server ########################### */

    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length){    
        sessionStorage.setItem("email",state.email); 
        console.log("sending")
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post("https://themeshapp.herokuapp.com/authentication/login/", payload).then((response) => {
         /*    console.log("done");
            console.log(response); */
            
            switch(response.status)
              {
                case 200:
      
               /*  console.log(response.data); */
                token = response.data.token;
                sessionStorage.setItem("token",response.data.token);
               /*  console.log(sessionStorage.getItem("token")); */
                history.push('/userhome')
                fetch_contacts();
                 fetch_name()
                break;
      
            default:
                
               /*  console.log("nope"); */
                break;
              }
        },
                                                             
            (error) => {
                console.log(error);
                alert("User Doesnt Exist");
            }                                                   
                                                             
                                                             
        );          
            
        }
            else{
                console.log(state.email.length)
               /*  console.log("Error!"); */
                alert("Enter Valid Credentials!");
           
            }
    }
    
    
    /* ######################  handle change ########################### */
    
    
    const handleChange = (e) => {
        const {id , value} = e.target;   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))   
    }
    
    /* ######################  handle submit ########################### */
    
    const handleSubmit = (e) => {
        e.preventDefault();       
        sendDetailsToServer();    
    }
    
    function push(){
        history.push("/signup");
    }
    
  return (   
      
      <div className="login">
      
      <HomeHeader/>
      
      <div id="login_bg_cnt">
        <img alt="login_bg" className="login_bg" src={login_bg} />
      </div>
      <div className="row">
            <div className="col-1" id="left_column"/>
            <div className="col"> 
                <div className="row-1" id="meshtoprow">
                    <div className="col"/>
                    <div className="col" id="meshtop">
                    
                    </div>
                    <div className="col" />

                </div>
     
                <div className="row-1">
                    
                </div> 
      
            </div>
      
            <div className="col-1  ml-auto" id="right_column"/>
        </div>
      
      
      
      <div className="container-fluid">
      <div className="row">
      <div className="col"/>
      <div className="col">
      
              
        
       <form className="form" onSubmit = {handleSubmit}>
      
                <h3>Sign In</h3>
      
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" autoComplete="on" onChange={handleChange} />
                </div>
      
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" autoComplete="on" onChange={handleChange} />
                </div>
      
                <br/>
      
                <button type="submit" className="btn btn-primary" >Submit</button>

                <p className="forgot-password text-right" id="fp">
                    <Link onClick={push}>Signup</Link>
                </p>
                <p className="forgot-password text-right" id="fp">
                    Forgot <a href="#">password?</a>
                </p>
      
        </form>
       
       
      
      </div>
    
      <div className="col"/>
   
      </div>


</div>
      </div>
      
    
  );
}

export default Login;


