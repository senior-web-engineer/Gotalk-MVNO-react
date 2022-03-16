import './accordion.scss';
import useClassnames from '../../../../shared/hooks/useClassnames';
import PropTypes from 'prop-types';
import React from 'react';

const Accordion = ({
  summary, details, detailsTwo, detailsThree, className,
}) => (
  <details className={useClassnames('accordion', className)}>
    <summary className="accordion__summary">{summary}</summary>
    <p className="accordion__details">
      <p>{details}</p>
      <p>{detailsTwo}</p>
      <p>{detailsThree}</p>
    </p>
  </details>
);

Accordion.defaultProps = {
  summary: '',
  details: '',
  detailsTwo: '',
  detailsThree: '',
};

Accordion.propTypes = {
  summary: PropTypes.string,
  details: PropTypes.string,
  detailsTwo: PropTypes.string,
  detailsThree: PropTypes.string,
};

export default Accordion;
