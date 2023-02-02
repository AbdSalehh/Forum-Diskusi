import React from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineComment } from 'react-icons/ai';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { postedAt } from '../../utils/index';
import 'tippy.js/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';

function ThreadItem({
    id, title, body, category, createdAt, ownerName, upVotesBy, downVotesBy, totalComments, authUser,
    like, dislike, neutralLike, neutralDislike
}) {
    const isThreadLiked = upVotesBy.includes(authUser);
    const isThreadDisliked = downVotesBy.includes(authUser);
    const navigate = useNavigate();

    const toastify = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            className: 'toast',
        });
    };

    const onLikeClick = (event) => {
        event.stopPropagation();
        if (authUser === undefined) {
            toastify('Please login to up vote this thread');
        } else if (!isThreadLiked && !isThreadDisliked) {
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
        if (authUser === undefined) {
            toastify('Please login to down vote this thread');
        } else if (!isThreadLiked && !isThreadDisliked) {
            dislike(id);
        } else if (isThreadLiked) {
            neutralLike(id);
            dislike(id);
        } else if (isThreadDisliked) {
            neutralDislike(id);
        }
    };

    return (
        <div className="thread-item">
            <div className="thread-item__content">
                <div className="thread-item__owner">
                    <img src={ownerName.avatar} alt={ownerName.name} />
                    <p className="thread-item__user-name">{ownerName.name}</p>
                    <p>•</p>
                    <p className="thread-item__created-at">{postedAt(createdAt)}</p>
                </div>
                <Link preventScrollReset to={authUser === undefined ? '/login' : `/threads/${id}`} className="thread-item__title">{title}</Link>
                <div className="thread-item__category">
                    <div className="category">
                        #
                        {category}
                    </div>
                </div>
                <div className="thread-item__body" dangerouslySetInnerHTML={{ __html: body }}></div>
            </div>
            <div className="thread-item__other-info">
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
                    <div className="thread-item__comment">
                        <Tippy content="Discussion">
                            <button type="button" aria-label="Comment" onClick={() => navigate(authUser === undefined ? '/login' : `/threads/${id}`)}><AiOutlineComment /></button>
                        </Tippy>
                        {' '}
                        {totalComments}
                    </div>
                </div>
            </div>
        </div>
    );
}

const threadItemShape = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerName: PropTypes.object.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
    authUser: PropTypes.string,
    like: PropTypes.func,
    dislike: PropTypes.func,
    neutralLike: PropTypes.func,
    neutralDislike: PropTypes.func,
};

ThreadItem.propTypes = {
    ...threadItemShape,
};

export { threadItemShape };

export default ThreadItem;
