import React,{useEffect,useState,useContext} from 'react';

function Surveydefn(){
    /*#####################################*/
    const [textstate, textsetState] = useState({
 
    text:[],
     
    });    
    
    const [textdatastate, textdatasetState] = useState({});    

    
    const [state, setState] = useState({
 
    text:[],
    check:[]
     
    });
    
    const handleChange = a =>{
        const {id , value} = a.target;   
        textdatasetState(prevState => ({
            ...prevState,
            [id] : value
        }))
    console.log(textdatastate);
    }   
    
        
    function increment_text(){
        var cnt = textstate.text;
        var ap = [1];
        cnt = cnt.concat(ap);
        console.log(cnt)
        textsetState({text:cnt})
    }
    
    
    const handleSubmit = a =>{
            console.log("state");
        a.preventDefault();       
        var text_inputs = Object.values(textdatastate)
        console.log(text_inputs);
    }
    
      /*#####################################*/
    

          /*#####################################*/
      
    return(
    
        <div>
         <div id="parent_userhome">

            <div id="child_userhome">
                           
                 {textstate.text.map((item, index) => (<ul id="contact_element_list"><div className="container" id="group_element">Input {index}<input type="text" id={index} onChange={handleChange} /></div></ul>))}                 

        
                <form>
    
                </form>
        
        
                <button onClick={increment_text}>Add Text</button>                  
                <button>Add Check</button>                
                <button onClick={handleSubmit}>Submit</button>
            </div>
            </div>
        </div>
    )
    
}

export default Surveydefn;