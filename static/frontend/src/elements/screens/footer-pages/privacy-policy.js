import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './footer-pages.scss';

const PrivacyPolicy = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <section className="section-information-pages">
      <h2 className="information-pages__title">Privacy Policy</h2>
      <p className="information-pages__paragraph">
        Go Talk is a value added technology based carrier. Go Talk allows persons seeking wireless
        service to connect in the United States. Go Talk is committed to protecting your privacy and
        confidential information acquired through this service. You acknowledge that you have read
        this Privacy statement of Go Talk by Go Talk LLC, and agree to its terms.
      </p>
      <p className="information-pages__paragraph">
        We collect various information about you through your use of this website, both personal and
        non-personal. Personal information includes matters such as your name, address, telephone
        number and e-mail address. This type of personal information may be acquired when you create
        an account with Go Talk by entering your personal information into a form; through your
        e-mails and communication with us; and your participation in surveys and marketing or
        promotional events. Other personal information may include credit and debit card information
        when entering into a transaction through the website. We may share or disclose your personal
        identifiable information with third parties, as required by law including subpoena, those
        you authorize us to provide information to, law enforcement or other governmental agency if
        we in our sole discretion determine a violation of law or risk of harm exists, and to
        enforce or protect the terms of the privacy policy.
      </p>
      <p className="information-pages__paragraph">
        Non-personal information may include certain geographical and demographic information and
        information regarding your usage history and tendencies. We collect this type of
        non-personal information through your IP Address, “Cookies” and web beacons when you are
        using the website. The information acquired through these technical means does not provide
        any personal identifiable information about you, but merely your usage history, patterns,
        tendencies and habits. This information is used by us to better serve your customer needs,
        to provide technical support, to better provide you with marketing and promotional items, to
        help in making changes to the website and to help us better address your needs as a user of
        this service
      </p>
      <p className="information-pages__paragraph">
        If you are a California resident who has provided personal identifiable information on this
        website, you may request information regarding our disclosures to third parties, if any, of
        your personal identifiable information. Said requests can be made by contacting us at the
        contact information provided below and titling said request “Request for California Privacy
        Information” on the message or subject line.
      </p>
      <p className="information-pages__paragraph">Contacting Us</p>
      <p className="information-pages__paragraph">
        If you have any questions about this policy, please call us at 1-(949) 209 5280 or email us
        at: support@gotalkwireless.com, or write us at:
      </p>
      <p className="information-pages__paragraph">Go Talk LLC</p>
      <p className="information-pages__paragraph">28202 Cabot Road, Suite 300</p>
      <p className="information-pages__paragraph">Laguna Nigel, CA 92677</p>
      <p className="information-pages__paragraph">
        Although Go Talk LLC will in most circumstances be able to receive your e-mail or other
        information provided through this website, Go Talk LLC does not guarantee that it will
        receive all such e-mail or other information timely and accurately and shall not be legally
        obligated to read, act on or respond to any such e-mail or other information. We will always
        try our best to reply to all emails from persons who need help or help learning to use or
        navigate our website
      </p>
      <p className="information-pages__paragraph">Copyright © 2021 GO TALK All Rights Reserved.</p>
      <p className="information-pages__paragraph">
        GO TALK is a registered trademark of Go Talk LLC.
      </p>
    </section>
  );
};
export default PrivacyPolicy;
