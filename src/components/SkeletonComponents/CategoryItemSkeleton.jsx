import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CategoryItemSkeleton({ cards }) {
    return (
        Array(cards).fill().map((_, index) => (
            <SkeletonTheme color="#8a8a8a" highlightColor="#cfcfcf" key={index}>
                <Skeleton width={100} height={30} style={{ 'borderRadius': '4px' }} />
            </SkeletonTheme>
        ))
    );
}

CategoryItemSkeleton.propTypes = {
    cards: PropTypes.number.isRequired,
};

export default CategoryItemSkeleton;
