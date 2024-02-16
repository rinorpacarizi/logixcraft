import React from "react";
import { Button, Image, Icon } from "semantic-ui-react";
import abovefood from "../../images/homepage/abovefood.png"
import brew from "../../images/homepage/Brewgooder.png"
import ferm from "../../images/homepage/FermFood.png"
import nestle from "../../images/homepage/nestle.png"
import realgood from "../../images/homepage/realgood.png"
import coca from "../../images/homepage/coca.png"
import serca from "../../images/homepage/serca.png"
import wholefoods from "../../images/homepage/wholefoods.png"


const Main = () => {
  return (
    <div>
      <div>
        <p>WHOLESALE PLATFORM</p>
        <h2>Be the best in your business</h2>
        <p>
          LogixCraft is the unified wholesale platform, powering the world's
          best businesses at ~168,000 locations worldwide.*
        </p>
        <Button content="Watch Demo" />
      </div>
      <div>
        <div>
          <h2>Become the go-to store.</h2>
          <p>
            Grow your revenue, keep costumers happy by having a constant stock!
          </p>
          <Button content="Learn more" />
        </div>
        <div>
          <Image src="" size="large" />
        </div>
      </div>
      <div>
        <h3>
            Grow faster with LogixCraft 
        </h3>
        <p>From timesaving tools and automations to insights that help you plan your next move, LogixCraft helps the world's best businesses get even better.</p>
        <div>
            <div>
                <Icon name="clock"/>
                <h3>Fast, intuative platform</h3>
                <p>Innovative multilocation tools, integrations and reports configured for your unique business—all in one easy-to-use system.</p>
            </div>
            <div>
            <Icon name="chart line"/>
            <h3>Industry-leading insights</h3>
            <p>Performance-boosting insights so you know what to do next. Real-time reporting and visibility across your entire operation</p>
            </div>
            <div>
            <Icon name="star"/>
            <h3>Tailored assistance</h3>
            <p>Customized onboarding and expert support for wholesale success, with personalized assistance from industry professionals, ensuring a seamless experience for your business.</p>
            </div>
        </div>
        <div>
            <h2>Powering the world's best businesses</h2>
            <Image src={abovefood} size="small" />
            <Image src={brew} size="small" />
            <Image src={coca} size="small" />
            <Image src={serca} size="small" />
            <Image src={ferm} size="small" />
            <Image src={nestle} size="small" />
            <Image src={realgood} size="small" />
            <Image src={wholefoods} size="small" />     
        </div>
      </div>
      <div>
        <div>
            <Image src="" size="large" />
            <div>
            <h2>The commerce platform for ambitious businesses.</h2>
            <h4>From blazing fast workflows to a full suite of integrations, Lightspeed gives you one touchpoint for all your business needs.</h4>
            <hr />
            <p><Icon name="check" color="green" size="small"/>  Multichannel and multilocation</p>
            <hr />
            <p><Icon name="check" color="green" size="small"/>  Inventory management</p>
            <hr />
            <p><Icon name="check" color="green" size="small"/>  Fully integrated payments</p>
            <hr />
            <p><Icon name="check" color="green" size="small"/>  Real-time reporting and insights</p>
            </div>
        </div>
        <div>
            <div>
            <h2>Your partner in success.</h2>
            <h4>With personalized 24/7 support and solutions that scale with your business, Lightspeed is not just a platform—we’re a partner. Find out why we're trusted by retail and hospitality businesses in over 100 countries.</h4>
            <h4><a href="">Meet our expert support team <Icon name="angle right" size="large" color="red"/></a></h4>
            
            </div>
<Image src="" size="large" />
        </div>
      </div>
      <div>
        <h2>Choose to LogixCraft and grow your business</h2>
        <Button content="Begin the journey!"/>
      </div>
    </div>
  );
};

export default Main;
