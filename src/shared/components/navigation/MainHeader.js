import React from 'react'
import { Menu } from 'semantic-ui-react'

const MainHeader = props => {
  return (
    <Menu size='large'>
    <Menu.Menu position='right'>
    
      <Menu.Item
        name='signin'
        // active={activeItem === 'signup'}
        // onClick={this.handleItemClick}
      >
        Sign In
      </Menu.Item>

      <Menu.Item
        name='signup'
        // active={activeItem === 'help'}
        // onClick={this.handleItemClick}
      >
        Sign Up
      </Menu.Item>
    </Menu.Menu></Menu>
  )
}


export default MainHeader