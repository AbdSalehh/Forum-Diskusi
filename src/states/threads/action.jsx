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
    RECEIVE_THREAD: 'RECEIVE_THREADS',
    ADD_THREAD: 'ADD_THREAD',
    TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
    TOGGLE_DISLIKE_THREAD: 'TOGGLE_DISLIKE_THREAD',
    TOGGLE_NEUTRAL_LIKE_THREAD: 'TOGGLE_NEUTRAL_LIKE_THREAD',
    TOGGLE_NEUTRAL_DISLIKE_THREAD: 'TOGGLE_NEUTRAL_DISLIKE_THREAD',
};

function receiveThreadsActionCreator(threads) {
    return {
        type: ActionType.RECEIVE_THREAD,
        payload: {
            threads,
        },
    };
}

function addThreadActionCreator(thread) {
    return {
        type: ActionType.ADD_THREAD,
        payload: {
            thread,
        },
    };
}

function toggleLikeThreadActionCreator({ threadId, userId }) {
    return {
        type: ActionType.TOGGLE_LIKE_THREAD,
        payload: {
            threadId,
            userId,
        },
    };
}

function toggleDislikeThreadActionCreator({ threadId, userId }) {
    return {
        type: ActionType.TOGGLE_DISLIKE_THREAD,
        payload: {
            threadId,
            userId,
        },
    };
}

function toggleNeutralLikeThreadActionCreator({ threadId, userId }) {
    return {
        type: ActionType.TOGGLE_NEUTRAL_LIKE_THREAD,
        payload: {
            threadId,
            userId,
        },
    };
}

function toggleNeutralDislikeThreadActionCreator({ threadId, userId }) {
    return {
        type: ActionType.TOGGLE_NEUTRAL_DISLIKE_THREAD,
        payload: {
            threadId,
            userId,
        },
    };
}

function asyncAddThread({ title, body, category }) {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const thread = await api.createThread({ title, body, category });
            dispatch(addThreadActionCreator(thread));
        } catch (error) {
            toastify(error.message);
        }

        dispatch(hideLoading());
    };
}

function asyncToogleLikeThread(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));

        try {
            await api.toggleUpVoteThread(threadId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

function asyncToogleDislikeThread(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        dispatch(toggleDislikeThreadActionCreator({ threadId, userId: authUser.id }));

        try {
            await api.toggleDownVoteThread(threadId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleDislikeThreadActionCreator({ threadId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

function asyncToggleNeutralLikeThread(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();

        dispatch(toggleNeutralLikeThreadActionCreator({ threadId, userId: authUser.id }));

        try {
            await api.toggleNeutralVoteThread(threadId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleNeutralLikeThreadActionCreator({ threadId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

function asyncToggleNeutralDislikeThread(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        dispatch(toggleNeutralDislikeThreadActionCreator({ threadId, userId: authUser.id }));

        try {
            await api.toggleNeutralVoteThread(threadId);
        } catch (error) {
            toastify(error.message);
            dispatch(toggleNeutralDislikeThreadActionCreator({ threadId, userId: authUser.id }));
        }

        dispatch(hideLoading());
    };
}

export {
    ActionType,
    asyncAddThread,
    asyncToogleLikeThread,
    asyncToogleDislikeThread,
    asyncToggleNeutralLikeThread,
    asyncToggleNeutralDislikeThread,
    receiveThreadsActionCreator,
    addThreadActionCreator,
    toggleLikeThreadActionCreator,
    toggleDislikeThreadActionCreator,
    toggleNeutralLikeThreadActionCreator,
    toggleNeutralDislikeThreadActionCreator
};
