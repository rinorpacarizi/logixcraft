import React,{useState} from 'react'
import Header from '../shared/components/Navigation/Header'
import Main from './components/Main'
import { Footer } from './components/Footer';

const Homepage = () => {
  const [isLogin, setIsLogin] = useState(true);


  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
       <Header isLogin={isLogin} switchModeHandler={switchModeHandler}/> 
       <Main />
       <Footer />
    </>
  )
}

export default Homepage;