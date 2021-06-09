import { useHistory } from "react-router-dom";
import React, {useLayoutEffect,useState} from 'react';
import { Breakpoint } from 'react-socks';
import Homeheader from './Userhome/userheader';
import Homeheader_mob from './Userhome/userheader_mob';
import Userhome_desk from './Userhome/userhome_desk';
import Userhome_mob from './Userhome/userhome_mob';


function Userhome(){
    
    let history = useHistory();
    
    useLayoutEffect(() => {
         
        if(sessionStorage.getItem("token")==null) 
                                                        
        {
          history.push('/userhome');  
        }
        console.log("Req done");
        console.log(sessionStorage.getItem("token"));
        
    },[])
    
    return(
    
        <div>
        <Breakpoint large>
        <Homeheader/>
        <Userhome_desk/>
        </Breakpoint>
        
        <Breakpoint medium >

        
        </Breakpoint>
        
        
        <Breakpoint small>
        
         <Userhome_mob/>
        </Breakpoint>
        </div>
    )
    
}

export default Userhome;