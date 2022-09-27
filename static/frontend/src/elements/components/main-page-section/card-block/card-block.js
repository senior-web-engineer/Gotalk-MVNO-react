/* eslint-disable max-len */
import phone from '../../../../assets/images/main-page/phone.png';
import phoneGo from '../../../../assets/images/main-page/phoneGo.png';
import React from 'react';
import './card-block.scss';

const CardBlock = ({isPlanPage}) => {

  return (
      <section className={`card-block ${isPlanPage ? 'plan-page' : ''}`}>
        {isPlanPage ? (
            <h2 className="card-block__toptitle">Why Go Talk Wireless?</h2>
        ) : null}
        <div className="card-block__item">
          <div className="card-block__information">
            <h2 className="card-block__title">Your Security Solution</h2>
            <ul className="card-block__list">
              <li className="card-block__list_item">
                <span className="card-block__list_circle" />
                We provide you with optional Two-Factor or Three Factor Authentication using Yubikey, which protects you
                from SIM fraud and hacking
              </li>
              <li className="card-block__list_item">
                <span className="card-block__list_circle" />
                We don’t sell or share your data
              </li>
              <li className="card-block__list_item">
                <span className="card-block__list_circle" />
                We have sitewide SSL configuration and sophisticated cloud infrastructure for the highest security possible
              </li>
            </ul>
          </div>
          <div className="card-block__image">
            <img src={phoneGo} alt="phoneGo" className="card-block__image_item" />
          </div>
        </div>
        <div className="card-block__item card-block__item-reverse">
          <div className="card-block__information card-block__information-reverse">
            <h2 className="card-block__title card-block__title-reverse">Nationwide Coverage & Fast Connectivity</h2>
            <ul className="card-block__list">
              <li className="card-block__list_item">
                <span className="card-block__list_circle" />
                99% US coverage for your calls, data, and texts
              </li>
              <li className="card-block__list_item">
                <span className="card-block__list_circle" />
                GoTalk uses the largest and fastest 5G network in America
              </li>
              <li className="card-block__list_item">
                <span className="card-block__list_circle" />
                We offer 5G Ultra Capacity - have speed as fast as WiFi on your phone
              </li>
            </ul>
          </div>
          <div className="card-block__image">
            <img src={phone} alt="phone" className="card-block__image_item" />
          </div>
        </div>
      </section>
  );
}

export default CardBlock;
