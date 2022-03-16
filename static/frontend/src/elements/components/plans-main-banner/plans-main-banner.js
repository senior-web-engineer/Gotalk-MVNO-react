import './plans-main-banner.scss';
import manWithTablet from '../../../assets/images/main-page/man-with-tablet.webp';
import routes from '../../../navigation/routes';
import ShowcaseBlock from '../ui-component/showcase-block/showcase-block';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlansMainBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.plans);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <ShowcaseBlock img={manWithTablet} reversed>
      <div className="plans-main-banner__content-wrapper">
        <p className="plans-main-banner__title">Premium Wireless</p>
        <p className="plans-main-banner__subtitle">with Value Added Protection</p>
        <button
          onClick={handleClick}
          type="button"
          className="plans-main-banner__content-button"
        >
          View Plans
        </button>
      </div>
    </ShowcaseBlock>
  );
};

export default PlansMainBanner;
