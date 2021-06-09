import React, {useLayoutEffect,useState,useEffect} from 'react';
import './userhome.css';
import { useSwipeable } from 'react-swipeable';
import Tasks from './tasks';
import Groups from './groups';
import Chatbox from './chatbox';
import './userhome_mob.css';
import store_groups from './store_groups';
import Homeheader_mob from './userheader_mob';

var flag;

var h = window.screen.height;

function load_chat(){
        window.scrollTo(0,h-30);
        console.log("scroll");
    }
    

function Userhome_mob(){
 
    const handlers = useSwipeable({
  onSwipedLeft: (eventData) => side(),
        delta: 90,   
        
});    
    const righthandle = useSwipeable({
  onSwipedRight: (eventData) => side(),
        delta: 100, 
  
});
    

    
    function side(){
         console.log("swipe");
     if(state == 0)
         setState(1)
     else
         setState(0)
    }
    
       const [state, setState] = useState(0);
    
    
    if(state == 0){
        
    return(
    
      
        
        <div {...handlers} id="outer_Userhome_mob">
        
        
        
            <div > 
        <Homeheader_mob/>
                <div id="box">
         
        <Tasks/>
                </div>

            </div>
        </div>
    )
        
   }
    
    else if(state == 1){
        
    return(
    
      
        
        <div {...righthandle} id="secouter_Userhome_mob">
        
        
        
            <div > 
        
                <div id="box">
                <div id="vh_groups">
        <Homeheader_mob/>
                        <Groups>
        
                        </Groups>
        </div>
        <div id="vh_chat">
                     <Chatbox/>   
        </div>
                </div>

            </div>
        </div>
    )
        
   }
}

export default Userhome_mob;




store_groups.subscribe(()=>{
   
    var store_state=store_groups.getState();
    
    var flag = store_state["state"];
    
    if(flag == 1)
        {
           load_chat();
        }
    else if(flag == 2)
        {
          load_chat();
        }
})
    