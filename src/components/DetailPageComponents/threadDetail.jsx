import React from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { AiOutlineComment } from 'react-icons/ai';
import { postedAt } from '../../utils/index';
import 'tippy.js/dist/tippy.css';

function ThreadDetail({
    id, title, body, category, createdAt, owner, upVotesBy, downVotesBy, comments, authUser,
    like, dislike, neutralLike, neutralDislike
}) {
    const isThreadLiked = upVotesBy.includes(authUser);
    const isThreadDisliked = downVotesBy.includes(authUser);

    const onLikeClick = (event) => {
        event.stopPropagation();
        if (!isThreadLiked && !isThreadDisliked) {
            like(id);
        } else if (isThreadDisliked) {
            neutralDislike(id);
            like(id);
        } else if (isThreadLiked) {
            neutralLike(id);
        }
    };

    const onDislikeClick = (event) => {
        event.stopPropagation();
        if (!isThreadLiked && !isThreadDisliked) {
            dislike(id);
        } else if (isThreadLiked) {
            neutralLike(id);
            dislike(id);
        } else if (isThreadDisliked) {
            neutralDislike(id);
        }
    };

    return (
        <div className="thread-detail">
            <div className="thread-item__content">
                <div className="thread-item__owner">
                    <img src={owner.avatar} alt={owner.name} />
                    <div className="thread-detail__owner-name">
                        <p className="thread-item__user-name">{owner.name}</p>
                        <p>•</p>
                        <p className="thread-item__created-at">{postedAt(createdAt)}</p>
                    </div>
                </div>
                <div className="thread-item__title">{title}</div>
                <div className="thread-item__category">
                    <div className="category">
                        #
                        {category}
                    </div>
                </div>
                <div className="thread-detail__body" dangerouslySetInnerHTML={{ __html: body }}></div>
            </div>
            <div className="thread-item__other-info">
                <div className="thread-item__comment">
                    <Tippy content="Discussion">
                        <button type="button" aria-label="Comment"><AiOutlineComment /></button>
                    </Tippy>
                    {' '}
                    {comments.length} Pembahasan
                </div>
                <div className="thread-item__button">
                    {
                        like && (
                            <div className="thread-item__like">
                                <p>
                                    <Tippy content="Up Vote">
                                        <button type="button" aria-label="Like" onClick={onLikeClick} className="like-button">
                                            {isThreadLiked ? <FiChevronUp className="red" /> : <FiChevronUp />}
                                        </button>
                                    </Tippy>
                                    {' '}
                                    {upVotesBy.length}
                                </p>
                            </div>
                        )
                    }
                    {
                        dislike && (
                            <div className="thread-item__dislike">
                                <p>
                                    <Tippy content="Down Vote">
                                        <button type="button" aria-label="like" onClick={onDislikeClick}>
                                            {isThreadDisliked ? <FiChevronDown className="red" /> : <FiChevronDown />}
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

const threadDetailShape = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.object.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    authUser: PropTypes.string,
    like: PropTypes.func,
    dislike: PropTypes.func,
};

ThreadDetail.propTypes = {
    ...threadDetailShape,
};

export {
    threadDetailShape
};

export default ThreadDetail;
