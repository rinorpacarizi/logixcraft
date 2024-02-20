import React from "react";
import { Icon } from "semantic-ui-react";
import "../css/footer.css";

export const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-main-section">
        <div className="footer-section-1">
          <p>Pricing</p>
          <p>Careers</p>
          <p>Contact us</p>
          <p>Legal</p>
          <p>Privacy Policy</p>
          <p>Help Center</p>
        </div>
        <div className="footer-section-2">
          <Icon link name="facebook" size="big" />
          <Icon link name="instagram" size="big" />
          <Icon link name="pinterest p" size="big" />
          <Icon link name="youtube" size="big" />
          <Icon link name="twitch" size="big" />
        </div>
        <div></div>
      </div>
  
      <div className="footer-section-3">
      <p>Copyright® 2024 LogixCraft</p>
      </div>
    </div>
  );
};
