import left_img from './Images/lef.png'
import right_img from './Images/rih2.png'

import daily_planner from './Images/wd.png'
import task_list from './Images/task_list.png'

import './home.css'



 

function Home_desk() {
    
    

    
  return (
      
    <div>
            
      <div className="cnt" id="parent">
        
      <h1 className="mesh" id="heading_cnt">MESH</h1>
  
      <img alt="left_img" className="left_img" src={left_img} />
          <img alt="right_img" className="right_img" src={right_img} />
      </div>
      
      

      <div className = "feature" id="feature_1">
      
      <h1 className = "feature_heading" id="feature_1_heading">A Smart Daily Planner</h1>
      <p className = "feature_paragraph">Set yourself up for success with <br/>  My Day, intelligent  and personalized <br/>  suggestions to update your daily <br/>  to do list.</p>
       <img alt="daily_planner" className="daily_planner" src={daily_planner} />
      
      
      </div>
     
      <div className = "feature" id="feature_2">
      
      <h1 className = "feature_heading" id="feature_2_heading">Manage Your To Do List Online</h1>
      
      <p className = "feature_paragraph">A truly cross platform task manager.<br/> Whether you're at home or  on the <br/> go you can access  your task list and <br/> stay organized. </p>
      
      <img alt="task_list" className="task_list" src={task_list} />
      
      </div>
          
          
      <div className = "footer">

          
          <ul id="footer_one">•🌐Eng(India) &emsp; &emsp; • What's new &emsp; &emsp;© Mesh 2021  &emsp; &emsp; • Contact Us &emsp;&emsp;  • Company </ul>
          
          
      
      </div>
      
    </div>
      
  
  );
}

export default Home_desk;
