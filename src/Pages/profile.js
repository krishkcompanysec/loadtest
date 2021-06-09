import Homeheader from './Userhome/userheader';
import React, {useLayoutEffect,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import pencil from './Images/pencil.png';
import './profile.css';

var r;
var nm="";

{/*user:{"email":""}*/}

function Profile(){
    
     const [state, setState] = useState({

         email:"",
         name:""
         
     });
    
    const token = sessionStorage.getItem("token");
    var nme_storage = sessionStorage.getItem("name");
    useLayoutEffect(() => {
        
            
            request(setname);
    },[])
    
    
         function request(callback){
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
            setState(response.data);
           
            console.log(response.data);
             sessionStorage.setItem("name",response.data["name"]);
            r=response;
            nm =response.data["name"];
           console.log(nm);
         /*     console.log(state);
            console.log("name");
            console.log(response["name"]); */
           
        }).catch(function (error) {
            console.log(error);
        });
            callback();
    }
    
    function setname(){
 console.log(state);
    }
    
    return(
    
        <div>
            <Homeheader/>
            <div id="parent_userhome">

            <div id="child_userhome">
  
             <Link id="profedit" to ="/profileedit"> <img alt="panda" className="new" id="profeditimg" src={pencil} /></Link>
        
             <h3>Name</h3> 
             <h5>{state.name}</h5>

             <h3>Email</h3> 
             <h5>{state.email}</h5>

            

                
            </div>
            </div>
        </div>
    )
    
}

export default Profile;