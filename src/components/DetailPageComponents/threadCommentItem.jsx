import React from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import { useSelector, useDispatch } from 'react-redux';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { postedAt, showFormattedDate } from '../../utils/index';
import {
    asyncToggleLikeComment,
    asyncToggleDislikeComment, asyncToggleNeutralLikeComment, asyncToggleNeutralDislikeComment
} from '../../states/threadDetail/action';
import 'tippy.js/dist/tippy.css';

function CommentItem({
    id, content, createdAt, upVotesBy, downVotesBy, owner
}) {
    const { authUser } = useSelector((states) => states);
    const dispatch = useDispatch();

    const isCommentLiked = upVotesBy.includes(authUser.id);
    const isCommentDisliked = downVotesBy.includes(authUser.id);

    const onLikeComment = (commentId) => {
        dispatch(asyncToggleLikeComment(commentId));
    };

    const onDislikeComment = (commentId) => {
        dispatch(asyncToggleDislikeComment(commentId));
    };

    const onNeutralLikeComment = (commentId) => {
        dispatch(asyncToggleNeutralLikeComment(commentId));
    };

    const onNeutralDislikeComment = (commentId) => {
        dispatch(asyncToggleNeutralDislikeComment(commentId));
    };

    const onLikeClick = (event) => {
        event.stopPropagation();
        if (!isCommentLiked && !isCommentDisliked) {
            onLikeComment(id);
        } else if (isCommentDisliked) {
            onNeutralDislikeComment(id);
            onLikeComment(id);
        } else if (isCommentLiked) {
            onNeutralLikeComment(id);
        }
    };

    const onDislikeClick = (event) => {
        event.stopPropagation();
        if (!isCommentLiked && !isCommentDisliked) {
            onDislikeComment(id);
        } else if (isCommentLiked) {
            onNeutralLikeComment(id);
            onDislikeComment(id);
        } else if (isCommentDisliked) {
            onNeutralDislikeComment(id);
        }
    };

    return (
        <div className="discussion-item">
            <div className="discussion-dot"></div>
            <div className="discussion-date">{showFormattedDate(createdAt)}</div>
            <div className="discussion-content">
                <div className="owner-card">
                    <img src={owner.avatar} alt={owner.name} />
                    <div className="thread-item__user-name">
                        <p className="username">{owner.name}</p>
                        <p className="create-date">{postedAt(createdAt)}</p>
                    </div>
                </div>
                <div className="comment-content" dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <div className="thread-item__other-info">
                <div className="thread-item__button">
                    {
                        onLikeComment && (
                            <div className="thread-item__like">
                                <p>
                                    <Tippy content="Up Vote">
                                        <button type="button" aria-label="Like" onClick={onLikeClick} className="like-button">
                                            {isCommentLiked ? <FiChevronUp className="red" /> : <FiChevronUp />}
                                        </button>
                                    </Tippy>
                                    {' '}
                                    {upVotesBy.length}
                                </p>
                            </div>
                        )
                    }
                    {
                        onDislikeComment && (
                            <div className="thread-item__dislike">
                                <p>
                                    <Tippy content="Down Vote">
                                        <button type="button" aria-label="like" onClick={onDislikeClick}>
                                            {isCommentDisliked ? <FiChevronDown className="red" /> : <FiChevronDown />}
                                        </button>
                                    </Tippy>
                                    {' '}
                                    {downVotesBy.length}
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

const ownerCommentItemShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

const threadCommentItemShape = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape(ownerCommentItemShape).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired
};

CommentItem.propTypes = {
    ...threadCommentItemShape,
};

export { threadCommentItemShape };

export default CommentItem;
