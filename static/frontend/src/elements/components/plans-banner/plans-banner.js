import './plans-banner.scss';
import handsWithPhone from '../../../assets/images/main-page/hands-with-phone.webp';
import routes from '../../../navigation/routes';
import ShowcaseBlock from '../ui-component/showcase-block/showcase-block';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlansBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.plans);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <ShowcaseBlock img={handsWithPhone}>
      <div className="plans-banner__content-wrapper">
        <p className="plans-banner__subtitle plans-banner__subtitle--big">Not all Sims are created equal</p>
        <p className="plans-banner__title">
          Welcome to SafeSim&trade;
        </p>
        <p className="plans-banner__subtitle">Protection against Sim Swap Fraud</p>
        <button
          onClick={handleClick}
          type="button"
          className="plans-banner__content-button"
        >
          View Plans
        </button>
      </div>
    </ShowcaseBlock>
  );
};

export default PlansBanner;
