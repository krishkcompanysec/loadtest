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

function Homeheader_mob() {
    let history = useHistory();

    function logout(){
        console.log("logout");
        history.push('/login');
        sessionStorage.removeItem("token");
        
    }
    
  return (
      <div className="homeheader" id="idhomeheader">
      
      <nav className="navbar navbar-expand-sm   navbar-light " id="nav_mob">
      
       {/* ############################## */} 
      
      
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      
      <span className="navbar-toggler-icon"></span>
      
      </button>
     
      
      {/* ############################## */} 
      
      
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
         
          
          <ul className="navbar-nav" id="left">
               <img alt="mesh_icon" className="mesh_icon" src={mesh_icon} />
              <Link to ="/profile" className="ml nav-link"  >Profile </Link>
              <Link onClick={logout} className="ml-sm-5 nav-link" >Logout</Link>
              
          </ul>
      

      
      </div>
      
      {/* ############################## */} 
  
      </nav>
      
      </div>
      
  );
}

export default Homeheader_mob;


