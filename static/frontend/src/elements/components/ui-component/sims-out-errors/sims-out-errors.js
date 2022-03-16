import './sims-out-errors.scss';
import PropTypes from 'prop-types';
import React from 'react';

const SimsOutErrors = ({ errors, plans }) => {
  const getUniqueErrors = () => {
    const parsedErrors = {};
    const uniqueErrors = [];

    errors.forEach((error) => {
      if (!parsedErrors[error.product?.planId]) {
        parsedErrors[error.product?.planId] = true;
        uniqueErrors.push({
          planId: error.product.planId,
          message: error.message,
        });
      }
    });

    return uniqueErrors;
  };

  return (
    errors.length > 0 && (
      <div className="sims-out-error__error-container">
        {getUniqueErrors().map((error) => {
          if (error) {
            const missingPlan = plans
              .find((plan) => plan.id === error.planId)?.name;
            return (
              <p
                className="sims-out-error__error-message"
                key={error.planId + error.message}
              >
                {`${missingPlan}: ${error.message}`}
              </p>
            );
          }
          return <p className="sims-out-error__error-message" key={error.planId}>{error.message}</p>;
        })}
      </div>
    )
  );
};

SimsOutErrors.defaultProps = {
  errors: [],
  plans: [],
};

SimsOutErrors.propTypes = {
  errors: PropTypes.array,
  plans: PropTypes.array,
};

export default SimsOutErrors;
