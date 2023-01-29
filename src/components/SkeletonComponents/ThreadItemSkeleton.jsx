import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ThreadItemSkeleton({ cards }) {
    return (
        Array(cards).fill().map((_, index) => (
            <SkeletonTheme color="#8a8a8a" highlightColor="#cfcfcf" key={index}>
                <div className="thread-item">
                    <div className="thread-item__content">
                        <div className="thread-item__owner">
                            <Skeleton circle height={35} width={35} />
                            <p className="thread-item__user-name" style={{ 'padding': '0 10px' }}>
                                <Skeleton width={100} height={15} />
                            </p>
                        •
                            <p className="thread-item__created-at" style={{ 'padding': '0 10px' }}>
                                <Skeleton width={100} height={15} />
                            </p>
                        </div>
                        <Skeleton width={300} height={20} />
                        <Skeleton width={100} height={15} />
                        <div className="thread-item__body">
                            <Skeleton count={5} />
                        </div>
                    </div>
                    <div className="thread-item__other-info">
                        <div className="thread-item__button">
                            <div className="first-button">
                                <Skeleton width={40} height={40} />
                            </div>
                            <div className="second-button">
                                <Skeleton width={40} height={40} />
                            </div>
                            <div className="third-button">
                                <Skeleton width={40} height={40} />
                            </div>
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        ))
    );
}

ThreadItemSkeleton.propTypes = {
    cards: PropTypes.number.isRequired,
};

export default ThreadItemSkeleton;
