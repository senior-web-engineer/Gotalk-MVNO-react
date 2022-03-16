import './faq-list.scss';
import questions from './questions';
import Accordion from '../ui-component/accordion/accordion';
import Search from '../ui-component/search/search';
import React, { useState } from 'react';

const FaqList = () => {
  const [list, setList] = useState(questions);

  const handleSearch = (event) => {
    const { value } = event.target;
    const updatedList = questions.filter(
      (item) => item.summary.includes(value) || item.details.includes(value),
    );

    setList(updatedList);
  };

  const renderList = () => list.map((item) => (
    <li className="faq-list__list-item" key={item.summary}>
      <Accordion
        summary={item.summary}
        details={item.details}
        detailsTwo={item.detailsTwo}
        detailsThree={item.detailsThree}
      />
    </li>
  ));

  return (
    <div className="faq-list">
      <Search onChange={handleSearch} containerClass="faq-list__search" />
      {list.length ? (
        <ul className="faq-list__list">{renderList()}</ul>
      ) : (
        <p className="faq-list__list--empty">Nothing found</p>
      )}
    </div>
  );
};

export default FaqList;
