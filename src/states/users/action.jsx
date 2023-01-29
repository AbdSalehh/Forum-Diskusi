import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
    RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
    return {
        type: ActionType.RECEIVE_USERS,
        payload: {
            users,
        },
    };
}

function asyncRegisterUser({
    name,
    email,
    password
}) {
    return async (dispatch) => {
        dispatch(showLoading());
        await api.register({
            name,
            email,
            password
        });
        dispatch(hideLoading());
    };
}

export {
    ActionType,
    receiveUsersActionCreator,
    asyncRegisterUser,
};
