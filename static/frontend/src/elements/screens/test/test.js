import TestPlan from '../../components/test-plan-page/test-plan/test-plan';
import TestPlanDown from '../../components/test-plan-page/test-plan-down/test-plan-down';
import React, { useEffect } from 'react';
import './test.scss';

const Test = () => {
  useEffect(() => {
    document.body.scrollIntoView({
      block: 'start',
    });
  }, []);
  return (
    <div>
      <TestPlan />
      <TestPlanDown />
    </div>
  );
};

export default Test;
