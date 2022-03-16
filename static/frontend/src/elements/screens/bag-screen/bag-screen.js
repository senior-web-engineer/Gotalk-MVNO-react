import './bag-screen.scss';
import routes from '../../../navigation/routes';
import NavigationBack from '../../components/ui-component/navigation-back/navigation-back';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BagScreen = ({ header, children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="bag-screen">
      <NavigationBack to={routes.home} />
      {header && <h1 className="bag-screen__header">{header}</h1>}
      {children}
    </section>
  );
};
BagScreen.defaultProps = {
  header: '',
  children: React.fragment,
};

BagScreen.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
};

export default BagScreen;
