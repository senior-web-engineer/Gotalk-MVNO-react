/* eslint-disable react-hooks/exhaustive-deps */
import fiveG from '../../../../assets/images/icons/fiveG.svg';
import shield from '../../../../assets/images/icons/shield.svg';
import sim from '../../../../assets/images/icons/sim.svg';
import main from '../../../../assets/images/main-page/main.webp';
import mainMini from '../../../../assets/images/main-page/mainMini.webp';
import routes from '../../../../navigation/routes';
import PlansMainBanner from '../../plans-main-banner/plans-main-banner';
import Button from '../../ui-component/button/button';
import PresentBlock from '../../ui-component/present-block/present-block';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './present-main.scss';

const PresentMain = () => {
  const isBusinessMode = useSelector((state) => state.mainReducer.isModeBusiness);
  const navigate = useNavigate();
  const clickMore = () => {
    navigate(routes.plans);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="present-main-block">
      {isBusinessMode ? (
        <PlansMainBanner />
      ) : (
        <PresentBlock imgFon={main} imgMini={mainMini}>
          <p className="present-main-content__information_text">
            <b>Over $100 Million<br/>Stolen by Sim Swap Fraud.</b><br/><br/>
            <span>Get Added Protection<br/>With Our Revolutionary<br/>SafeSim™</span>
          </p>
          <Button onClick={() => clickMore()} title="find a plan" addClass="button" />
        </PresentBlock>
      )}
      <div className="present-main-technologies">
        <div className="present-main-technologies_block">
          <div className="technologies_block-item">
            <img src={shield} alt="main" className="technologies_block-image" />
            <p className="technologies_block-text">
              Protect against Sim Hacks 3 factor Authentication with Yubikey
            </p>
          </div>
          <div className="technologies_block-item">
            <img src={sim} alt="main" className="technologies_block-image" />
            <p className="technologies_block-text">
              E-Sim technology<br/>Move from any carrier in under 10 minutes
            </p>
          </div>
          <div className="technologies_block-item">
            <img src={fiveG} alt="main" className="technologies_block-image" />
            <p className="technologies_block-text">99% US coverage with 5G capabilities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentMain;
