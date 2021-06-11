import store_groups from './store_groups';
import store_delete from './store_delete';
import React,{useEffect,useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import './chatbox.css';
import Form from './form';
import axios from 'axios';
import moment from 'moment';
import Clock from 'react-live-clock';
import reload from './Images/reload.png';
var flag;
var store_state;
var load_chathead;
var load_form;
var load_desc;
var load_banner;
var group_name;
var data=[];
var group_groups=[];
var id;

var addgroups = "abcd";
var created_by;
var em=["dummy"];
var us = ["dummy"];
var res=[];
var res3=[];
var gro_inds=[];
var gn;
var grc;
var grch="";
var conts;
var contsarr;
var addlist=[];
function Chatbox(){
     
     console.log("groups");
     console.log(sessionStorage.getItem("groups"));
     conts = sessionStorage.getItem("contacts");
    const[chat_component_status, set_task_component] = useState(0);
    const token = sessionStorage.getItem("token");
    const eid = sessionStorage.getItem("email");
    
    const[grouplist, set_grouplist] = useState({
        group_data:[]
    });    
    
   
  
        const [state, setState] = useState({
            group_name:null
        });     
      const [namestate, namesetState] = useState({});
        const [checkstate, checksetState] = useState({
        a:""
    });
    
        const [checkgroupstate, checkgroupsetState] = useState([]);
    
    
        const handleCheck = a =>{
        const {id , value,checked} = a.target;  

        if(checked == false){
            console.log("remove");
             em = em.filter(x => x != id);
       
        }
            else{
               em.push(id);
            }

    }
            
        const handleuserCheck = a =>{
        const {id , value,checked} = a.target;  

        if(checked == false){
            console.log("remove");
             us = us.filter(x => x != id);
       
        }
            else{
               us.push(id);
            }
  console.log("us")
  console.log(us)
    }
           
        const handleuseraddCheck = a =>{
        const {id , value,checked} = a.target;  

        if(checked == true){
                           us.push(id);
             
       
        }
            else{

                us = us.filter(x => x != id);
            }
  console.log("us")
  console.log(us)
    }
    
    
        const handleaddCheck = b =>{
        const {id , value,checked} = b.target;  

        if(checked == true){
           em.push(id);
        }
            else{
              em = em.filter(x => x != id);
            }
     console.log("em");
console.log(em);
           
    }
    
    
        const handleChange = a =>{
        const {id , value} = a.target; 
            
        setState(prevState => ({
            ...prevState,
            [id]:value
        }))
    console.log(state); 
    }   
                  
        const handlegroupChange = a =>{
        const {id , value, checked} = a.target;   
        
            if(grch=="Group")
                {
                    if(value == true)
                         grc = true
                    else
                        grc = false
                }
            else
            {
                    if(value == true)
                         grc = false
                    else
                        grc = true
            }
 
    }   
              
        const handleSubmit = a =>{
         
            console.log("state"); 
            console.log(state); 
            console.log("namestate"); 
            console.log(namestate); 
          console.log("checkgroupstate");
          console.log(checkgroupstate);
            if(state.group_name == null){
                console.log("yes");
                gn = namestate;
            }
            else{
                 console.log("no");
                gn = state.group_name;
            }
            
            gro_inds = us.map(function(val){
              return {"email":val}
          })

         res3 = em.map(function(val){
              return {"groupname":val}
          })
           
                   
                    console.log(gro_inds);
         request();
            
       
    }   
       
    
        
        
        function request(){
    
{/*
          "groupname":gn,
           "created_by":{email:created_by},
            "group_groups":res3,
             "uuid": id,
               "group_users":data,
                 is_group : grc*/}
   
   
           const payload ={
              "groupname":gn,
           "created_by":{email:created_by},
            "group_groups":res3,
             "uuid": id,
               "group_users":gro_inds,
                 is_group : grc
            }
            
    console.log(payload); 
        
             console.log("data");
        console.log(payload);
        
var config = {
  method: 'put',
  url: 'https://themeshapp.herokuapp.com/main/groups/edit/',
  headers: { 
    'Authorization': 'Token ' + token, 
    'Content-Type': 'application/json'
  },
  data : payload
};
console.log("config");
console.log(config);
        
axios(config)
.then(function (response) {
  console.log(response.status);
        window.location.reload(false);
   
})
.catch(function (error) {
  console.log(error);
});
           
    }
        
        function set(){
            set_task_component(0);
        }
        
        
        
    
    
    
        function delete_group(id){
        console.log(eid);
        console.log(created_by);
            
        if(created_by == eid ){
            console.log("same to delete");
        const payload = {
            "uuid":id
        }
        var data = JSON.stringify({"uuid":id});
        var config = {
  method: 'delete',
  url: 'https://themeshapp.herokuapp.com/main/groups/delete/',
  headers: { 
    'Authorization': 'Token '+ token, 
    'Content-Type': 'application/json'
  },
  data : data
};

            console.log(config);
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
},
     set_task_component(0),
      
            setTimeout(() => { store_delete.dispatch({
            type: "delete_group",
            
        }) }, 2000),
          
            )
.catch(function (error) {
  console.log(error);
});
        
       }
            else{
                window.alert("You are not the host");
            }
    }
    

   
     load_chathead = function set_load_chathead(){
         
          
          group_name = store_state["value"]["name"];

         namesetState(group_name);
          created_by = store_state["value"]["created"]["email"];
          id = store_state["value"]["id"]; 
          grc = store_state["value"]["is_group"]; 
         
          if(grc == true)
              {
                  grch = "Group";
                
              }
         else{
             grch = "Channel"
         }
     data = store_state["value"]["members_data"]["members"];
us =  data.map(c => c["email"]);
         
          group_groups = store_state["value"]["group_groups"]; 
          set_grouplist({group_data:group_groups})
         if(conts !=[]){
               console.log(conts);
             contsarr = JSON.parse(conts);
             console.log("contsarr")
             console.log(contsarr)
              addlist = contsarr.map(c=> c["email"]);
     
           
          for (var i = 0; i < data.length; i++) {
            addlist = addlist.filter(x => x != data[i]["email"]);
        }    }
         console.log("addlist");
         console.log(addlist);
         
         addgroups = sessionStorage.getItem("groups");
         console.log("members");
         console.log(data);          
         
         console.log("created by ");
         console.log(created_by); 
         if(res !=[])
         { console.log("addgroups");console.log(addgroups);
             res = addgroups.split(",");
         console.log("res");
         console.log(res);
         }
         
         res = res.filter(a => a != group_name);
          
         console.log("res");
         console.log(res);         
         
        em = group_groups.map(c => c["groupname"]);
         console.log("em");
         console.log(em);

         
/* let difference = res.filter(x => !res.includes("pl + design ppp")); */
var difference;
        for (var i = 0; i < group_groups.length; i++) {
            res = res.filter(x => x != group_groups[i]["groupname"]);
        }
         console.log("difference");
         console.log(res);
          checkgroupsetState(res);
         load_ch();
     }
     
      function load_ch(){
         
         
                if(created_by == eid || grc == true){
             console.log("admin");
           set_task_component(1);}
         else{
          set_task_component(4);}
          
      }   
    
    function dest(){
        res=[];
    }
     load_form = function set_load_form(){
          set_task_component(2);
     }
    
     load_desc = function set_load_desc(){
           console.log("desc");
      set_task_component(3);
     }
     
     load_banner = function set_load_banner(){
         set_task_component(0);
     }
        
        if(chat_component_status==0)
        {
        return(
            <div>
        <div>
        <h1 id="heading_chatbox">Data</h1>
        </div>
            <div>
                

          
        </div>
                </div>
        )
        }        
        else if(chat_component_status==1)
        {
        return(
        <div>
                
        <Link onClick={load_desc}><div><h1 id="groupname_heading">{group_name}</h1>             </div></Link>
                
                <Link id="reload" onClick={set}> <img alt="panda" className="reload_icon" src={reload} /></Link>
                 <h4 id="groupmode">{grch} &nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" id="gmode" onChange={handlegroupChange} defaultChecked></input></h4>
                
                
                <h4 id="subgroups">Subgroups</h4>
        <p> {group_groups.map(item => (<div className="row" id="sbgrprow">  <div className="col" id="indmembers"> {item.groupname} </div> <input type="checkbox" onChange={handleCheck} id={item.groupname} defaultChecked></input> </div> ))} </p>        
                
                <h4 id="groupstoadd">Groups to Add</h4>
                <p> {checkgroupstate.map(item => (<div className="row" id="sbgrprow"> <div className="col" id="indmembers">{item} </div><input type="checkbox" id={item} onChange={handleaddCheck}  ></input> </div> ))} </p>                
                
                <h4 id="groupstoadd">Users</h4>
                <p> {data.map(item => (<div className="row" id="sbgrprow"> <div className="col" id="indmembers">{item.email} </div><input type="checkbox" id={item.email}   onChange= {handleuserCheck} defaultChecked></input> </div> ))} </p>         
                
                <h4 id="groupstoadd">Users to Add</h4>
                <p> {addlist.map(item => (<div className="row" id="sbgrprow"> <div className="col" id="indmembers">{item} </div><input type="checkbox" id={item} onChange={handleuseraddCheck}  ></input> </div> ))} </p>
                
        
        <input type="text" id="group_name" onChange={handleChange}  Value={group_name} />
                
        <button id="changebutton" onClick={handleSubmit}>Submit Changes</button>
        
        </div>
        )
        }        
        else if(chat_component_status==2)
        {
        return(
        <div>
        <h1 id="headingform">Form </h1><Link id="reload"> <img alt="panda" className="reload_icon" src={reload} /></Link>
        <Form/>
        </div>
        )
        }        
        else if(chat_component_status==3)
        {
        return(
        <div id="chatbox_outer">
            <div id="chatbox_head">
        <h1 id="desc_heading">{group_name}</h1><Link id="reload" onClick={set}> <img alt="panda" className="reload_icon" src={reload} /></Link>
            </div>
            <div id="group_data">
        <h5 id="ceated_by">Created by :</h5>
        <p id="name_ceated_by">{created_by}</p>
        <h5>Members</h5>
        <p> {data.map(item => (<ul> {item.email} </ul> ))} </p>
        </div>
                
                <button id="delete_btn" onClick={()=>delete_group(id)}>delete</button>
            </div>
        )
        }
     else if(chat_component_status==4)
        {
        return(
        <div>
                
        <Link onClick={load_desc}><div><h1 id="groupname_heading">{group_name}</h1>             </div></Link><Link id="reload" onClick={set}> <img alt="panda" className="reload_icon" src={reload} /></Link>
                 <h4 id="groupmode">{grch} &nbsp;&nbsp;&nbsp;&nbsp; </h4>
                
                
                <h4 id="subgroups">Subgroups</h4>
        <p> {group_groups.map(item => (<div className="row" id="sbgrprow">  <div className="col" id="indmembers"> {item.groupname} </div></div> ))} </p>        
            
                
        
    
                
      
        
        </div>
        )
        }    
    
    
}

export default Chatbox;



store_groups.subscribe(()=>{
   
   
    store_state=store_groups.getState();
     
    flag = store_state["state"];
    
    if(flag == 1)
        {
            load_chathead();
        }
    else if(flag == 2)
        {
            load_form();
        }    
    else if(flag == 0)
        {
            load_banner();
        }
})
    