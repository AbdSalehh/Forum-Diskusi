import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveLeaderBoardsActionCreator } from '../leaderboard/action';
import api from '../../utils/api';

function asyncPopulateUsersAndThreads() {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const users = await api.getAllUsers();
            const thread = await api.getAllThreads();

            dispatch(receiveUsersActionCreator(users));
            dispatch(receiveThreadsActionCreator(thread));
        } catch (error) {
            console.error(error.message || 'Ups, something went wrong');
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
            console.error(error.message || 'Ups, something went wrong');
        }
        dispatch(hideLoading());
    };
}

export { asyncPopulateUsersAndThreads, asyncPopulateLeaderboards };
