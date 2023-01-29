import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './categoryItem';

function CategoryList({
    threads, handleClick, selected
}) {
    const categoryThread = threads.map(({ category }) => category);
    const uniqueCategoryThread = [...new Set(categoryThread)];

    return (
        <section>
            <div className="categories-list">
                {uniqueCategoryThread.map((category) => (
                    <CategoryItem
                        key={category}
                        category={category}
                        onHandleClick={handleClick}
                        selected={selected}
                    />
                ))}
            </div>
        </section>
    );
}

CategoryList.propTypes = {
    threads: PropTypes.arrayOf(PropTypes.object),
    handleClick: PropTypes.func,
    selected: PropTypes.string,
};

export default CategoryList;
