import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './footer-pages.scss';

const ReturnPolicy = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="section-information-pages">
      <h2 className="information-pages__title">Return Policy</h2>
      <p className="information-pages__paragraph">
        New connections can be cancelled within 7 days for a full refund.
      </p>
      <p className="information-pages__paragraph">
        We want to make sure you are happy with our service and are here to assist you should you
        want to cancel. Please contact customer care via live chat or email and we will facilitate a
        refund within 14 days of the request.
      </p>
    </section>
  );
};
export default ReturnPolicy;
