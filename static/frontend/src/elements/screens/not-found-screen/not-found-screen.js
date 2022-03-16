import './not-found-screen.scss';
import NotFoundImage from '../../../assets/images/404/not-found.png';
import routes from '../../../navigation/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundScreen = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(routes.home);

  return (
    <section className="not-found-screen">
      <div className="not-found-screen__container">
        <div className="not-found-screen__info">
          <h1 className="not-found-screen__header">404 error</h1>
          <p className="not-found-screen__subtitle">
            The page you are looking for can&apos;t be found
          </p>
          <button onClick={handleBack} className="not-found-screen__button" type="button">
            GO TO HOMEPAGE
          </button>
        </div>
        <img className="not-found-screen__image" src={NotFoundImage} alt="not found" />
      </div>
    </section>
  );
};

export default NotFoundScreen;
