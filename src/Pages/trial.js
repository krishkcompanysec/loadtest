import {DayPilot,DayPilotScheduler} from "daypilot-pro-react";
import moment from 'moment';

import React, {useLayoutEffect,useState} from 'react';

function Trial(){
    
        const [state,setState] = useState({

            startDate: "2021-10-01",
            days: 31,
            scale: "Day",
            eventHeight:30,
            cellWidth: 50,
            timeHeaders: [

                { groupBy: "Month"},
                { groupBy: "Day", format: "d"}

            ],
            cellWidthSpec: "Auto",
            resources: [
                {name: "Resource A", id: "A"},
                {name: "Resource B", id: "B"},
                {name: "Resource C", id: "C"},
                {name: "Resource D", id: "D"},
                {name: "Resource E", id: "E"},
                {name: "Resource F", id: "F"},
                {name: "Resource G", id: "G"}
            ],
            events: [
                {id: 1, text: "Event 1", start: "2021-10-02T00:00:00", end: "2021-10-05T00:00:00", resource: "A" },
                {id: 2, text: "Event 2", start: "2021-10-03T00:00:00", end: "2021-10-10T00:00:00", resource: "C", barColor: "#38761d", barBackColor: "#93c47d" },
                {id: 3, text: "Event 3", start: "2021-10-02T00:00:00", end: "2021-10-08T00:00:00", resource: "D", barColor: "#f1c232", barBackColor: "#f1c232" },
                {id: 4, text: "Event 3", start: "2021-10-02T00:00:00", end: "2021-10-08T00:00:00", resource: "E", barColor: "#cc0000", barBackColor: "#ea9999" }
            ]
            
    })    
    
        const {...config} = state;
    var a = moment().format();
    
 return(
    <div>
         {a}
            <DayPilotScheduler
                
 {...config}
                            
     />
    </div>
 )
}

export default Trial;