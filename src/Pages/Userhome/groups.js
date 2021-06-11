import store_delete from './store_delete';
import './groups.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, {useLayoutEffect,useState,useEffect} from 'react';
import store_groups from './store_groups';

import reload from './Images/reload.png';
import pencil from './Images/pencil.png';

var del;
var store_state;
var flag;

function Groups(){
    
    const token = sessionStorage.getItem("token");
    
    const [state, setState] = useState({
 
        groups:[],
     
    });
    
        
    useLayoutEffect(() => {   
           request()     
    },[]) 
    
    del = function refresh(){
        
        request();
    }
    
    function setcontact(dt){
        const ema = sessionStorage.getItem("email");
        console.log("dt");
        console.log(dt);
        var arr_cnt=[];
        var arr_adch=dt;
        var arr_ch =[];
        
        dt.map(item => (arr_cnt.push(item["groupname"])));
         console.log("arr_cnt");
         console.log(arr_cnt);
        
        arr_adch = arr_adch.filter( x => x["created_by"]["email"] == ema || x["is_group"] == true)
        
        arr_adch.map(item => (arr_ch.push(item["groupname"])));
        
        console.log("arr_ch");
        console.log(arr_ch);
        
        sessionStorage.setItem("admgrpchn",(arr_ch));
        console.log(arr_cnt);
        if(arr_cnt != [])
            sessionStorage.setItem("groups",arr_cnt);
        else
            sessionStorage.setItem("groups","");
        console.log(sessionStorage.getItem("groups"));
    }
    
    function request(){
        var config = {
        method: 'get',
        url: 'https://themeshapp.herokuapp.com/main/groups/list/',
        headers: { 
            'Authorization': 'Token ' + token, 
            'Content-Type': 'application/json'
        }
        };

        axios(config).then(function (response) {
           console.log("groups");
           console.log(JSON.stringify(response.data));
            setState({groups: response.data});
            setcontact(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    
    function chat(name,created,members,id,group_groups,is_group){

        
        store_groups.dispatch({
            type: "load_chathead",
            payload:
                { name : name,    
                  created :  created,
                  members_data : {members},
                  id  : id,
                  group_groups : group_groups,
                 is_group:is_group
                }
            
        })
        
    }
    
    function new_group()
    {
        store_groups.dispatch({
            type: "load_form"  
        })
    }
    
    return(
        <div>
        <div>
             
            
                    
        <h1 id="group_heading">
            
                   <Link id="new_group_link" onClick={new_group} > <img alt="panda" className="new" id="new_group" src={pencil} /></Link>
            
            Groups
            
      <Link id="reload" onClick={request} > <img alt="panda" className="reload_icon" src={reload}  id="reloadm_req" /></Link>
            </h1>
                    

            </div>
            
                   <div className="row" id="grouprow">
         <div className="col">  
             
             {state.groups.map(item => (<ul id="group_element_list" key={item.uuid}><Link id ="link" onClick={() => chat(item.groupname,item.created_by,item.group_users,item.uuid,item.group_groups,item.is_group)}><div className="container" id="group_element">{item.groupname}</div></Link> </ul>))}
                 
        </div>
            </div>


      
        
    
        
        </div>
    )
}

export default Groups;



store_delete.subscribe(()=>{
    console.log("change_delete");
    store_state=store_delete.getState();
    console.log(store_state);
    flag = store_state["state"];
    
    if(flag == 1)
        {
            del();
        }
    
})
    