import React from 'react'
import { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { AuthContext } from '../../shared/components/context/auth-context';

const Authenticate = () => {
  const [isLogin, setIsLogin] = useState(true)
  const  auth = useContext(AuthContext);

  const switchModeHandler =() =>{
    setIsLogin(prevMode =>!prevMode);
  }

  const authLoginHandler = event =>{
    event.preventDefault();
    auth.login();
  }

  return (
    <>
    {isLogin &&(
    <Form onSubmit={authLoginHandler}>
     <Form.Field>
      <label>Email</label>
      <input placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' />
    </Form.Field>
    <Button type='submit'>Enter</Button>
  </Form>
  )}
  {!isLogin &&(
    <Form>
      <Form.Field>
     <label>Full Name</label>
     <input placeholder='FullName' />
   </Form.Field>
    <Form.Field>
     <label>Email</label>
     <input placeholder='Email' />
   </Form.Field>
   <Form.Field>
     <label>Password</label>
     <input placeholder='Password' />
   </Form.Field>
   <Form.Field>
     <label>Address</label>
     <input placeholder='Address' />
   </Form.Field>
   <Form.Field>
     <label>Password</label>
     <input placeholder='Password' />
   </Form.Field>
   <Form.Field>
     <label>Personal Number</label>
     <input placeholder='Personal Number' />
   </Form.Field>
   <Form.Field>
     <label>Phone Number</label>
     <input placeholder='Phone Number' />
   </Form.Field>
   <Button type='submit'>Sign Up</Button>
 </Form>
  )}
  <br />
  <Button onClick={switchModeHandler}>{isLogin ? 'Sign Up?' : 'Login?'}</Button>
  </>
  )
}

export default Authenticate;