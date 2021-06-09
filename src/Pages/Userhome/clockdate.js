import moment from 'moment';
import Clock from 'react-live-clock';
function Clockdate(){
   
    return(<div>
                        <h2><Clock format={'hh:mm:ss a'} ticking={true} timezone={'Asia/Kolkata'} /></h2>
                
                 <h4>{moment().format("MMM Do YY")} &nbsp; {moment().format('dddd')} </h4>
                
                
    </div>
    )
}

export default Clockdate;