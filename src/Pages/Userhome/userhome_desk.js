import './userhome.css';
import Groups from './groups';
import Chatbox from './chatbox';
import Tasks from './tasks';
import Clockdate from './clockdate';

function Userhome_desk(){
    
    

    
    
    return(
        <div>
       
            <div id="parent_userhome">

            <div id="child_userhome">
            
                <div id="groups">
                <Groups/>
                </div>   
                
             
        
                <div id="chatbox">
                <Chatbox />
                </div>                
                <div id="Tasks">
                <Tasks/>
                </div>
                <div id="clockdate">
                <Clockdate/>
                </div>
                
            </div>
            </div>
        </div>
    )
    
}

export default Userhome_desk;