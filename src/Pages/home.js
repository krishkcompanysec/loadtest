import { Breakpoint } from 'react-socks';
import Home_desk from './Home/home_desk';
import HomeHeader from './Components/homeheader';
import Home_mobile from './Home/home_mob';

function Home(){
    
    
    return(
        <div>
        
        <Breakpoint large>
	<HomeHeader/>
        <Home_desk/>

        </Breakpoint>
        
        <Breakpoint medium >

       

        
        </Breakpoint>
        
        
        <Breakpoint small>

        <HomeHeader/>
        
        <Home_mobile/>

        </Breakpoint>
        </div>
    )
    
}

export default Home;