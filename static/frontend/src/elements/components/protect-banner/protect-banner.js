import './protect-banner.scss';
import coins from '../../../assets/images/main-page/cryptocoins.webp';
import routes from '../../../navigation/routes';
import ShowcaseBlock from '../ui-component/showcase-block/showcase-block';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.protect);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <ShowcaseBlock img={coins} reversed>
      <div className="protect-banner__content-wrapper">
        <p className="protect-banner__title">Don&apos;t leave your Digital Portfolio vulnerable.</p>
        <p className="protect-banner__subtitle">Protect yourself against Sim Swap Fraud</p>
        <button
          onClick={handleClick}
          type="button"
          className="protect-banner__content-button"
        >
          Learn More
        </button>
      </div>
    </ShowcaseBlock>
  );
};

export default ProtectBanner;
