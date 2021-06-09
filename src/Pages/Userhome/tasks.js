import React, {useLayoutEffect,useState,useEffect} from 'react';
import './tasks.css';
import axios from 'axios';
import reload from './Images/reload.png';
import pencil from './Images/pencil.png';
import upcoming from './Images/upcoming.png';
import past from './Images/past.png';
import { Link } from 'react-router-dom';
import Taskform from './taskform';
import moment from 'moment';
import tz from 'moment-timezone';
import _ from 'lodash';
var arrdata = [];
var arr=[];
var arrpast=[];
var arrup=[];
var today;
var d;
var hd = "Upcoming";
/* ######################    form    ########################### */


/* ######################    tasks    ########################### */



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
         /*console.log(response.data); */
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
            
            console.log("sample time");
            let st =moment(arr[0]["time_due"]).format('DD MMM YYYY');
            console.log( st);        
  
            console.log("today");
            console.log(today);            
            console.log("past");
            console.log(arrpast);
            console.log("upcoming");
            console.log(arrup);
            
            setState({todos:response.data})
            
     /* console.log(typeof(state.todos)); */
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
       
             {arr.map(item => (<ul id="contact_element_list"><div className="container" id="taskgroup_element">{item.description.title}</div></ul>))}

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
             
    
}

export default Tasks;