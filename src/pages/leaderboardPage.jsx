import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/auth/action';
import Header from '../components/HeaderComponents/headerBar';
import LeaderboardList from '../components/LeaderboardComponents/leaderboardList';
import { asyncPopulateLeaderboards } from '../states/shared/action';
import LeaderboardItemSkeleton from '../components/SkeletonComponents/LeaderboardItemSkeleton';

function LeaderboardsPage({ auth }) {
    const { leaderboards = [] } = useSelector((states) => states);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncPopulateLeaderboards());
    }, [dispatch]);

    const onSignOut = () => {
        dispatch(asyncUnsetAuthUser());
    };

    const leaderboardsList = leaderboards.map((leaderboard) => ({
        ...leaderboard,
    }));

    return (
        <section>
            <div className="leaderboard-page">
                <Header auth={auth} logout={onSignOut} />
                {leaderboards.length === 0 ? (
                    <div className="leaderboard-list">
                        <div className="leaderboard-list__title">
                            <p className="rank">Rank</p>
                            <p className="users">Users</p>
                            <p className="scores">Scores</p>
                        </div>
                        <LeaderboardItemSkeleton cards={10} />
                    </div>
                ) : (
                    <LeaderboardList auth={auth} leaderboards={leaderboardsList} />
                )}
            </div>
        </section>
    );
}

const authUserShape = {
    id: PropTypes.string.isRequired,
};

LeaderboardsPage.propTypes = {
    auth: PropTypes.shape(authUserShape),
};

export default LeaderboardsPage;
