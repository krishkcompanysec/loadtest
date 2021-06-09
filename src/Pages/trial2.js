import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);
var h = window.screen.height;
function Trial2()
{
    const myEventsList=[
        {
          'title': 'My event',
          'allDay': false,
          'start': new Date(2021, 4, 31, 10, 0), // 10.00 AM
          'end': new Date(2021, 4, 31, 14, 0), // 2.00 PM 
        }
      ]
    
    return(
    
        <div>
      
            <div>


  
<Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    defaultDate={moment().toDate()}
defaultView="day"
    style={{ height: h,width: '95%' }}
    />

  </div>
        </div>
    )
    
}

export default Trial2;