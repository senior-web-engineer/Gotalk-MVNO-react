import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './footer-pages.scss';

const Support = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <section className="section-information-pages">
      <h2 className="information-pages__title">Support</h2>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">Support</h3>
        Here at Go Talk you can get connected with an actual human ASAP! Our customer service
        isavailable via Live Chat or Email between 8AM and 10PM Pacific Time, 7 Days a Week.
      </p>
      <div className="pink-line-support" />
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">Email Us:</h3>
        support@gotalkwireless.com
      </p>
      <div className="pink-line-support" />
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">Call Us:</h3>
        <p>+ (1) 949 209 5280</p>
        We are available for calls between 9AM and 5PM Pacific Time. Out of this time please contact
        us on live chat or via email for immediate support 7 days a week.
      </p>
    </section>
  );
};
export default Support;
