import React from 'react';
import { Icon } from 'semantic-ui-react';

export const Footer = () => {
  return (
    <div>
        <div>
            <p>Pricing</p>
            <p>Careers</p>
            <p>Contact us</p>
            <p>Legal</p>
            <p>Privacy Policy</p>
            <p>Help Center</p>
        </div>
        <hr />
        <div>
            <Icon link name='facebook' size='big'/>
            <Icon link name='instagram' size='big'/>
            <Icon link name='pinterest p' size='big'/>
            <Icon link name='youtube' size='big'/>
            <Icon link name='twitch' size='big'/>
        </div>
        <div>
       <p>Copyright® 2024 LogixCraft</p> 
        </div>
    </div>
  )
}
