import logo from './logo.svg';
import './App.css';


import Home from './Pages/home';
import Login from './Pages/login';
import Userhome from './Pages/userhome';
import Profile from './Pages/profile';
import Entireeditprofile from './Pages/entireeditprofile';
import Trial from  './Pages/trial';
import Trial2 from  './Pages/trial2';
import Contacts from  './Pages/contacts';
import Surveydefn from './Pages/Userhome/surveydefn';
import Signup from  './Pages/signup';

import { BreakpointProvider } from 'react-socks';


/* ######################    Links    ########################### */
import { Router,Route, Switch } from "react-router";
import {HashRouter,BrowserRouter} from "react-router-dom";



function App() {
  return (
      
    <BreakpointProvider>
      
      
    <div className="App">
        <BrowserRouter>
        <Route exact path="/" component={Home} />  
        <Route exact path="/login" component={Login} />  
        <Route exact path="/signup" component={Signup} />  
        <Route exact path="/userhome" component={Userhome} /> 
        <Route exact path="/profile" component={Profile} /> 
        <Route exact path="/profileedit" component={Entireeditprofile} /> 
        <Route exact path="/trial"  component={Trial} /> 
        <Route exact path="/trial2"  component={Trial2} /> 
        <Route exact path="/contacts"  component={Contacts} /> 
        <Route exact path="/surveydefn"  component={Surveydefn} /> 
         

        
        </BrowserRouter>   
    </div>
      
    </BreakpointProvider>
  );
}

export default App;
