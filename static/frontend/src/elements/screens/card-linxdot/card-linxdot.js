import CardsPlan from '../../components/linxdot-plan-page/cards-plan/cards-plan';
import LinxdotPlan from '../../components/linxdot-plan-page/linxdot-plan/linxdot-plan';
import React, { useEffect } from 'react';
import './card-linxdot.scss';

const Linxdot = () => {
  useEffect(() => {
    document.body.scrollIntoView({
      block: 'start',
    });
  }, []);
  return (
    <div>
      <LinxdotPlan />
      <CardsPlan />
    </div>
  );
};

export default Linxdot;
