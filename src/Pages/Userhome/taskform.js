import React,{useEffect,useState,useContext} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./taskform.css";
import _ from 'lodash';
function Taskform()
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
    useEffect(() => {   
           request()     
    },[]) 
    
    const [state, setState] = useState({
 
    groups:[],
     
    });
    
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
           console.log(response.data); 
      
            
           var admingroups = _.filter(response.data,function(o) {
       return o["created_by"]["email"]==email || o["is_group"] == true ; 
    }); 
            console.log("admingroups");
            console.log(admingroups);
            
            setState({groups: admingroups});
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    const handleChange = a =>{
        const {id , value} = a.target;   
        datasetState(prevState => ({
            ...prevState,
            [id] : value
        }))
    /*console.log(datastate); */
    }   
        
    const handleCheck = a =>{
        const {id , value,checked} = a.target;  
        /*console.log("change on");
        console.log(id,checked); */
    if(checked == true){
            /*console.log(id,checked); */
        em = em + id + ",";
  
      
                   checksetState(prevState => ({
            ...prevState,
            "a" :  checkstate.a + "," + id 
        })) 
        }
        else{
           /*  console.log("else"); */
     
        var e= checkstate.a;

         
                  var rp ="," + id ; 
               /* console.log("com");
            
            console.log("rp");
        console.log(rp);          
            console.log("e before");
        console.log(e);  */
         e = e.replace(rp,"");
   /* console.log("e after")
    console.log(e) */
        
               checksetState(prevState => ({
            ...prevState,
            "a" : e
        }))
        }
        
        
        
        
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
       stripped =str;
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
  url: 'https://themeshapp.herokuapp.com/main/tasks/add/',
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
    
    return(
    
        <div>
            <form className="form" onSubmit = {handleSubmit} id="taskform">
                
            <label>
            Task Name: <br/>
            <input type="text" id="task_name" onChange={handleChange} />
            </label>           
                <br/>
            <label>
            Description: <br/>
            <input type="text" id="task_desc" onChange={handleChange}  defaultValue="Desc" placeholder="desc"/>
            </label>   
                <br/>
            <label>
            Timedue <br/>
          
        <DatePicker className="form-element"
       isClearable
       
       placeholderText="Select Due Date"
       showTimeSelect
       dateFormat="Pp"
       selected={startDate}
       timeIntervals={60}
      
        
       onChange={date => setStartDate(date)}
  withPortal
 
       />
            </label>  
                 <br/>
                <label>
                    <h5>Assignee Users </h5>
        {/*
             {contacts.map(item => <div> <label>{item.email}<input type="checkbox" id={item.email} onChange={handleCheck}></input></label></div> )}        
             */}

{contacts.map(item => <div className="row" id="rowtaskform">  <div className="col"> {item.email}</div>   <div className="col" id="taskformmembers">   <input type="checkbox" id={item.email} onChange={handleCheck}></input></div></div> )}
              
            </label>                 
                <br/>
                <label>
                    <h5> Assignee Groups </h5>
        
             {state.groups.map(item =><div className="row"  id="rowgroupform">  <div className="col"> {item.groupname}</div> <div className="col"> <input type="checkbox" onChange={handlegroupCheck} id={item.groupname}></input></div></div> )}
            </label><br/>
             <input type="submit" value="Submit" id="btnsb"/>
            {/*   <input type="button" onClick={ checkset}/> */} 
            </form>
        </div>
    )
    
}

export default Taskform;