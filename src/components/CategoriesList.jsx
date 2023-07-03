import React from 'react';
import PropTypes from 'prop-types';

function CategoriesList({categories}) {
  return (
    <div className='categories-list'>
      {categories.map((category) => (
        <button key={category} className='category-item'>
          {category}
        </button>
      ))}
    </div>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategoriesList;
