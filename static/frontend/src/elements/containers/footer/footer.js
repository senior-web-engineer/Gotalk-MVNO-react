import './footer.scss';
import logo from '../../../assets/images/logo/logo-white.svg';
import routes from '../../../navigation/routes';
import UpHeader from '../../components/up-header/up-header';
import NavigationMenu from '../navigation-menu/navigation-menu';
import React from 'react';

const Footer = () => {
  const linksPolicy = [
    { title: 'Terms & Conditions', path: routes.termsConditions },
    { title: 'Privacy Policy', path: routes.privacy },
    { title: 'Return Policy', path: routes.returnPolicy },
    { title: 'Acceptable Use Policy', path: routes.acceptable },
  ];
  const linksSupports = [
    // { title: '911 & E911 Diclosure', path: '/diclosure' },
    { title: 'Support', path: '/support' },
    // { title: 'Preparid MTS Surchare', path: '/surchare' },
  ];

  return (
    <footer className="footer">
      <div className="footer-block">
        <div className="footer-block-logo">
          <UpHeader addClass="footer-up-heder" />
          <div className="footer-logo">
            <img src={logo} alt="GoTalk" />
          </div>
        </div>
        <div className="footer-block-link">
          <NavigationMenu mapNav addClass="footer-navigation" classLink="footer-link-nav" />
          <div className="footer-block-link__policy">
            <NavigationMenu
              addClass="footer-navigation"
              classLink="footer-link"
              links={linksPolicy}
              mapNav={false}
            />
          </div>
          <NavigationMenu
            addClass="footer-navigation"
            classLink="footer-link"
            links={linksSupports}
            mapNav={false}
          />
          <div className="footer-link-go">© Gotalk, 2022 </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
