import './faq.scss';
import { FAQs } from '../../../data/meta-data';
import routes from '../../../navigation/routes';
import FaqList from '../../components/faq-list/faq-list';
import NavigationBack from '../../components/ui-component/navigation-back/navigation-back';
import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Faq = () => {
  useEffect(() => {
    document.body.scrollIntoView({
      block: 'start',
    });
  }, []);
  return (
    <>
      <Helmet>
        {FAQs.map(({ key, value }) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Helmet>

      <section className="faq">
        <NavigationBack to={routes.home} />
        <h1 className="faq__header">FAQ</h1>
        <FaqList />
      </section>
    </>
  );
};
export default Faq;
