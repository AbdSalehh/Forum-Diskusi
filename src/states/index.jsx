import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './auth/reducer';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from './users/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboard/reducer';
import threadsReducer from './threads/reducer';

const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        isPreload: isPreloadReducer,
        users: usersReducer,
        threads: threadsReducer,
        threadDetail: threadDetailReducer,
        leaderboards: leaderboardsReducer,
        loadingBar: loadingBarReducer,
    },
});

export default store;
