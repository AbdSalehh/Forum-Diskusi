import threadDetailReducer from './reducer';
import { ActionType } from './action';

const threadDetail = {
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
                    comments: []
                }
            },
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.threadDetail);
    });

    it('should return the thread detail with new comment when given by ADD_COMMENT action', () => {
        // arrange
        const initialState = threadDetail;

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

    it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
        // arrange
        const initialState = threadDetail;

        const action = {
            type: ActionType.CLEAR_THREAD_DETAIL,
            payload: null,
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload);
    });

    it('should return the thread with the toggled like thread when given by TOGGLE_LIKE_THREAD_DETAIL', () => {
        // arrange
        const initialState = threadDetail;

        const action = {
            type: ActionType.TOGGLE_LIKE_THREAD_DETAIL,
            payload: {
                threadId: 'thread-1',
                userId: 'user-1',
            },
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(
            {
                ...initialState,
                upVotesBy: [action.payload.userId],
            },
        );
    });

    it('should return the thread with toggle dislike when given by TOGGLE_DISLIKE_THREAD_DETAIL action', () => {
        // arrange
        const initialState = threadDetail;

        const action = {
            type: ActionType.TOGGLE_DISLIKE_THREAD_DETAIL,
            payload: {
                threadId: 'thread-1',
                userId: 'user-1',
            },
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(
            {
                ...initialState,
                downVotesBy: [action.payload.userId],
            },
        );
    });

    it('should return the thread with the toggled like comment when given by TOGGLE_LIKE_THREAD_COMMENT action', () => {
        // arrange
        const initialState = threadDetail;

        const action = {
            type: ActionType.TOGGLE_LIKE_COMMENT,
            payload: {
                threadId: 'thread-1',
                commentId: 'comment-1',
                userId: 'users-2',
                comment: {
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
                },
            },
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(
            {
                ...initialState,
                comments: [
                    {
                        ...action.payload.comment,
                        upVotesBy: [action.payload.userId],
                    }
                ],
            },
        );
    });

    it('should return the thread with the toggled dislike comment when given by TOGGLE_DISLIKE_THREAD_COMMENT action', () => {
        // arrange
        const initialState = threadDetail;

        const action = {
            type: ActionType.TOGGLE_DISLIKE_COMMENT,
            payload: {
                threadId: 'thread-1',
                commentId: 'comment-1',
                userId: 'users-2',
                comment: {
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
                },
            },
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(
            {
                ...initialState,
                comments: [
                    {
                        ...action.payload.comment,
                        downVotesBy: [action.payload.userId],
                    }
                ],
            },
        );
    });
});
