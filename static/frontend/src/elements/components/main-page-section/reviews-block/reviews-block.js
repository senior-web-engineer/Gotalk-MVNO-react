/* eslint-disable max-len */
import quotes from '../../../../assets/images/icons/quotes.svg';
import DropCard from '../../ui-component/drop-card/drop-card';
import React from 'react';
import './reviews-block.scss';

const ReviewsBlock = () => (
  <section className="section-reviews">
    <div className="reviews-header">
      <img src={quotes} alt="quotes" className="reviews-quotes" />
      <h2 className="reviews__title">
        Real stories from
        {' '}
        <p className="reviews__title-customers">
          Real Customers
          <img src={quotes} alt="quotes" className="reviews-quotes reviews-quotes--reversed" />
        </p>
      </h2>
    </div>
    <div className="reviews__block">
      <div className="reviews__block-items_left">
        <DropCard>
          <p className="reviews__block-items_left-text">
            I invest in cryptocurrency and I was really anxious about my own wallet becoming a
            target and started looking for solutions so I would never get hacked. GoTalk was the
            best option for my crypto needs. Love using Yubikey, and I feel good knowing for sure I
            won’t get SIM Swapped. It’s the safest service out there, in my opinion.
          </p>
          <span className="reviews__label">Kevin R.</span>
          <span className="reviews__sublabel">Verified GoTalk User</span>
        </DropCard>
      </div>
      <div className="reviews__block-items">
        <DropCard>
          To be honest, I’ve spent more time waiting in line for the women’s room than switching to
          GoTalk - the whole process of changing carriers was lightning fast and easy!
          <span className="reviews__label">Kate A.</span>
          <span className="reviews__sublabel">Verified GoTalk User</span>
        </DropCard>
        <DropCard>
          Data is currency and I feel like a target.I really like that GoTalk is family owned, cares
          about my data privacy and safety, and that I can quickly talk to an actual human when I
          reach out to their customer service.
          <span className="reviews__label">Natasha L.</span>
          <span className="reviews__sublabel">Verified GoTalk User</span>
        </DropCard>
      </div>
      <div className="reviews__block-items_right">
        <DropCard addClass="reviews__block_width">
          <p className="reviews__block-items_right-text">
            After a data breach on my previous network, I realized I needed a service with more
            security for me and my employees. So I did some research and decided to use GoTalk for
            my business. GoTalk is a great fit for my company’s needs, because of their commitment
            to security & excellent customer service. I was able to get everyone on staff switched
            over so quickly. The coverage is speedy and unparalleled, and my employees are quite
            happy I changed service for everyone’s safety & privacy.
          </p>
          <span className="reviews__label">James W.</span>
          <span className="reviews__sublabel">Verified GoTalk User</span>
        </DropCard>
      </div>
    </div>
  </section>
);

export default ReviewsBlock;
