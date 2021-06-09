/* ######################    Links    ########################### */
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/js/src/collapse.js";
import "bootstrap/js/src/dropdown.js";

import { Link } from 'react-router-dom';
import React, {useLayoutEffect,useState} from 'react';
import { useHistory } from "react-router-dom";

/* ######################   Styling   ########################### */ 
import './userheader.css';


import mesh_icon from './Images/mesh_icon_out.png';
import user from './Images/user3.png';

function Homeheader() {
    let history = useHistory();

    function logout(){
        console.log("logout");
        history.push('/login');
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("contacts");
        sessionStorage.removeItem("groups");
        
    }
    
  return (
      <div className="homeheader">
      
      <nav className="navbar navbar-expand-sm   navbar-light ">
      
       {/* ############################## */} 
      
      
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      
      <span className="navbar-toggler-icon"></span>
      
      </button>
      
      
      {/* ############################## */} 
      
      
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
       
          
          <ul className="navbar-nav" id="left">
              <Link to ="/"> <img alt="mesh_icon" className="mesh_icon" src={mesh_icon} /> </Link>
              <Link to ="/userhome" className="ml nav-link"  >Home  </Link>
              <Link to ="#" className="ml-sm-5 nav-link" > </Link>
                <Link to ="#" className="ml-sm-5 nav-link" >  </Link>
          </ul>
      
          <ul className="navbar-nav ml-auto" id="right">   
              <Link to ="/login" className="ml-sm-5 nav-link" id="explore_user" ></Link>

      
 <li className=" nav-item dropdown dmenu" id="dropdown">
              <a className="pr-lg-3 nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                <img alt="panda" className="user_profile" src={user} />
              </a>  
      
           <div className="dropdown-menu dropdown-menu-right sm-menu">
              <Link to ="/profile" className="dropdown-item" href="#">Profile</Link>
             <Link to ="/contacts"  className="dropdown-item">Contacts</Link>
              
              <Link className="dropdown-item" onClick={logout}>Logout</Link>              

            </div>
      </li> 
      
      
      
          </ul>
      
      </div>
      
      {/* ############################## */} 
      
      </nav>
      
      </div>
      
  );
}

export default Homeheader;


