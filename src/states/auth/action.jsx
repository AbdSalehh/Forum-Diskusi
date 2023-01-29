import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import 'react-toastify/dist/ReactToastify.css';

const ActionType = {
    SET_AUTH_USER: 'SET_AUTH_USER',
    UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

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

function setAuthUserActionCreator(authUser) {
    return {
        type: ActionType.SET_AUTH_USER,
        payload: {
            authUser,
        },
    };
}

function unsetAuthUserActionCreator() {
    return {
        type: ActionType.UNSET_AUTH_USER,
    };
}

function asyncSetAuthUser({ email, password }) {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const token = await api.login({ email, password });
            api.putAccessToken(token);
            const authUser = await api.getOwnProfile();
            dispatch(setAuthUserActionCreator(authUser));
        } catch (error) {
            toastify(error.message);
        }

        dispatch(hideLoading());
    };
}

function asyncUnsetAuthUser() {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(unsetAuthUserActionCreator());
        api.putAccessToken('');
        dispatch(hideLoading());
    };
}

export {
    ActionType,
    setAuthUserActionCreator,
    unsetAuthUserActionCreator,
    asyncSetAuthUser,
    asyncUnsetAuthUser,
};
