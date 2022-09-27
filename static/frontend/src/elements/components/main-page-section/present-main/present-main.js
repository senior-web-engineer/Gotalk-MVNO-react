/* eslint-disable react-hooks/exhaustive-deps */
import fiveG from '../../../../assets/images/icons/fiveG.svg';
import shield from '../../../../assets/images/icons/shield.svg';
import sim from '../../../../assets/images/icons/sim.svg';
import main from '../../../../assets/images/main-page/main.png';
import mainMini from '../../../../assets/images/main-page/mainMini.png';
import routes from '../../../../navigation/routes';
import Button from '../../ui-component/button/button';
import PresentBlock from '../../ui-component/present-block/present-block';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/logo/logo.svg';
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
      <PresentBlock imgFon={main} imgMini={mainMini}>
        <p className="present-main-content__information_text">
          <span>{isBusinessMode ? 'MORE PRIVACY & SECURITY' : 'MORE PRIVACY,'}</span><br/>
          <span>{isBusinessMode ? 'FOR YOUR BUSINESS' : 'MORE SECURITY,'}</span><br/>
          <span>FOR LESS.</span><br/>
          <b>{isBusinessMode ? 'Business ' : ''}Lines from $5/mo</b><br/>
          <b>Protected by SafeSim™</b><br/>
          <span className="small">Not all sim cards are created equal</span>
        </p>
        <Button onClick={() => clickMore()} title="find a plan" addClass="button" />
      </PresentBlock>
      <div className="present-main-protection">
        <span className="present-main-protection__orange">
          Over $100m lost to Sim Swap Fraud
        </span>
        <div className="present-main-protection__row">
          <span className="present-main-protection__black">
          Protect Yourself with
        </span>
          <img className="present-main-protection__logo" src={logo} alt="GoTalk Wireless"/>
        </div>
      </div>
      <div className="present-main-video">
        <iframe src="https://www.youtube-nocookie.com/embed/917kcWeqpF0?start=16"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
        </iframe>
      </div>
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
