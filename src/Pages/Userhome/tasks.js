import React, {useLayoutEffect,useState,useEffect} from 'react';
import './tasks.css';
import axios from 'axios';
import reload from './Images/reload.png';
import pencil from './Images/pencil.png';
import upcoming from './Images/upcoming.png';
import past from './Images/past.png';
import { Link } from 'react-router-dom';
import Taskform from './taskform';
import Edittaskform from './taskeditform';
import moment from 'moment';
import tz from 'moment-timezone';
import _ from 'lodash';
import store_edittask from './store_edittask';
var arrdata = [];
var arr=[];
var arrpast=[];
var arrup=[];
var today;
var d;
var hd = "Upcoming";
/* ######################    form    ########################### */


/* ######################    tasks    ########################### */

var title, description,completed,assignee_groups,assignee_users,time_due,uuid ="",assigner="";

function Tasks(){
    
     const token = sessionStorage.getItem("token");
    

    
   const [state, setState] = useState({todos:[]});
    
    const [timedata,settimedata] = useState();
 const [flag, setflag] = useState(0);
       useLayoutEffect(() => {
        today  = moment().format('DD MMMM YYYY');
      req(disp)
      
    },[])       
   
    useEffect(()=>{
    /* console.log("change"); */
        
    },[state.todos]
    )
        function req(callback){
          
       /*  console.log("request tsks");*/ 
        axios.get("https://themeshapp.herokuapp.com/main/tasks/show/",{
            headers: {'Authorization': "Token " + token}
            }).then((response) => {
        
         /*   console.log(response.data);
          console.log(typeof(response.data)); */
          arr = response.data;
            arrdata = arr;
            arrup = _.filter(arr,function(o) {
       return moment(o["time_due"]).isAfter(today); 
    });  
          arr =  _.orderBy(arrup, ['time_due'], ['asc']);
          
  {/*
            let filtered_array = _.filter(arr,moment(["time_due"]).format('DD MMM YYYY') < today);           
     */}       
           
           
              hd = "Upcoming";
            
           
            let st =moment(arr[0]["time_due"]).format('DD MMM YYYY');
                   
  
            
            setState({todos:response.data})
            
    
             setflag(1);
callback();
        })
        .catch(error => console.log(error))



       }
    
    function pastworks(){
        hd = "Previous";
         arrpast = _.filter(arrdata,function(o) {
       return moment(o["time_due"]).isBefore(today);
    });
        arr = arrpast;
        arr =  _.orderBy(arr, ['time_due'], ['desc']);
        disp();
    }
    
    function upcomingworks(){
          hd = "Upcoming Tasks";
          arr =  arrup;
        arr =  _.orderBy(arr, ['time_due'], ['asc']);
        disp();
    }
    
    function disp(){
       /*  console.log("arr");*/
       /*  console.log(arr);*/
       setflag(1);
        
        
    }
    
    function loadform(){
        setflag(2);
        console.log("form");
    }    
    
    function loadeditform(){
        
                console.log("sending");
         const email = sessionStorage.getItem("email");
        console.log("email");
        console.log(email);
    {/*    store_edittask.dispatch({
            type: "task_edit",
            payload:
                { title : title,    
                  description :  description,
                  completed : completed,
                  assignee_groups  : assignee_groups,
                  assignee_users : assignee_users,
                 uuid : uuid,
                 assigner : assigner
                }
            
        }) */}
                console.log("assigner");
        console.log(assigner);

        if(assigner["email"] == email)
        setflag(4);
        else
        window.alert("You aren't the assigner");
        console.log("form");
    }
        
    function chnge(){
        
                console.log("sending");
        
        
        store_edittask.dispatch({
            type: "task_edit",
            payload:
                { title : title,    
                  description :  description,
                  completed : completed,
                  assignee_groups  : assignee_groups,
                  assignee_users : assignee_users,
                 uuid : uuid,
                time_due : time_due,
                 assigner : assigner
                }
            
        })
        
      
        console.log("form");
    }
    
    function tsk(titled, descriptiond,completedd,assignee_groupsd,assignee_usersd,time_dued,uuidd,assignerd){
        
        const email = sessionStorage.getItem("email");
        console.log(titled, descriptiond,completedd,assignee_groupsd,assignee_usersd,time_dued,uuidd,assignerd)
        
        title = titled;
        description=descriptiond;
        completed=completedd;
       assignee_groups=assignee_groupsd;
        assignee_users = assignee_usersd;
        time_due = time_dued;
        uuid = uuidd;
         assigner = assignerd;
        
        console.log("email");
        console.log(email);
        console.log("assignee groups");
        console.log(assignee_groups);
        
        if(assigner["email"] == email)
            {console.log("5");
        setflag(5);}
        else{
        setflag(3);}
        
    }

    
    function done(){
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('uuid', uuid);

var config = {
  method: 'put',
  url: 'https://themeshapp.herokuapp.com/main/tasks/completed/',
  headers: { 
    'Authorization': 'Token ' + token, 
  
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
    window.location.reload(false);
})
.catch(function (error) {
  console.log(error);
});


    }
    
        
    function remove(){
        
        var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('uuid', uuid);

var config = {
  method: 'delete',
  url: 'https://themeshapp.herokuapp.com/main/tasks/delete/',
  headers: { 
    'Authorization': 'Token ' + token
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
      window.location.reload(false);
})
.catch(function (error) {
  console.log(error);
});
        
    }
    
    
    if(flag == 0){
        return(
    <div>
           
        <div>
        <h1 id="heading_tasks">
        
                         <Link id="new_group_link" onClick={loadform} > <img alt="panda" className="new" id="new_group" src={pencil} /></Link>
            
        <Link id="past_link" onClick={pastworks}> <img alt="panda" className="reload_icon" src={past} id="past" /></Link> 
        {hd}
        
                     <Link id="upcoming_link" onClick={upcomingworks} > <img alt="panda" className="new" id="upcoming" src={upcoming} /></Link> 
      <Link id="reload" onClick={req}> <img alt="panda" className="reload_icon" src={reload} id="reloadm_req" /></Link>
        
        </h1>
        
        
        </div>
        <div>
          
          
            <div id="task_list">
               
        <div className="row">
         <div className="col">  
       
        
   
                  

        </div>
         <div className="col"> 
       
        </div>
        </div>
         </div>
            
            
            
        </div>
            </div>
    )
    }
    else if(flag == 1){
    return(
    <div>
        <div>
           
        <h1 id="heading_tasks">
     
             
                      
            
                         <Link id="new_group_link" onClick={loadform} > <img alt="panda" className="new" id="new_group" src={pencil} /></Link>
            
                 <Link id="past_link" onClick={pastworks}> <img alt="panda" className="reload_icon" src={past} id="past" /></Link>  
            
        
          {hd}
        
                         <Link id="upcoming_link" onClick={upcomingworks} > <img alt="panda" className="new" id="upcoming" src={upcoming} /></Link> 
    
            <Link id="reload" onClick={req}> <img alt="panda" className="reload_icon" src={reload} id="reloadm_req"/></Link>
        
        </h1>
      
        
        </div>
        <div>
            
          
            <div id="task_list">
        <div className="row" id="phonerow">
         <div className="col" id="name">  
       
             {arr.map(item => (<ul id="contact_element_list"><Link onClick={() => tsk(item.description.title,item.description.description,item.completed,item.assignee_groups,item.assignee_users,item.time_due,item.uuid,item.assigner)} ><div className="container" id="taskgroup_element">{item.description.title}</div></Link></ul>))}

    {/*  {state.todos[0].map(item => (<ul id="contact_element_list"><div className="container" id="group_element">{item.time_due}</div></ul>))}
    */}
             
    

        </div>
    
                
        <div className="col" id="break"> 
       
{arr.map(item => (<ul id="breaklist" > - </ul>))}
        </div>
            
         <div className="col" id="due"> 
       
               { /*          {arr.map(item => (<ul id="contact_element_list"><div className="container" id="group_element">{item.time_due}</div></ul>))}
                        */     }    
   
            {arr.map(item => (<ul id="time_list"><div className="container" id="timegroup_element">{moment(item.time_due).format('DD MMM YY, hh A')}</div></ul>))}  
             
              
   { /*
        {arr.map(item => (<ul id="contact_element_list"><div className="container" id="group_element">{moment.unix(Date.parse(item.time_due)).format("DD MM YYYY")} </div></ul>))}        
*/ } 
 { /*
{arr.map(item => (<ul id="contact_element_list"><div className="container" id="group_element">{moment.unix(1625077800000).format("DD MM YYYY")} </div></ul>))}*/ } 
                  

             

        </div>
        </div>
                
         </div>
         
            
            
        </div>   
            
            </div>
        
    )
}
    
    else if(flag == 2){
         return(
        <div>
           
        <div>
        <h1 id="heading_tasks">
        
                         <Link id="new_group_link" onClick={loadform} > <img alt="panda" className="new" id="new_group" src={pencil} /></Link>
        
        Task Form
        
                    
      <Link id="reload" onClick={req}> <img alt="panda" className="reload_icon" src={reload} /></Link>
        
        </h1>
        
        
        </div>
        <Taskform/>
            </div>
        
        
            )}
             
    else if (flag == 3){
        chnge();
                return(
        <div>
                        
                               <h1 id="heading_tasks">
      
                              <Link id="new_group_link" onClick={loadeditform} > <img alt="panda" className="new" id="new_group" src={pencil} /></Link>       

        {title}
              <Link id="reload" onClick={req}> <img alt="panda" className="reload_icon" src={reload} /></Link>
 
        
        </h1>
                      
                        <h4 id="deschead">Description
                        </h4>
                          <h5 id="texthead">{description}</h5>
                        
                        <h4 id="deschead">Due Date
                        </h4>

                        <h5 id="texthead">{moment(time_due).format('DD MMM YY, hh A')}</h5>
                        
           
                        
                        <h4 id="deschead">Assigned by
                        </h4>
            <h5 id="texthead"> {assigner["email"]}</h5>
                        
                        <button id="buttondel" onClick={done}>Mark as done</button>
       
                
            </div>
        
        
            )
    }
    
     else if (flag == 4){
        
                return(
        <div>
                        <h1 id="heading_tasks">
                        Edit Task
                            
                                   <Link id="reload" onClick={req}> <img alt="panda" className="reload_icon" src={reload} /></Link>
                        </h1>
      
                        <Edittaskform/>          

        
          
                              
                        
        
                
            </div>
        
        
            )
    }
    
    else if (flag == 5)
    {
    chnge();
                return(
        <div>
                        
                               <h1 id="heading_tasks">
      
                              <Link id="new_group_link" onClick={loadeditform} > <img alt="panda" className="new" id="new_group" src={pencil} /></Link>       

        {title}
              <Link id="reload" onClick={req}> <img alt="panda" className="reload_icon" src={reload} /></Link>
 
        
        </h1>
                        <h4 id="deschead">Status
                        </h4>
                    <h5 id="texthead">{completed.length} users completed </h5>
                    <h5 id="texthead">{assignee_users.length} users to complete </h5>
                        <h4 id="deschead">Description
                        </h4>
                          <h5 id="texthead">{description}</h5>
                        
                        <h4 id="deschead">Due Date
                        </h4>

                        <h5 id="texthead">{moment(time_due).format('DD MMM YY, hh A')}</h5>
                        
           
                        
                        <h4 id="deschead">Assigned by
                        </h4>
            <h5 id="texthead"> {assigner["email"]}</h5>
                        
                         <h4 id="deschead">Assigned Users</h4>
        
                           <h5 id="texthead">{assignee_users.map(item => (<ul ><div className="container" >{item["email"]}</div></ul>))} </h5>  
                        
                        <h4 id="deschead">Assigned Groups</h4>
        
                           <h5 id="texthead">{assignee_groups.map(item => (<ul ><div className="container" >{item["groupname"]}</div></ul>))} </h5>
                                            
                        <h4 id="deschead">Completed Users</h4>
        
                           <h5 id="texthead">{completed.map(item => (<ul ><div className="container" >{item["email"]}</div></ul>))} </h5>
                        
                        
                        
                        
                        
                        <button onClick={remove} id="buttondelete">Delete</button>
       
                
            </div>
        
        
            )
    }
}

export default Tasks;