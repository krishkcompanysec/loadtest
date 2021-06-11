import React,{useEffect,useState,useLayoutEffect} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./taskform.css";
import store_edittask from './store_edittask';
import moment from 'moment';
import _ from 'lodash';
var store_state;
var flag;
 var contactfiltered =[];
 var groupsfiltered =[];
 var groupsresponse =[];
var tl ="";
var ds ="";
var td;
var assigned_user;
var ag =["dummy"];
var au =["dummy"];
var emarray=[];
var grarray=[];
var std;
var uid;
    store_edittask.subscribe(()=>{
   
    console.log("change");
    store_state = store_edittask.getState();
     console.log("store_state");
     console.log(store_state);
    flag = store_state["state"];
    
    if(flag == 1)
        {
           console.log("1");
             ag = store_state["value"]["assignee_groups"];
            tl = store_state["value"]["title"];
           
            uid = store_state["value"]["uuid"]
             ds =  store_state["value"]["description"];
             td =  store_state["value"]["time_due"];
            std = td;
            console.log(std);
             assigned_user =  store_state["value"]["assigner"];
           td = moment(td).format('DD MMM YY, hh A')
            console.log(td);
           
            grarray = ag.map(c => c["groupname"])
            console.log("grarray");
            console.log(grarray);
            au = store_state["value"]["assignee_users"];
            emarray = au.map(c => c["email"]);
            console.log("emarray");
            console.log(emarray);
            console.log(typeof emarray);
        }
  

})
     
      



function Edittaskform()
{
  
    
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    var assigner;
    var contacts = JSON.parse(sessionStorage.getItem("contacts"));
    
    var em =" ";
    var gn =" ";
    var res3;
    var res4;
    var date_time;
    var des;
    
    /*console.log(contacts); */
    useLayoutEffect(() => {   
           request()
                
    },[]) 
    
    const [state, setState] = useState({
 
    groups:[],
     
    });
    
    
      const[strstate, strsetState] = useState();
    
   

    
  
    
    
  
  
    
    const dis = a =>{
        a.preventDefault();  
        console.log("strstate");
        console.log(strstate);
        console.log("td2");
        console.log(std);
          emarray = emarray.map(function(val){
              return {"email":val}
          })
                 grarray = grarray.map(function(val){
              return {"groupname":val}
          })
        if(datastate.task_name !=""){
            tl = datastate.task_name;
        }        
        if(datastate.task_desc !=""){
            td = datastate.task_desc;
        }
        const payload={
         
           "assigner":assigned_user,
           "description":{"title":tl,"description":ds},
            "time_due":std,
            "assignee_groups":grarray,
           "assignee_users":emarray,
           "completed":[],
            "uuid":uid
            }
        console.log("payload");
        console.log(payload);
      
               var config = {
  method: 'put',
  url: 'https://themeshapp.herokuapp.com/main/tasks/edit/',
  headers: { 
    'Authorization': 'Token ' + token, 
    'Content-Type': 'application/json'
  },
  data : payload
};
console.log(config);
        
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
    window.location.reload(false); 

})
.catch(function (error) {
  console.log(error);
});
    
    }
    
    
    const [datastate, datasetState] = useState({

          task_name:"",
          task_desc :"",

    
     });
    
    const [checkstate, checksetState] = useState({
        a:""
    });    
    const [checkgroupstate, checkgroupsetState] = useState({
        b:""
    });
    
        const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
   function checkset(){
       /* console.log("set");
        console.log(checkstate);
        console.log(checkgroupstate);        
        console.log(startDate); */
   
    }
    
    async function request(){
               
        var config = {
        method: 'get',
        url: 'https://themeshapp.herokuapp.com/main/groups/list/',
        headers: { 
            'Authorization': 'Token ' + token, 
            'Content-Type': 'application/json'
        }
        };

        await axios(config).then(function (response) {
           console.log(JSON.stringify(response.data));
            groupsfiltered= response.data;
            
            for (var i = 0; i < ag.length; i++) { 
          
           groupsfiltered = groupsfiltered.filter( x => x["groupname"] != ag[i]["groupname"])
            
           
                
      }  
            groupsfiltered = _.filter(groupsfiltered,function(o) {
       return o["created_by"]["email"]==email || o["is_group"] == true ; 
    }); 
               contactfiltered = contacts;
        
       
        for (var i = 0; i < au.length; i++) { 
          
            contactfiltered = contactfiltered.filter( x => x["email"] != au[i]["email"])
            
            
        }     

            setState({groups: response.data});
        }).catch(function (error) {
            console.log(error);
        });
        
        
         console.log("au");
        console.log(au);
        var auvalues;
       {/*  for (var i = 0; i < au.length; i++) {
            contactfiltered = contacts.filter(x => x["email"] != au["email"]);
        }
        
        
       contactfiltered = contacts.filter(item => !au["email"].includes(item["email"]));*/}
    {/*
    
        for (var i = 0; i < au.length; i++) {
           
            contactfiltered = contacts.filter(function ifpresent(value){
                return (contacts["email"] != au[i]["email"]  )
            })
            
        }   */}    
        
            
        
       

   

        console.log("groupsfil");
        console.log(groupsfiltered);

       
    }
    
    
           
        
    
    const handleChange = a =>{
        const {id , value} = a.target;   
        datasetState(prevState => ({
            ...prevState,
            [id] : value
        }))
    console.log(datastate);
    }   
        
    const handleCheck = a =>{
        const {id , value,checked} = a.target;  
        console.log("change on");
        console.log(id,checked); 
        
        if(checked == false){
            console.log("remove");
             emarray = emarray.filter(x => x != id);
       
        }
            else{
               emarray.push(id);
            }
        
        console.log(emarray)
        
        
    }    
    
    
           const handleaddCheck = b =>{
        const {id , value,checked} = b.target;  

        if(checked == true){
            emarray.push(id);
        }
            else{
               emarray =  emarray.filter(x => x != id);
            }
     console.log(" emarray");
console.log(emarray);
           
    }
           
               const handleCheckgroup = a =>{
        const {id , value,checked} = a.target;  
        console.log("change on");
        console.log(id,checked); 
        
        if(checked == false){
            console.log("remove");
             grarray = grarray.filter(x => x != id);
       
        }
            else{
               grarray.push(id);
            }
        
        console.log(grarray);
        
        
    }       
               const handleaddCheckgroup = a =>{
        const {id , value,checked} = a.target;  
        console.log("change on");
        console.log(id,checked); 
        
        if(checked == true){
           grarray.push(id);
        }
            else{
              grarray = grarray.filter(x => x != id);
            }
     console.log("grarray");
console.log(grarray);
        
     
        
        
    }    

               
    
        const handlegroupCheck = a =>{
        const {id , value,checked} = a.target;  
        console.log("change on");
        console.log(id,checked);
    if(checked == true){
            console.log(id,checked);
        gn = gn + id + ",";
                       console.log("checkgroupstate.b");
                       console.log(checkgroupstate.b);
      
                   checkgroupsetState(prevState => ({
            ...prevState,
            "b" :  checkgroupstate.b + "," + id 
        })) 
        }
        else{
             console.log("else");
     
        var e= checkgroupstate.b;

         
                  var rp ="," + id ; 
                console.log("com");
            
            console.log("rp");
        console.log(rp);          
            console.log("e before");
        console.log(e);
         e = e.replace(rp,"");
    console.log("e after")
    console.log(e)
        
               checkgroupsetState(prevState => ({
            ...prevState,
            "b" : e
        }))
        }
        
        
        
        
    }  
    
    
  
        
        
       const handleDateChange = m => {
    setState({ time_due: m });
    
  }
    
   const handleSubmit = a =>{
        a.preventDefault();       
        console.log("logging");
       
       var str = checkstate.a;
       if(str != ""){
       str = str.substring(1);
       var stripped =str.replace(/\s+/g, '')
       var res = stripped.split(",");
       console.log(res);
               res3 = res.map(function(val){
              return {"email":val}
          })
       }
              else{
           res3=[]
       }
       str = checkgroupstate.b;
       if(str != ""){
       str = str.substring(1);
       stripped =str.replace(/\s+/g, '')
       res = stripped.split(",");
         res4 = res.map(function(val){
              return {"groupname":val}
          })
       }
       else{
           res4=[]
       }
       if(datastate.task_desc =="")
           {
               des = "Nothing defined"
           }
       else{
            des = datastate.task_desc;
       }
       console.log();
       console.log(datastate.task_name);
    
       console.log(datastate.task_desc);
       console.log(res3);
       console.log(res4);
      
       
            assigner = {"email":email};
           
       if(datastate.task_name !="")
           {
               if(startDate !=null)
                   {    date_time = startDate.toISOString();
                    console.log(date_time);
                        request_submit();
                   }
               else{
                   window.alert("fill in Due Date");
               }
           }
        else{
               window.alert("fill in Task name");   
            }
      
    }
   
   function getdata(){
       
   }
    
   function request_submit(){
       
       const payload={
         
           "assigner":assigner,
           "description":{"title":datastate.task_name,"description":des},
            "time_due":date_time,
            "assignee_groups":res4,
           "assignee_users":res3,
           "completed":[]
            }
       
       console.log(payload);
       
       var config = {
  method: 'post',
  url: 'https://themeshapp.herokuapp.com/main/tasks/edit/',
  headers: { 
    'Authorization': 'Token ' + token, 
    'Content-Type': 'application/json'
  },
  data : payload
};
console.log(config);
        
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  

})
.catch(function (error) {
  console.log(error);
});
       
   }
    
    return(
    
        <div>
            <form className="form" onSubmit = {dis} id="taskform">
                
            <label>
            Task Name: <br/>
            <input type="text" id="task_name" onChange={handleChange} defaultValue = {tl}/>
            </label>           
                <br/>
            <label>
            Description: <br/>
            <input type="text" id="task_desc" onChange={handleChange}  defaultValue={ds} placeholder="desc"/>
            </label>   
                <br/>
            <label>
            Timedue <br/>
          
        <DatePicker className="form-element"
       isClearable
       
       placeholderText= {td}
       showTimeSelect
       dateFormat="Pp"
       selected={startDate}
       timeIntervals={60}
      
        defaultValue = {td}
        placeholder = {td}
       onChange={date => setStartDate(date)}
  withPortal
 
       />
            </label>  
                 <br/>
                
                  
                    <h5>Assigned Users </h5>
                  {au.map(item => <div className="row" id="rowtaskform">  <div className="col"> {item.email}</div>   <div className="col" id="taskformmembers">   <input type="checkbox" id={item.email} onChange={handleCheck} defaultChecked></input></div></div> )}    
                
    
                <label>
                    <h5>Assignee Users</h5>
        {/*
             {contacts.map(item => <div> <label>{item.email}<input type="checkbox" id={item.email} onChange={handleCheck}></input></label></div> )}        
             */}

{contactfiltered.map(item => <div className="row" id="rowtaskform">  <div className="col"> {item.email}</div>   <div className="col" id="taskformmembers">   <input type="checkbox" id={item.email} onChange={handleaddCheck} ></input></div></div> )}
              
            </label>                 
                <br/>
                <label>
                    <h5> Assigned Groups</h5>
        
             {ag.map(item =><div className="row"  id="rowgroupform">  <div className="col"> {item.groupname}</div> <div className="col"> <input type="checkbox" onChange={handleCheckgroup} id={item.groupname}  defaultChecked></input></div></div> )}
            </label>
                <br/>
                <label>
                    <h5> Assignee Groups</h5>
        
             {groupsfiltered.map(item =><div className="row"  id="rowgroupform">  <div className="col"> {item.groupname}</div> <div className="col"> <input type="checkbox" onChange={handleaddCheckgroup} id={item.groupname}></input></div></div> )}
            </label>
                <br/>
                <input type="submit" value="Submit" id="sb"/>
              
            </form>  <br/>
           
        </div>
    )
    
}

export default  Edittaskform;



    
