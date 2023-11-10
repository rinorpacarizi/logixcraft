import React from 'react'
import UsersList from './components/UsersList'

const User = () => {
  const USERS = [
    {
    id:'u1',
    fullName: 'User 💕',
    email: 'email@gmail.com',
    address: 'somewhere',
    image: 'https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256',
    personalNum: 214541541656465,
    phoneNumber: 566416546,
  }
]


  return <UsersList items={USERS}/>
}
export default User;