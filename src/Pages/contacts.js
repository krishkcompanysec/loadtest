import Homeheader from './Userhome/userheader';
import { Link } from 'react-router-dom';
import pencil from './Images/pencil.png';
import React, {useLayoutEffect,useState,useEffect} from 'react';
import axios from 'axios';
import './contacts.css';

    
    var email;

    var name;

    var contacts_array = [{"email":""}]
    var global_contact;
   
    var flip;
var mb;

var res2 ;








/* ######################      ########################### */








function Contacts(){
     var c=[{"email": ""}];
             const [state, setState] = useState({
                 
         b:[],
     });    
    
    const [flagstate,setflag] = useState(0);
    
    flip = function flipstate(){
       /*  console.log("flip");
        console.log(flagstate);  */
        
        if(flagstate === 0)
            {
              /*   console.log("set 1"); */
            setflag(1)
            }
        else
            {
              /*    console.log("set 0"); */
            setflag(0)
            }
       /* console.log(flagstate); */
    }
    
     useEffect(() => {
          var email = sessionStorage.getItem("email");
          
          name = sessionStorage.getItem("name");
        /*   console.log(name); */
          

         
       /*   console.log("use layout");
          console.log(email); 
 console.log(name); */
        fetch_contacts();
    
     
    },[])
   
        /* ######################  Fetch Contacts ########################### */
    
    function fetch_contacts(){
       email = sessionStorage.getItem("email");
        const token = sessionStorage.getItem("token");
        var config = {
        method: 'get',
        url: 'https://themeshapp.herokuapp.com/authentication/profile/show/',
        headers: { 
            'Authorization': 'Token ' + token, 
            'Content-Type': 'application/json'
        }
        };

       axios(config).then(function (response) {
           /*  console.log(response);
            console.log("JSON.stringify(response.data)");
            console.log(JSON.stringify(response.data)); */
        contacts_array  = response.data["contacts"];
           console.log(contacts_array);
        name  = response.data["name"];
        sessionStorage.setItem("name",name); 
        sessionStorage.setItem("contacts",JSON.stringify(contacts_array)); 
     /*    console.log("name before assign");
        console.log(name);
       
       console.log(name); */
            /* console.log(contacts_array); */
            setState({b:contacts_array});
            c = state.b;
            c = contacts_array;
         /*      console.log("c");
              console.log(c); */
            global_contact = c;
            flip();
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    /* ######################   ########################### */

    
    
    return(
    
        <div>
        <Homeheader/>
        
        <div id="parent_userhome">

            <div id="child_userhome">


             <h3>Contacts</h3> <br/> 
                {state.b.map(item => (<ul id="contact_element_list"><div className="container" id="contactgroup_element">{item.email}</div></ul>))}              
                
                {/*
                
                {a.map(item => (<ul id="contact_element_list"><div className="container" id="group_element">{item.email}</div></ul>))}
                */}
           

                <Add/>
                
            </div>
            </div>
        
        </div>
    )
    
       
}

/* ######################      ########################### */

function Add(){
     const token = sessionStorage.getItem("token");
          
     const [addstate, addsetState] = useState({

     contact:[],
         
     });    
    
     const handleChange = a =>{
        const {id , value} = a.target;  
         console.log("change");
         console.log(addstate);
        addsetState(prevState => ({
            ...prevState,
            [id] : value
        }))}
     
    const handleSubmit = a =>{
        a.preventDefault();  
        console.log("state ");
        console.log(addstate.contact);
        var str = addstate.contact;
        const stripped =str.replace(/\s+/g, '')
        var res = stripped.split(",");
        console.log(res);

         res2 = res.map(function(val){
              return {"email":val}
          })
       /*  console.log(res2);
        console.log("name");
                console.log(name); */
        
        append();
               
    }
           
    function append(){
        mb = global_contact.concat(res2);
    /*     console.log(mb);
        console.log(name);
        console.log("name"); */
        request();
    }
          
    function request(){
        name = sessionStorage.getItem("name");
    {/*var data = JSON.stringify({"user":{"email":email},"name":name,"contacts":state.contact});*/}
    var data = {"email":email,"name":name,"contacts":mb}
    console.log(data);
        var config = {
          method: 'put',
          url: 'https://themeshapp.herokuapp.com/authentication/profile/edit/',
          headers: { 
            'Authorization': 'Token ' + token, 
            'Content-Type': 'application/json'
          },
          data : data
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
        
        
        <h4>Add to list</h4>
        
        <br/>
                <form id="addform"   onSubmit = {handleSubmit} >
        <div>
          <label>
            Contact Email: 
    <input type="text" id="contact" onChange={handleChange}  />
        </label>          
        </div>
       <br/>
       <br/>
        <input type="submit" value="Submit" id="name_btn"/>
    
        
        </form>
        
        
        
        </div>
    )
    
    
}



/* ######################      ########################### */
export default Contacts;