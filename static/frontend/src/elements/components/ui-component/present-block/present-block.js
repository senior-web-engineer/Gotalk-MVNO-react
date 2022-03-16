import PropTypes from 'prop-types';
import React from 'react';
import './present-block.scss';

const PresentBlock = ({
  children, imgFon, imgMini, addClass, imageClass,
}) => (
  <div className={`present-main-content ${addClass}`}>
    <div className="gradient-mobile"> </div>
    <div className="present-main-content__information">
      <div className="present-main-content__information_block">{children}</div>
    </div>
    <div className={`present-main__image ${imageClass}`}>
      <img src={imgFon} alt="main" className="present-main__image-item" />
      <img src={imgMini} alt="main" className="present-main__image-item_mini" />
    </div>
  </div>
);

PresentBlock.defaultProps = {
  imgFon: '',
  imgMini: '',
  addClass: '',
  imageClass: '',
  children: React.Fragment,
};

PresentBlock.propTypes = {
  imgFon: PropTypes.string,
  imgMini: PropTypes.string,
  imageClass: PropTypes.string,
  addClass: PropTypes.string,
  children: PropTypes.node,
};

export default PresentBlock;
