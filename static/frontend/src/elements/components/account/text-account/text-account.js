/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React from 'react';
import './text-account.scss';

const TextAccount = ({ description }) => (
  <section className="text-account">
    <h2 className="text-account__title">Instructions</h2>
    <ul className="text-account__list">
      {description.map((item) => (
        <li className="text-account__list-item" key={item.key}>
          {item.paragraph}
        </li>
      ))}
    </ul>
  </section>
);

TextAccount.defaultProps = {
  description: [
    {
      key: 0,
      paragraph:
        'To activate a SIM card, you must send the data for its registration to the email address info@gotalk.com You need to send the following information: two passport photos (main page and registration page) and a photo of the SIM card so that the phone number on it can be seen.',
    },
    {
      key: 1,
      paragraph:
        'In the subject line, you must write: The name of the tariff (10/30/40/50/100 GB / Unlimited $30/70/100) and the last name that you indicated when ordering this sim card on our website. Example: Super Online Unlimited 55 Zudin.',
    },
    {
      key: 2,
      paragraph:
        'Wait for a call from our employee or a response letter from us that the SIM card is activated. Activation usually occurs within 1 hour during business hours, within 2 hours in the evenings and weekends.',
    },
    {
      key: 3,
      paragraph:
        'After confirming the activation, you need to top up the balance for an amount slightly exceeding the subscription fee according to your tariff (by $1-2).',
    },
    {
      key: 4,
      paragraph:
        'After activation and replenishment of the subscription fee, the SIM card is ready for use, there is no need to make additional settings to the device.Enjoy your use!',
    },
  ],
};

TextAccount.propTypes = {
  description: PropTypes.array,
};
export default TextAccount;
