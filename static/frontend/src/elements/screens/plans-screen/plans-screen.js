import './plans-screen.scss';
import { plans } from '../../../data/meta-data';
import routes from '../../../navigation/routes';
import NavigationBack from '../../components/ui-component/navigation-back/navigation-back';
import Plans from '../../components/ui-component/plans/plans';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const PlansScreen = () => {
  useEffect(() => {
    document.body.scrollIntoView({
      block: 'start',
    });
  }, []);

  return (
    <>
      <Helmet>
        {plans.map(({ key, value }) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Helmet>

      <section className="plans-screen">
        <NavigationBack className="plans-screen__nav-back" to={routes.home} />
        <h1 className="plans-screen__header">Shop plan</h1>
        <div className="plans-screen__cards-container">
          <Plans />
        </div>
      </section>
    </>
  );
};
export default PlansScreen;
