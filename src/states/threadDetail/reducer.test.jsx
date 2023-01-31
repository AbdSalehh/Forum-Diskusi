import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
    it('should return the initial state when given by unknown action', () => {
        // arrange
        const initialState = [];
        const action = { type: 'UNKNOWN' };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
        // arrange
        const initialState = {};
        const action = {
            type: ActionType.RECEIVE_THREAD_DETAIL,
            payload: {
                threadDetail: {
                    id: 'threads-1',
                    title: 'Title 1',
                    body: 'Body 1',
                    category: 'Category 1',
                    user: 'user-1',
                    upVotesBy: [],
                    downVotesBy: [],
                    created: '2023-01-31T09:25:06.588Z',
                },
            },
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.threadDetail);
    });

    it('should return the thread detail with new comment when given by ADD_COMMENT action', () => {
        // arrange
        const initialState = {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg'
            },
            upVotesBy: [],
            downVotesBy: [],
            comments: [
                {
                    id: 'comment-1',
                    content: 'Ini adalah komentar pertama',
                    createdAt: '2021-06-21T07:00:00.000Z',
                    owner: {
                        id: 'users-1',
                        name: 'John Doe',
                        avatar: 'https://generated-image-url.jpg'
                    },
                    upVotesBy: [],
                    downVotesBy: []
                }
            ]
        };

        const action = {
            type: ActionType.ADD_THREAD_COMMENT,
            payload: {
                comment: {
                    id: 'comment-2',
                    content: 'Ini adalah komentar kedua',
                    createdAt: '2021-06-21T07:00:00.000Z',
                    owner: {
                        id: 'users-2',
                        name: 'Jane Doe',
                        avatar: 'https://generated-image-url.jpg'
                    },
                    upVotesBy: [],
                    downVotesBy: []
                },
            },
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual({
            ...initialState,
            comments: [
                action.payload.comment,
                ...initialState.comments,
            ],
        });
    });
});
