import actionsType from '../../../redux/workers/main-page/actions-type';
import BaseHeader from '../../containers/base-header/base-header';
import Footer from '../../containers/footer/footer';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './base-layout.scss';
import { useDispatch, useSelector } from 'react-redux';
import {ToastContainer} from "react-toastify";

const BaseLayout = ({ children }) => {
  const [classSticky, setClassSticky] = useState('');
  const [addClass, setAddClass] = useState('base-header-up-header');
  const [addClassContent, setAddClassContent] = useState('');
  const topRef = useRef(null);
  const { plans } = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!plans.length) {
      dispatch({ type: actionsType.LOAD_PLANS });
    }
  }, [dispatch, plans.length]);

  useEffect(() => {
    const currentRef = topRef.current;
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          setClassSticky('header-container__sticky');
          setAddClass('base-header-up-header__height');
          setAddClassContent('content-padding');
        } else {
          setClassSticky('');
          setAddClass('base-header-up-header');
          setAddClassContent('');
        }
      },
    );

    scrollObserver.observe(currentRef);

    return () => scrollObserver.unobserve(currentRef);
  }, []);

  return (
    <div className="base-layout">
      <div ref={topRef} id="sticky" />
      <BaseHeader classUp={addClass} classSticky={classSticky} />
      <div className={addClassContent}>{children}</div>
      <Footer />
      <ToastContainer />
    </div>
  );
};
BaseLayout.defaultProps = {
  children: React.Fragment,
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
