import './plans-screen.scss';
import { plans } from '../../../data/meta-data';
import routes from '../../../navigation/routes';
import NavigationBack from '../../components/ui-component/navigation-back/navigation-back';
import Plans from '../../components/ui-component/plans/plans';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import TrustBadge from "../../components/main-page-section/trust-badge/trust-badge";
import CardBlock from "../../components/main-page-section/card-block/card-block";
import ReviewsBlock from "../../components/main-page-section/reviews-block/reviews-block";

const PlansScreen = () => {
  useEffect(() => {
    document.body.scrollIntoView({
      block: 'start',
    });
  }, []);

  return (
    <div className="plans-screen-container">
        <Helmet>
            {plans.map(({ key, value }) => (
              <meta key={key} name={key} content={value} />
            ))}
        </Helmet>

        <section className="plans-screen">
            <NavigationBack className="plans-screen__nav-back" to={routes.home} />
            <h1 className="plans-screen__header">SafeSim&trade; Plans</h1>
            <div className="plans-screen__sub">More Privacy. More Security. For Less</div>
            <div className="plans-screen__sub2">5G Included. 99% US Coverage. Move from any Carrier in under 10 mins.</div>
            <div className="plans-screen__video">
                <iframe src="https://www.youtube-nocookie.com/embed/917kcWeqpF0?start=16"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                </iframe>
            </div>
            <div className="plans-screen__cards-container">
                <Plans />
                <div className="plans-screen__oversea">
                    * Extra charges apply for use of phone services overseas and domestic allowance is not included
                </div>
                <TrustBadge />
            </div>
        </section>
        <CardBlock isPlanPage={true} />
        <ReviewsBlock />
    </div>
  );
};
export default PlansScreen;
