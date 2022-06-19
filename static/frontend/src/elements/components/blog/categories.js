import actionsType from '../../../redux/workers/main-page/actions-type';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Categories(props) {
  const {categories} = props
  const category = useSelector((state) => state.mainReducer.category);
  const dispatch = useDispatch();

  const setCategory = (catId) => {
    dispatch({ type: actionsType.CHANGE_CATEGORY, payload: catId });
  };

  return (
    <div className="catMenu">
      {categories.length >0 &&
        categories.map((cat, index) => {
          return (
            <a key={index} className={`${category === cat.id ? 'active' : ''}`}
               onClick={() => setCategory(cat.id)}
            >{cat.name}</a>
          )
        })
      }
      <a className={`${category === 'All' ? 'active' : ''}`}
         onClick={() => setCategory('All')}
      >All</a>
    </div>
  );
}

export default Categories;