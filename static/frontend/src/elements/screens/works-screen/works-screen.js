import './works-screen.scss';
import routes from '../../../navigation/routes';
import NavigationBack from '../../components/ui-component/navigation-back/navigation-back';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const WorksScreen = ({ children }) => {
  useEffect(() => {
    document.body.scrollIntoView({
      block: 'start',
    });
  }, []);
  return (
    <section className="how-it-works-screen">
      <NavigationBack to={routes.home} />
      <h1 className="how-it-works-screen__header">How it works</h1>
      {children}
    </section>
  );
};
WorksScreen.defaultProps = {
  children: React.Fragment,
};

WorksScreen.propTypes = {
  children: PropTypes.node,
};

export default WorksScreen;
