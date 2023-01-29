import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { threadCommentItemShape } from './threadCommentItem';

function CommentList({ comments }) {
    return (
        <div className="discussion-section">
            {comments.length > 0
                ? (
                    <div className="discussion-items">
                        {
                            comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    {...comment}
                                />
                            ))
                        }
                    </div>
                )
                : (
                    <div className="no-discussions">No Discussions</div>
                )}
        </div>
    );
}

CommentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape(threadCommentItemShape)).isRequired
};

export default CommentList;
