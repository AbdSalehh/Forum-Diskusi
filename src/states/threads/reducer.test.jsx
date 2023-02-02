/**
 * test scenario for threadReducer
 *
 * - usersReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the thread with new thread when given by ADD_THREAD action
 *  - should return the threads with the toggled like thread when given by TOGGLE_LIKE_THREAD
 *  - should return the threads with toggle dislike thread when given by TOGGLE_DISLIKE_THREAD action
 *  - should return the threads with like thread when given by TOGGLE_NEUTRAL_LIKE_THREAD action
 *  - should return the threads with like thread when given by TOGGLE_NEUTRAL_DISLIKE_THREAD action
*/

import threadsReducer from './reducer';
import { ActionType } from './action';

const thread = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2023-01-31T09:25:06.588Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0
};

describe('threadReducers function', () => {
    it('should return the initial state when given by unknown action', () => {
        // arrange
        const initialState = [];
        const action = {
            type: 'UNKNOWN'
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the threads when given by RECEIVE_THREADS action', () => {
        // arrange
        const initialState = [];
        const action = {
            type: ActionType.RECEIVE_THREAD,
            payload: {
                threads: [{
                    id: 'thread-1',
                    title: 'Thread Pertama',
                    body: 'Ini adalah thread pertama',
                    category: 'General',
                    createdAt: '2023-01-31T09:25:06.588Z',
                    ownerId: 'users-1',
                    upVotesBy: [],
                    downVotesBy: [],
                    totalComments: 0
                },
                {
                    id: 'thread-2',
                    title: 'Thread kedua',
                    body: 'Ini adalah thread kedua',
                    category: 'react',
                    createdAt: '2023-01-31T09:25:06.588Z',
                    ownerId: 'users-2',
                    upVotesBy: [],
                    downVotesBy: [],
                    totalComments: 0
                },],
            },
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.threads);
    });

    it('should return the thread with new thread when given by ADD_THREAD action', () => {
        // arrange
        const initialState = [thread];

        const action = {
            type: ActionType.ADD_THREAD,
            payload: {
                thread: {
                    id: 'thread-2',
                    title: 'Thread kedua',
                    body: 'Ini adalah thread kedua',
                    category: 'react',
                    createdAt: '2023-01-31T09:25:06.588Z',
                    ownerId: 'users-2',
                    upVotesBy: [],
                    downVotesBy: [],
                    totalComments: 0
                },
            },
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([action.payload.thread, ...initialState]);
    });

    it('should return the threads with the toggled like thread when given by TOGGLE_LIKE_THREAD', () => {
    // arrange
        const initialState = [thread];

        const action = {
            type: ActionType.TOGGLE_LIKE_THREAD,
            payload: {
                threadId: 'thread-1',
                userId: 'user-1',
            },
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([
            {
                ...initialState[0],
                upVotesBy: [action.payload.userId],
            },
        ]);
    });

    it('should return the threads with toggle dislike thread when given by TOGGLE_DISLIKE_THREAD action', () => {
        // arrange
        const initialState = [thread];

        const action = {
            type: ActionType.TOGGLE_DISLIKE_THREAD,
            payload: {
                threadId: 'thread-1',
                userId: 'user-2',
            },
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([{
            ...initialState[0],
            downVotesBy: [action.payload.userId],
        },]);
    });

    it('should return the threads with like thread when given by TOGGLE_NEUTRAL_LIKE_THREAD action', () => {
        // arrange
        const initialState = [{
            id: 'thread-1',
            title: 'Title 1',
            body: 'Body 1',
            category: 'Category 1',
            upVotesBy: ['user-1'],
            downVotesBy: [],
            user: 'user-1',
            created: '2023-01-31T09:25:06.588Z',
        },];

        const action = {
            type: ActionType.TOGGLE_NEUTRAL_LIKE_THREAD,
            payload: {
                userId: 'user-1',
            },
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([{
            ...initialState[0],
            upVotesBy: [action.payload.userId],
        },]);
    });

    it('should return threads with dislike thread when given by TOGGLE_NEUTRAL_DISLIKE_THREAD', () => {
        // arrange
        const initialState = [{
            id: 'thread-1',
            title: 'Title 1',
            body: 'Body 1',
            category: 'Category 1',
            upVotesBy: [],
            downVotesBy: ['user-2'],
            user: 'user-1',
            created: '2023-01-31T09:25:06.588Z',
        },];

        const action = {
            type: ActionType.TOGGLE_NEUTRAL_DISLIKE_THREAD,
            payload: {
                userId: 'user-2',
            },
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([{
            ...initialState[0],
            downVotesBy: [action.payload.userId],
        },]);
    });
});
