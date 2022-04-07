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
            <p className="how-it-works__instruction">
              1. Select a plan that suits you, your family or business and port in your number from
              your existing carrier if you need to.
            </p>
            <p className="how-it-works__instruction">
              2. Download the e-sim QR code and follow your handset instructions to “Convert to
              eSIM”
            </p>
            <p className="how-it-works__instruction">
              3. Wait a few moments for the eSIM to activate and for you with be live with Go Talk,
              a secure carrier that’s focused on your privacy and security... voila!
            </p>
            <p className="how-it-works__instruction">
              You’re done. Thought it would take longer, eh?
            </p>
            <p className="how-it-works__instruction">
              Don’t worry if you need a physical sim….we have those too… and they can be delivered
              in as little as 24 hours via Fedex.
            </p>
          </div>
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
