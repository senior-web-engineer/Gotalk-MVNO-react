import './how-it-works.scss';
import { howItWorks } from '../../../data/meta-data';
import WorksScreen from '../../screens/works-screen/works-screen';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

const HowItWorks = () => (
  <>
    <Helmet>
      {howItWorks.map(({ key, value }) => (
        <meta key={key} name={key} content={value} />
      ))}
    </Helmet>

    <WorksScreen>
      <div className="how-it-works">
        <article className="how-it-works__article">
          <h3 className="how-it-works__title">How Easy is it to Switch to GoTalk?</h3>
          <p className="how-it-works__subtitle">
            Switching to GoTalk is as easy as 1-2-3! Swap from any carrier in as little as 10
            minutes.
          </p>
          <div className="how-it-works__instructions">
            <div className="how-it-works__instruction">
              <div className="how-it-works__instruction__number">1</div>
              Select a plan that suits you, your family or your business.
            </div>
            <div className="how-it-works__instruction">
              <div className="how-it-works__instruction__number">2</div>
              Scan the QR code and follow your activation instructions.
            </div>
            <div className="how-it-works__instruction">
              <div className="how-it-works__instruction__number">3</div>
              Enjoy a secure and Safe Sim experience direct from your phone.
            </div>
          </div>
          <p className="how-it-works__subtitle">
            Porting your existing number is quick and easy too. Find out more here.
          </p>
        </article>
        <article className="how-it-works__article">
          <h3 className="how-it-works__title">Why Go Talk?</h3>
          <p className="how-it-works__subtitle">
            Millions of dollars are stolen every year from SIM card fraud. GoTalk is a security
            conscious company that knows just how important your digital security it. With our
            SafeSim (tm) technology, you’ll rest easy knowing your digital assets and data are
            protected from Sim Swap fraud. Not only that, we’ll never sell or share your data.
            Don’t waste time, protect your wireless account with our SafeSim Two-Factor and Three-Factor Authentication today.
          </p>
        </article>
        <article className="how-it-works__article">
          <h3 className="how-it-works__title">Where am I Covered with GoTalk?</h3>
          <p className="how-it-works__subtitle">
            We offer 99% US coverage, including wide 5G Coverage! Explore our coverage map &
            type in the zip-code where you’d need coverage!
          </p>
        </article>
      </div>
    </WorksScreen>
  </>
);

export default HowItWorks;
