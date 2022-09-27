import PropTypes from 'prop-types';
import React, {useLayoutEffect} from 'react';
import './present-block.scss';

const PresentBlock = ({
  children, imgFon, imgMini, addClass, imageClass,
}) => {
    return (
        <div className={`present-main-content ${addClass}`}>
            <div className="gradient-mobile"> </div>
            <div className="present-main-content__information">
                <div className="present-main-content__information_block">{children}</div>
            </div>
            <div className={`present-main__image ${imageClass}`}>
                <div className="main-closer-triangle">
                    <div className="arrow-up"></div>
                    <div className="arrow-down"></div>
                    <div className="arrow-left"></div>
                    <div className="arrow-right"></div>
                </div>
                <img src={imgFon} alt="main" className="present-main__image-item" />
                <img src={imgMini} alt="main" className="present-main__image-item_mini" />
                <div className="banner-video-container">
                    <div className="banner-video-title">
                        Learn more about the dangers of Sim Card Fraud:
                    </div>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/917kcWeqpF0?start=16"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="banner-video">
                    </iframe>
                </div>

            </div>
        </div>
    );
}

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
