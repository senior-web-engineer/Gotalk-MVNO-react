/* eslint-disable react-hooks/exhaustive-deps */
import { home } from '../../../data/meta-data';
import Banner from '../../components/main-page-section/banner/banner';
import Carousel from '../../components/main-page-section/carousel/carousel';
import CardBlock from '../../components/main-page-section/card-block/card-block';
import MapBlock from '../../components/main-page-section/map-block/map-block';
import PresentMain from '../../components/main-page-section/present-main/present-main';
import ReviewsBlock from '../../components/main-page-section/reviews-block/reviews-block';
import Tariffs from '../../components/main-page-section/tariffs/tariffs';
import PlansBanner from '../../components/plans-banner/plans-banner';
import ProtectBanner from '../../components/protect-banner/protect-banner';
import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import './main.scss';
import TrustBadge from "../../components/main-page-section/trust-badge/trust-badge";

const Main = () => {
  const { pathname } = useLocation();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#map-section') {
      const section = document.getElementById('map-section');
      section?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <>
      <Helmet>
        {home.map(({ key, value }) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Helmet>

      <div>
        <PresentMain />
        <Tariffs />
        <TrustBadge />
        <PlansBanner />
        <Carousel/>
        <Banner />
        <ProtectBanner />
        <CardBlock />
        <ReviewsBlock />
        <MapBlock />
      </div>
    </>
  );
};
export default Main;
