import React from 'react';
import PropTypes from 'prop-types';

function CategoryItem({ category, onHandleClick, selected }) {
    return category === selected ? (
        <button
            type="button"
            className="category-item selected"
            onClick={onHandleClick}
            value={category}
        >
            {`#${category}`}
        </button>
    ) : (
        <button
            type="button"
            className="category-item"
            onClick={onHandleClick}
            value={category}
        >
            {`#${category}`}
        </button>
    );
}

CategoryItem.propTypes = {
    selected: PropTypes.string,
    category: PropTypes.string,
    onHandleClick: PropTypes.func,
};
export default CategoryItem;
