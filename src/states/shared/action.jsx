import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveLeaderBoardsActionCreator } from '../leaderboard/action';
import api from '../../utils/api';
import 'react-toastify/dist/ReactToastify.css';

function asyncPopulateUsersAndThreads() {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const users = await api.getAllUsers();
            const thread = await api.getAllThreads();

            dispatch(receiveUsersActionCreator(users));
            dispatch(receiveThreadsActionCreator(thread));
        } catch (error) {
            toast.error(error.message || 'Ups, something went wrong');
        }

        dispatch(hideLoading());
    };
}

function asyncPopulateLeaderboards() {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const leaderboards = await api.getLeaderBoards();

            dispatch(receiveLeaderBoardsActionCreator(leaderboards));
        } catch (error) {
            toast.error(error.message || 'Ups, something went wrong');
        }
        dispatch(hideLoading());
    };
}

export { asyncPopulateUsersAndThreads, asyncPopulateLeaderboards };
