import './showcase-block.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const ShowcaseBlock = ({ children, reversed, img }) => {
  const sectionClasses = classNames('showcase-block', { reversed });
  const imageClasses = classNames('showcase-block__image', { reversed });

  return (
    <section className={sectionClasses}>
      <div className="showcase-block__content-container">
        {children}
      </div>
      <div className="showcase-block__image-container">
        <img className={imageClasses} src={img} alt="coins" />
      </div>
    </section>
  );
};

ShowcaseBlock.defaultProps = {
  children: React.Fragment,
  reversed: false,
};

ShowcaseBlock.propTypes = {
  children: PropTypes.node,
  reversed: PropTypes.bool,
};

export default ShowcaseBlock;
