import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './threadItem';

function ThreadsList({
    threads,
    like,
    dislike,
    neutralLike,
    neutralDislike,
}) {
    return (
        <div className="threads-list">
            {
                threads.map((thread) => (
                    <ThreadItem
                        key={thread.id}
                        {...thread}
                        like={like}
                        dislike={dislike}
                        neutralLike={neutralLike}
                        neutralDislike={neutralDislike}
                    />
                ))
            }
        </div>
    );
}

ThreadsList.propTypes = {
    threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
    like: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    neutralLike: PropTypes.func.isRequired,
    neutralDislike: PropTypes.func.isRequired,
};

export default ThreadsList;
