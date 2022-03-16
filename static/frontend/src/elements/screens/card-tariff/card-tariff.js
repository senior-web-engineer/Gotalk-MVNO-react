import CardsPlan from '../../components/tarif-plan-page/cards-plan/cards-plan';
import TariffPlan from '../../components/tarif-plan-page/tariff-plan/tariff-plan';
import React, { useEffect } from 'react';
import './card-tariff.scss';

const CardTariff = () => {
  useEffect(() => {
    document.body.scrollIntoView({
      block: 'start',
    });
  }, []);
  return (
    <div>
      <TariffPlan />
      <CardsPlan />
    </div>
  );
};

export default CardTariff;
