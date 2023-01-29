import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function LeaderboardItemSkeleton({ cards }) {
    return (
        Array(cards).fill().map((_, index) => (
            <SkeletonTheme color="#8a8a8a" highlightColor="#cfcfcf" key={index}>
                <div className="leaderboard-item">
                    <div className="item-user">
                        <div className="item-user-rank">
                            <div className="item-user__number">
                                <Skeleton width={30} height={30} />
                            </div>
                        </div>
                        <div className="item-user__info">
                            <Skeleton circle height={35} width={35} />
                            <div className="leaderboard-username">
                                <Skeleton width={150} height={20} />
                                <Skeleton width={80} height={10} style={{ 'paddingTop': '10px' }} />
                            </div>
                        </div>
                        <div className="item-score">
                            <Skeleton width={30} height={30} />
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        ))
    );
}

LeaderboardItemSkeleton.propTypes = {
    cards: PropTypes.number.isRequired,
};

export default LeaderboardItemSkeleton;
