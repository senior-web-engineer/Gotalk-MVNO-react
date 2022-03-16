import routes from '../../../navigation/routes';
import NavigationLink from '../../components/navigation-link/navigation-link';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import './navigation-menu.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationMenu = ({
  addClass, classLink, links, onLinkClick, mapNav,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash === '#map-section') {
      const section = document.getElementById('map-section');
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const renderLinks = () => links.map((link) => (
    <NavigationLink
      onClick={onLinkClick}
      addClass={`header-link-navigation ${classLink}`}
      title={link.title}
      path={link.path}
      key={link.path}
    />
  ));

  const handleCoverageNavigation = () => {
    if (location.pathname !== routes.home) {
      navigate(`${routes.home}#map-section`);
    }

    const section = document.getElementById('map-section');
    section?.scrollIntoView({ behavior: 'smooth' });
    onLinkClick();
  };

  return (
    <div className={`navigation-menu ${addClass}`}>
      {mapNav && (
        <button
          onClick={handleCoverageNavigation}
          className={`header-link-navigation ${classLink}`}
          type="button"
        >
          Check coverage
        </button>
      )}
      {renderLinks()}
    </div>
  );
};
NavigationMenu.defaultProps = {
  onLinkClick: () => {},
  addClass: '',
  classLink: '',
  links: [
    { title: 'Shop plan', path: `${routes.plans}` },
    { title: 'How it works', path: `${routes.works}` },
    { title: 'FAQ', path: `${routes.faq}` },
    { title: 'Fraud Protection', path: `${routes.protect}` },
  ],
  mapNav: false,
};

NavigationMenu.propTypes = {
  addClass: PropTypes.string,
  classLink: PropTypes.string,
  links: PropTypes.array,
  onLinkClick: PropTypes.func,
  mapNav: PropTypes.bool,
};

export default NavigationMenu;
