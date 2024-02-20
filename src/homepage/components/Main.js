import React from "react";
import { Button, Image, Icon } from "semantic-ui-react";
import "../css/main.css";
import abovefood from "../../images/homepage/abovefood.png";
import brew from "../../images/homepage/Brewgooder.png";
import ferm from "../../images/homepage/FermFood.png";
import nestle from "../../images/homepage/nestle.png";
import realgood from "../../images/homepage/realgood.png";
import coca from "../../images/homepage/coca.png";
import serca from "../../images/homepage/serca.png";
import wholefoods from "../../images/homepage/wholefoods.png";
import section1 from "../../images/section1.png";
import section2 from "../../images/section2.png";
import section5 from "../../images/section5.jpg";
import section6 from "../../images/section6.jpg";

const Main = () => {
  return (
    <div>
      <div className="main-section-1">
        <div className="section-1">
          <h3>WHOLESALE PLATFORM</h3>
          <h1>Be the best in your business</h1>
          <p>
            LogixCraft is the unified wholesale platform, powering the world's
            best businesses at ~168,000 locations worldwide.*
          </p>
          <Button color="orange" content="Watch Demo" circular size="massive" />
        </div>
        <Image src={section1} size="large" />
      </div>
      <div className="main-section-2">
        <Image src={section2} />
        <div className="section-2">
          <h1>Become the go-to store.</h1>
          <p>
            Grow your revenue, keep costumers happy by having a constant stock!
          </p>
          <Button
            content="Learn more"
            color="red"
            basic
            circular
            size="massive"
            className="section-2-button"
          />
        </div>
      </div>
      <div className="main-section-3">
        <h1>Grow faster with LogixCraft</h1>
        <p>
          From timesaving tools and automations to insights that help you plan
          your next move, LogixCraft helps the world's best businesses get even
          better.
        </p>
        <div className="section-3">
          <div>
            <Icon name="clock" size="big" />
            <h1>Fast, intuative platform</h1>
            <p>
              Innovative multilocation tools, integrations and reports
              configured for your unique business—all in one easy-to-use system.
            </p>
          </div>
          <div>
            <Icon name="chart line" size="big" />
            <h1>Industry-leading insights</h1>
            <p>
              Performance-boosting insights so you know what to do next.
              Real-time reporting and visibility across your entire operation
            </p>
          </div>
          <div>
            <Icon name="star" size="big" />
            <h1>Tailored assistance</h1>
            <p>
              Customized onboarding and expert support for wholesale success,
              with personalized assistance from industry professionals, ensuring
              a seamless experience for your business.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="main-section-4">
          <h2>Powering the world's best businesses</h2>
          <div className="section-4">
            <Image src={abovefood} />
            <Image src={brew}/>
            <Image src={coca}/>
            <Image src={serca}/>
            <Image src={ferm}/>
            <Image src={nestle}/>
            <Image src={realgood}/>
            <Image src={wholefoods}/>
          </div>
        </div>
      </div>
      <div>
        <div className="main-section-5">
          <div className="section-5">
            <h1>The commerce platform for ambitious businesses.</h1>
            <h3>
              From blazing fast workflows to a full suite of integrations,
              Lightspeed gives you one touchpoint for all your business needs.
            </h3>
            <hr />
            <p>
              <Icon name="check" color="green" size="small" /> Multichannel and
              multilocation
            </p>
            <hr />
            <p>
              <Icon name="check" color="green" size="small" /> Inventory
              management
            </p>
            <hr />
            <p>
              <Icon name="check" color="green" size="small" /> Fully integrated
              payments
            </p>
            <hr />
            <p>
              <Icon name="check" color="green" size="small" /> Real-time
              reporting and insights
            </p>
          </div>
          <Image src={section5} size="huge" />
        </div>
        <div className="main-section-6">
          <Image src={section6} size="large" />
          <div className="section-6">
            <h1>Your partner in success.</h1>
            <h3>
              With personalized 24/7 support and solutions that scale with your
              business, LogixCraft is not just a platform—we're a partner. Find
              out why we're trusted by retail and hospitality businesses in over
              100 countries.
            </h3>
            <h3>
              <a href="">
                Meet our expert support team{" "}
                <Icon name="angle right" size="large" color="red" />
              </a>
            </h3>
          </div>
        </div>
      </div>
      <div className="section-7">
        <h1>Choose to LogixCraft and grow your business</h1>
        <Button color="orange" size="Massive" circular content="Begin the journey!" />
      </div>
    </div>
  );
};

export default Main;
