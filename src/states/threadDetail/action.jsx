import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import 'react-toastify/dist/ReactToastify.css';

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

const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
    ADD_THREAD_COMMENT: 'ADD_THREAD_COMMENT',
    TOGGLE_LIKE_THREAD_DETAIL: 'TOGGLE_LIKE_THREAD_DETAIL',
    TOGGLE_DISLIKE_THREAD_DETAIL: 'TOGGLE_DISLIKE_THREAD_DETAIL',
    TOGGLE_NEUTRAL_LIKE_THREAD_DETAIL: 'TOGGLE_NEUTRAL_LIKE_THREAD_DETAIL',
    TOGGLE_NEUTRAL_DISLIKE_THREAD_DETAIL: 'TOGGLE_NEUTRAL_DISLIKE_THREAD_DETAIL',
    TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
    TOGGLE_DISLIKE_COMMENT: 'TOGGLE_DISLIKE_COMMENT',
    TOGGLE_NEUTRAL_LIKE_COMMENT: 'TOGGLE_NEUTRAL_LIKE_COMMENT',
    TOGGLE_NEUTRAL_DISLIKE_COMMENT: 'TOGGLE_NEUTRAL_DISLIKE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
    return {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: {
            threadDetail,
        },
    };
}

function clearThreadDetailActionCreator() {
    return {
        type: ActionType.CLEAR_THREAD_DETAIL,
    };
}

function addCommentActionCreator(comment) {
    return {
        type: ActionType.ADD_THREAD_COMMENT,
        payload: {
            comment,
        },
    };
}

function toggleLikeThreadDetailActionCreator({ threadId, userId }) {
    return {
        type: ActionType.TOGGLE_LIKE_THREAD_DETAIL,
        payload: {
            threadId,
            userId,
        },
    };
}

function toggleDislikeThreadDetailActionCreator({ threadId, userId }) {
    return {
        type: ActionType.TOGGLE_DISLIKE_THREAD_DETAIL,
        payload: {
            threadId,
            userId,
        },
    };
}

function toggleNeutralLikeThreadDetailActionCreator({ threadId, userId }) {
    return {
        type: ActionType.TOGGLE_NEUTRAL_LIKE_THREAD_DETAIL,
        payload: {
            threadId,
            userId,
        },
    };
}

function toggleNeutralDislikeThreadDetailActionCreator({ threadId, userId }) {
    return {
        type: ActionType.TOGGLE_NEUTRAL_DISLIKE_THREAD_DETAIL,
        payload: {
            threadId,
            userId,
        },
    };
}

function toggleLikeCommentActionCreator({ commentId, userId }) {
    return {
        type: ActionType.TOGGLE_LIKE_COMMENT,
        payload: {
            commentId,
            userId,
        },
    };
}

function toggleDislikeCommentActionCreator({ commentId, userId }) {
    return {
        type: ActionType.TOGGLE_DISLIKE_COMMENT,
        payload: {
            commentId,
            userId,
        },
    };
}

function toggleNeutralLikeCommentActionCreator({ commentId, userId }) {
    return {
        type: ActionType.TOGGLE_NEUTRAL_LIKE_COMMENT,
        payload: {
            commentId,
            userId,
        },
    };
}

function toggleNeutralDislikeCommentActionCreator({ commentId, userId }) {
    return {
        type: ActionType.TOGGLE_NEUTRAL_DISLIKE_COMMENT,
        payload: {
            commentId,
            userId,
        },
    };
}

function asyncAddComment({ content, commentTo }) {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            const comment = await api.createComment({ content, commentTo });
            dispatch(addCommentActionCreator(comment));
        } catch (error) {
            toastify(error.message);
        }
        dispatch(hideLoading());
    };
}

function asyncReceiveThreadDetail(threadId) {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            const threadDetail = await api.getThreadDetail(threadId);
            dispatch(receiveThreadDetailActionCreator(threadDetail));
        } catch (error) {
            toastify(error.message);
        }
        dispatch(hideLoading());
    };
}

function asyncToggleLikeThreadDetail(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        dispatch(toggleLikeThreadDetailActionCreator({ threadId, userId: authUser.id }));

        try {
            await api.toggleUpVoteThread(threadId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleLikeThreadDetailActionCreator({ threadId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

function asyncToggleDislikeThreadDetail(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        dispatch(toggleDislikeThreadDetailActionCreator({ threadId, userId: authUser.id }));

        try {
            await api.toggleDownVoteThread(threadId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleDislikeThreadDetailActionCreator({ threadId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

function asyncToggleNeutralLikeThreadDetail(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        dispatch(toggleNeutralLikeThreadDetailActionCreator({ threadId, userId: authUser.id }));

        try {
            await api.toggleNeutralVoteThread(threadId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleNeutralLikeThreadDetailActionCreator({ threadId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

function asyncToggleNeutralDislikeThreadDetail(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        dispatch(toggleNeutralDislikeThreadDetailActionCreator({ threadId, userId: authUser.id }));

        try {
            await api.toggleNeutralVoteThread(threadId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleNeutralDislikeThreadDetailActionCreator({ threadId, userId: authUser.id }));
        }

        dispatch(showLoading());
    };
}

function asyncToggleLikeComment(commentId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser, threadDetail } = getState();
        dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id }));

        try {
            await api.toggleUpVoteCommentThread(threadDetail.id, commentId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

function asyncToggleDislikeComment(commentId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser, threadDetail } = getState();
        dispatch(toggleDislikeCommentActionCreator({ commentId, userId: authUser.id }));

        try {
            await api.toggleDownVoteCommentThread(threadDetail.id, commentId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleDislikeCommentActionCreator({ commentId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

function asyncToggleNeutralLikeComment(commentId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser, threadDetail } = getState();
        dispatch(toggleNeutralLikeCommentActionCreator({ commentId, userId: authUser.id }));

        try {
            await api.toggleNeutralVoteCommentThread(threadDetail.id, commentId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleNeutralLikeCommentActionCreator({ commentId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

function asyncToggleNeutralDislikeComment(commentId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser, threadDetail } = getState();
        dispatch(toggleNeutralDislikeCommentActionCreator({ commentId, userId: authUser.id }));

        try {
            await api.toggleNeutralVoteCommentThread(threadDetail.id, commentId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleNeutralDislikeCommentActionCreator({ commentId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

export {
    ActionType,
    receiveThreadDetailActionCreator,
    clearThreadDetailActionCreator,
    toggleLikeThreadDetailActionCreator,
    toggleDislikeThreadDetailActionCreator,
    toggleNeutralLikeThreadDetailActionCreator,
    toggleNeutralDislikeThreadDetailActionCreator,
    toggleLikeCommentActionCreator,
    toggleDislikeCommentActionCreator,
    toggleNeutralLikeCommentActionCreator,
    toggleNeutralDislikeCommentActionCreator,
    asyncReceiveThreadDetail,
    asyncAddComment,
    asyncToggleLikeThreadDetail,
    asyncToggleDislikeThreadDetail,
    asyncToggleNeutralLikeThreadDetail,
    asyncToggleNeutralDislikeThreadDetail,
    asyncToggleLikeComment,
    asyncToggleDislikeComment,
    asyncToggleNeutralLikeComment,
    asyncToggleNeutralDislikeComment,
    addCommentActionCreator,
};
