import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './section.scss';

const AccountEditSection = ({
  addClass, addClassContainer, addClassTitle, title, children,
}) => {
  const classes = classNames('account-screen__section', addClass);
  const classesContainer = classNames('account-screen-section-container', addClassContainer);
  const classesTitle = classNames('account-screen-section-title', addClassTitle);

  return (
    <section className={classes}>
      <div className={classesContainer}>
        {title && <h6 className={classesTitle}>{title}</h6>}

        {children}
      </div>
    </section>
  );
};

AccountEditSection.defaultProps = {
  addClass: '',
  addClassContainer: '',
  title: '',
};

AccountEditSection.propTypes = {
  addClass: PropTypes.string,
  addClassContainer: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default AccountEditSection;
