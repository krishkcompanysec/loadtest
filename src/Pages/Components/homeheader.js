/* ######################    Links    ########################### */
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/js/src/collapse.js";
import "bootstrap/js/src/dropdown.js";

import { Link } from 'react-router-dom';
import React, {useLayoutEffect,useState} from 'react';
import { useHistory } from "react-router-dom";

/* ######################   Styling   ########################### */ 
import './homeheader.css';


import mesh_icon from './mesh_icon.png';


function Homeheader() {
    

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
               <img alt="mesh_icon" className="mesh_icon" src={mesh_icon} />
              <Link to ="/" className="ml nav-link"  >Home</Link>
              <Link to ="#" className="ml-sm-5 nav-link" >Features</Link>
              <a className="ml-sm-5 nav-link" href="#">Pricing</a>
          </ul>
      
          <ul className="navbar-nav ml-auto" id="right">   
              <Link to ="/login" className="ml-sm-5 nav-link" id="explore" >Explore Mesh</Link>

      
      
      
      
      
      
          </ul>
      
      </div>
      
      {/* ############################## */} 
      
      </nav>
      
      </div>
      
  );
}

export default Homeheader;


