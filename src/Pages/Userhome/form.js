import React,{useEffect,useState,useContext} from 'react';
import axios from 'axios';
import './form.css';
import store_groups from './store_groups';
import store_delete from './store_delete';

import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/js/src/collapse.js";
import "bootstrap/js/src/dropdown.js";


function Form(){
    const token = sessionStorage.getItem("token");
    var email = sessionStorage.getItem("email");

    var group;
    var res;
    var res2;
    var res3;
    var res4;
    var member_array;
    var b =[{"email":"divyasandhyahari@gmail.com"},{"email":"kezker1903@gmail.com"},{"email":"joshjon2017@gmail.com"},{"email":"krishnaanilkumar007@gmail.com"}];
    
    var g=[];
    var ip;
    var em =" ";
    var gn =" ";
    var flag = 1;
       const [state, setState] = useState({

          group_name:"",
          group_users :"",
          ei :""
    
     });
           
    const [checkstate, checksetState] = useState({
        a:""
    });
    
        const [checkgroupstate, checkgroupsetState] = useState({
        b:""
    });
    
    const handleChange = a =>{
        const {id , value} = a.target;   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    console.log(state);
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
    
    
    {/*
    const handleCheck = a =>{
        const {id , value} = a.target;   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    console.log(state);
    }    
    */}
    
    const handleCheck = a =>{
        const {id , value,checked} = a.target;  
        console.log("change on");
        console.log(id,checked);
        if(checked == true){
            console.log(id,checked);
        em = em + id + ",";
                       console.log("checkset.a");
                       console.log(checkstate.a);
      
                   checksetState(prevState => ({
            ...prevState,
            "a" :  checkstate.a + "," + id 
        })) 
  
             
            }
        else{
            console.log("else");
     
        var e= checkstate.a;

         
                  var rp ="," + id ; 
                console.log("com");
            
            console.log("rp");
        console.log(rp);          
            console.log("e before");
        console.log(e);
         e = e.replace(rp,"");
    console.log("e after")
    console.log(e)
        
               checksetState(prevState => ({
            ...prevState,
            "a" : e
        }))
     

                
        }
 

 checkset();

    }
    
    function checkset(){
        console.log("set");
        console.log(checkstate);
        console.log(checkgroupstate);
        
    }
    
    
        const handleSubmit = a =>{
            console.log("state 2");
        a.preventDefault();     
            
                var e= checkstate.a;
            
            if(e != ""){
                var s2 = e.substring(1);
                console.log("e ")
                console.log(e)
            var stripped =s2.replace(/\s+/g, '')
        console.log(stripped);
          res = stripped.split(",");
           res3 = res.map(function(val){
              return {"email":val}
          }) 
            }
            else{
                   res3=[]
            }
            
              e= checkgroupstate.b;
            if(e != ""){
           
                
                                console.log("e group")
                console.log(e)
                
                s2 = e.substring(1);
            stripped =s2;
        console.log(stripped);
          res = stripped.split(",");
           res4 = res.map(function(val){
              return {"groupname":val}
          })
            }
            else{
                   res4=[]
            }
   request();
console.log(res3);
console.log(res4);
        console.log(state);
            
                    const payload={
         //   "email":state.email,
         //   "password":state.password,
           "groupname":state.group_name,
           "created_by":{email},
            "group_users":res3,
            "group_groups":res4
            }
             console.log("data");
        console.log(payload);
            
            
            
    }
        
    function separate(){
          var str = state.members;
        console.log(str);
        const stripped =str;
        console.log(stripped);
          res = stripped.split(",");
        console.log(res);

         res3 = res.map(function(val){
              return {"email":val}
          })
     
        console.log("state1");
          console.log(res2);
      
        request();
    }
    
    function sep()
{
    console.log("hi");
}
    
    function request(){
    
   var data = JSON.stringify({"groupname":group,"created_by":{"email":email},"groupmembers":[{"email":"krishnaanilkumar007@gmail.com"}]});
   
        
        const payload_working={
         //   "email":state.email,
         //   "password":state.password,
           "groupname":state.group_name,
           "created_by":{email},
            "groupmembers":[{"email":"krishnaanilkumar007@gmail.com"}]
            }      
        const payload={
         //   "email":state.email,
         //   "password":state.password,
           "groupname":state.group_name,
           "created_by":{email},
            "group_users":res3,
            "group_groups":res4
            }
             console.log("data");
        console.log(payload);
        
var config = {
  method: 'post',
  url: 'https://themeshapp.herokuapp.com/main/groups/add/',
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
     refresh();
})
.catch(function (error) {
  console.log(error);
});
           
    }
   
       
    function refresh(){
        console.log("refresh");
               
        store_delete.dispatch({
            type: "delete_group",
            
        }) 
                  
        store_groups.dispatch({
            type: "load_home",
            
        }) 
          
            
     {/*  store_delete.dispatch({
            type: "delete_group",
            
        })*/} 
    }

    
     /*
        const payload={
         //   "email":state.email,
         //   "password":state.password,
           "groupname":state.group_name,
           "created_by":{email_id},
            "groupmembers":[{"email":"krishnaanilkumar007@gmail.com"}]
            }
     
       console.log("payload");
         console.log(payload);
       req = payload + axios.post("https://themeshapp.herokuapp.com/main/groups/add/", payload,{headers: {'Authorization': "Token " + token}
  }).then((response) => {
 
        console.log("response");
         console.log(response);
          switch(response.status)
              {
                case 200:
      
            console.log(response.data);
                      
            break;
      
          default:
              console.log("nope");
                      console.log("nope");
            

            break;
              }
      },
                                                             
          (error) => {
  console.log(error);
          
        }                                                   
                                                             
                                                             
    )  
    }*/
   console.log(sessionStorage.getItem("contacts")) 
    
    if(sessionStorage.getItem("contacts") != [])
        {
            b =  JSON.parse(sessionStorage.getItem("contacts")); 
            console.log("ud");
        }    
    if(sessionStorage.getItem("groups") != [])
        {
            var string =  sessionStorage.getItem("groups"); 
                g = string.split(",");
            console.log(g);
        }
    
    return(
    
        <div>
    
        
        
        <form onSubmit = {handleSubmit} id="form">
        <div><h5>
          <label>
              Group Name: 
    <input type="text" id="group_name" onChange={handleChange} />
        </label></h5>
        </div>
        <div>
           <label>
        <h4>Members</h4>
           
            
        </label>
         </div>
      
        <h5>Contacts</h5>
          {b.map(item => <div className="row" id="people">       <div className="col" id="indmembers">{item.email + " "} </div> <div className="col" id="chkmembers"><input type="checkbox"  id={item.email}  onChange={handleCheck}></input> </div> </div> )}          
       {/*
        <h5>Groups</h5>
          {g.map(item => <div className="row" id="group">  <ul id="email_list"> <div className="col" id="groupmembers"> {item + " "} </div> <div className="col" id="chkgroups"><input type="checkbox"  id={item}  onChange={handlegroupCheck}></input></div> </ul></div> )}        
          */}  
        <h5>Groups</h5>
          {g.map(item => <div className="row" id="group">   <div className="col" id="groupmembers"> {item + " "}</div> <div className="col" id="chkgroups"><input type="checkbox"  id={item}  onChange={handlegroupCheck}></input></div> </div> )}
            
        {/* <input type="button" onClick={ checkset}/>*/}
        <input type="submit" value="Submit" id="sub_btn"/>
    
        
        </form>
        
        
        </div>
    )
}

export default Form;