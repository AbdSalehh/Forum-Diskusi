import React from 'react';
import PropTypes from 'prop-types';
import gold from '../../assets/gold.webp';
import silver from '../../assets/silver.webp';
import bronze from '../../assets/bronze.webp';

function LeaderboardItem({
    user, score, index, auth
}) {
    return (
        <div className="leaderboard-item">
            {(() => {
                if (index === 0) {
                    return (
                        <div className="item-user first">
                            <div className="item-user-rank">
                                <div className="item-user__number">
                                    <img src={gold} alt="gold" />
                                </div>
                            </div>
                            <div className="item-user__info">
                                <img src={user.avatar} alt={user.name} />
                                <div className="leaderboard-username">
                                    <p>{user.name} {auth !== null && (<span>{user.id === auth.id && '(Anda)'}</span>)}</p>
                                    <h5>{user.email}</h5>
                                </div>
                            </div>
                            <div className="item-score">
                                <p className="score">{score}</p>
                            </div>
                        </div>
                    );
                } else if (index === 1) {
                    return (
                        <div className="item-user second">
                            <div className="item-user-rank">
                                <div className="item-user__number">
                                    <img src={silver} alt="silver" />
                                </div>
                            </div>
                            <div className="item-user__info">
                                <img src={user.avatar} alt={user.name} />
                                <div className="leaderboard-username">
                                    <p>{user.name} {auth !== null && (<span>{user.id === auth.id && '(Anda)'}</span>)}</p>
                                    <h5>{user.email}</h5>
                                </div>
                            </div>
                            <div className="item-score">
                                <p className="score">{score}</p>
                            </div>
                        </div>
                    );
                } else if (index === 2) {
                    return (
                        <div className="item-user third">
                            <div className="item-user-rank">
                                <div className="item-user__number">
                                    <img src={bronze} alt="bronze" />
                                </div>
                            </div>
                            <div className="item-user__info">
                                <img src={user.avatar} alt={user.name} />
                                <div className="leaderboard-username">
                                    <p>{user.name} {auth !== null && (<span>{user.id === auth.id && '(Anda)'}</span>)}</p>
                                    <h5>{user.email}</h5>
                                </div>
                            </div>
                            <div className="item-score">
                                <p className="score">{score}</p>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="item-user">
                            <div className="item-user-rank">
                                <div className="item-user__number">
                                    <p>{index + 1}</p>
                                </div>
                            </div>
                            <div className="item-user__info">
                                <img src={user.avatar} alt={user.name} />
                                <div className="leaderboard-username">
                                    <p>{user.name} {auth !== null && (<span>{user.id === auth.id && '(Anda)'}</span>)}</p>
                                    <h5>{user.email}</h5>
                                </div>
                            </div>
                            <div className="item-score">
                                <p className="score">{score}</p>
                            </div>
                        </div>
                    );
                }
            })()}
        </div>
    );
}

const userLeaderboardItemShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

const leaderboardItemShape = {
    user: PropTypes.shape(userLeaderboardItemShape).isRequired,
    score: PropTypes.number.isRequired,
    index: PropTypes.number,
    auth: PropTypes.object,
};

LeaderboardItem.propTypes = {
    ...leaderboardItemShape,
};

export { leaderboardItemShape };

export default LeaderboardItem;
