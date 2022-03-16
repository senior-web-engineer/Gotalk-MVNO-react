import './protect-info.scss';
import { howItWorks } from '../../../data/meta-data';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const ProtectInfo = () => {
  useEffect(() => {
    document.body.scrollIntoView({
      block: 'start',
    });
  }, []);

  return (
    <>
      <Helmet>
        {howItWorks.map(({ key, value }) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Helmet>

      <section className="section-information-pages__protect">
        <h2 className="information-pages__title">Protect Against Sim Swap Fraud</h2>
        <article className="information-pages__article">
          <h3 className="information-pages__subtitle"> What is Sim Swap Fraud?</h3>
          <p className="information-pages__paragraph">
            Sim Swap Fraud is when a cybercriminal hijacks your phone number and ports it to a new
            Sim card in their possession.
          </p>
          <p className="information-pages__paragraph">
            Put simply, your phone number and access to all of your online accounts can fall into
            the hijackers hands. Once they’ve successfully moved your number onto their sim, they’re
            just a few clicks away from logging into your email, bank or crypto accounts.
          </p>
        </article>
        <h4 className="important-info">Over $100 million lost in Sim Swap Theft</h4>
        <p className="information-pages__paragraph">
          One of the most notorious examples of Sim Swap fraud saw the cryptocurrency theft of
          nearly $100 million from some of the most successful investors in America.
        </p>
        <p className="information-pages__paragraph">
          As reported by
          <a
            className="link-support__protect"
            href="https://krebsonsecurity.com/2021/12/ny-man-pleads-guilty-in-20-million-sim-swap-theft"
          >
            {' '}
            Krebs on Security
            {' '}
          </a>
          (a leader in security news and investigations) a 24-year-old New York man named Nicholas
          Truglia was part of the criminal group alleged to have stolen more than $100 million from
          cryptocurrency investors using Sim Swap Fraud.
        </p>
        <p className="information-pages__paragraph">
          Truglia and his team were able to SIM swap numerous major investors, draining their crypto
          accounts of millions. One of the biggest victims of the sim-swap crime was Michael Terpin
          who co-founded the first angel investor group for bitcoin enthusiasts.
        </p>
        <p className="information-pages__paragraph">
          Reached for comment, Terpin said his assailant got off easy:
        </p>
        <p className="information-pages__paragraph-talk">
          “I am outraged that after nearly four years and hundreds of pages of evidence that the
          best the prosecutors could recommend was a plea bargain for a single, relatively minor
          count of the unauthorized use of a Binance exchange account, when all the evidence points
          toward Truglia being one of two masterminds of a wide-ranging criminal conspiracy to steal
          crypto from me and others”
          <p className="information-author">Terpin told KrebsOnSecurity.</p>
        </p>
        <p className="information-pages__paragraph-margin">
          But Sim Swap Crime doesn’t just impact multi-millionaires. According to
          <a
            className="link-support__protect"
            href="https://www.abcactionnews.com/money/consumer/taking-action-for-you/cybercriminals-cleanout-cryptocurrency-using-sim-card-swap-scam"
          >
            {' '}
            ABC news,
            {' '}
          </a>
          Tampa resident David Bryant lost about $15,000 worth of crypto in October 2021. It was
          money he planned to use to help pay for some of his daughter’s college education.
        </p>
        <p className="information-pages__paragraph">
          Byrant knew he had become victim to Sim-Swap Fraud when his Coinbase notifications were
          deleted from his account and his login no longer worked.
        </p>
        <p className="information-pages__paragraph">
          Erin West, deputy district attorney working on the Truglia case, has said that SIM
          swapping is a major problem and a SIM swapping attack can be financially devastating.
        </p>
        <h5 className="important-info__title">How we protect you</h5>
        <article className="information-pages__article">
          <p className="information-pages__paragraph">
            Your security is our main focus. We created the Go Talk MVNO network to put an end to
            Sim Swap Fraud and the sale of your personal data.
          </p>
          <p className="information-pages__paragraph">
            <ul className="list-info-protect">
              <li className="list-information-protect">
                We give you the ability to protect your account from Sim Swap Fraud, by allowing 2
                factor and 3 factor authentication.
              </li>
              <li className="list-information-protect">We don’t sell or share your data. Ever.</li>
              <li className="list-information-protect">
                We have site wide SSL configuration and sophisticated cloud infrastructure for the
                highest security possible.
              </li>
            </ul>
          </p>
        </article>
      </section>
    </>
  );
};
export default ProtectInfo;
