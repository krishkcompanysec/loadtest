import Homeheader from './Userhome/userheader';
import React, {useLayoutEffect,useState} from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import pencil from './Images/pencil.png';
import './profile.css';
import { useHistory } from "react-router-dom";
import './editprofile.css';
    var emailid;
    
    const token = sessionStorage.getItem("token");

function Entireeditprofile(){
    let history = useHistory();
    
     const [state, setState] = useState({

        username:""  

     });
    
    function handleprofile()
    {
         console.log("req1");
        request();
    }
    
    function request(a){
         a.preventDefault();
        console.log("req");
    }

   const handleChange = a =>{
       console.log("yep");
        const {id , value} = a.target;   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))}
    
            
    const handleSubmit = a =>{
            console.log("state ");
            console.log(state);
        a.preventDefault();       
        
      request();
        
    }
    
    function request(){
        emailid = sessionStorage.getItem("email");
        console.log("email ");
        console.log(emailid);
        
        const cont = JSON.parse(sessionStorage.getItem("contacts"));
        
        const datapayload = {"email":emailid,"name":state.username,"contacts":cont}
        sessionStorage.setItem("name",state.username);
console.log(datapayload)
var config = {
  method: 'put',
  url: 'https://themeshapp.herokuapp.com/authentication/profile/edit/',
  headers: { 
    'Authorization': 'Token '+token, 
    'Content-Type': 'application/json'
  },
  data : datapayload
};

axios(config)
.then(function (response) {
  console.log("response.data after name edit");
  console.log(response);
    sessionStorage.setItem("name",state.username);
     
       history.push('/profile');
})
.catch(function (error) {
  console.log(error);
});
    }
      
         


    const name =  sessionStorage.getItem("name");
    
    return(
    
        <div>
            
            <div id="parent_userhome">
                <Homeheader/>
            <div id="child_userhome">
  
       
        



            
            <form  id="profileform" onSubmit = {handleSubmit}>
                <div>
                     <br/>
                     <br/>
          <label>
            Name:</label> <br/><br/>
       <input type="text" id="username" placeholder={name} onChange={handleChange} />
        
        </div>                

        <br/>
            <input type="submit" value="Submit" id="name_btn"/>
                
            </form>
                
            </div>
            </div>
        </div>
    )
    
}

export default Entireeditprofile;