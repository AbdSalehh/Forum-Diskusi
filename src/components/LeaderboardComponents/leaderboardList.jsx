import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem, { leaderboardItemShape } from './leaderboardItem';

function LeaderboardList({ leaderboards, auth }) {
    let index = 0;
    leaderboards.forEach((leaderboard) => {
        leaderboard.index = index;
        index += 1;
    });
    return (
        <div className="leaderboard-list">
            <div className="leaderboard-list__title">
                <p className="rank">Rank</p>
                <p className="users">Users</p>
                <p className="scores">Scores</p>
            </div>
            {leaderboards.map((leaderboard) => (
                <LeaderboardItem
                    key={leaderboard.user.id}
                    {...leaderboard}
                    index={leaderboard.index}
                    auth={auth}
                />
            ))}
        </div>
    );
}

LeaderboardList.propTypes = {
    leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardItemShape)).isRequired,
    auth: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
};

export default LeaderboardList;
