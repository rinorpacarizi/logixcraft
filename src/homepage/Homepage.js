import React,{useState} from 'react'
import Header from '../shared/components/Navigation/Header'

const Homepage = () => {
  const [isLogin, setIsLogin] = useState(true);


  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
       <Header isLogin={isLogin} switchModeHandler={switchModeHandler}/> 
    </>
  )
}

export default Homepage