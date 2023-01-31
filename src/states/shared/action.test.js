import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveLeaderBoardsActionCreator } from '../leaderboard/action';
import { asyncPopulateUsersAndThreads, asyncPopulateLeaderboards } from './action';
import 'react-toastify/dist/ReactToastify.css';

const fakeThreadsResponse = [{
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
},
{
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
},
];

const fakeUsersResponse = [{
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
},
{
    id: 'jane_doe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg',
},
{
    id: 'fulan',
    name: 'Si Fulan',
    email: 'fulan@example.com',
    avatar: 'https://generated-image-url.jpg',
},
];

const fakeLeaderboardsResponse = [
    {
        user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg'
        },
        score: 10
    },
    {
        user: {
            id: 'users-2',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg'
        },
        score: 5
    }
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
    beforeEach(() => {
        // backup original implementation
        api._getAllUsers = api.getAllUsers;
        api._getAllThreads = api.getAllThreads;
    });

    afterEach(() => {
        // restore original implementation
        api.getAllUsers = api._getAllUsers;
        api.getAllThreads = api._getAllThreads;

        // delete backup
        delete api._getAllUsers;
        delete api._getAllThreads;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
        api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
        // mock dispatch
        const dispatch = jest.fn();

        // action
        await asyncPopulateUsersAndThreads()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
        expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.getAllUsers = () => Promise.reject(fakeErrorResponse);
        api.getAllThreads = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = jest.fn();
        // mock toast
        toast.error = jest.fn();

        // action
        await asyncPopulateUsersAndThreads()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});

describe('asyncPopulateLeaderboards thunk', () => {
    beforeEach(() => {
        // backup original implementation
        api._getLeaderBoards = api.getLeaderBoards;
    });

    afterEach(() => {
        // restore original implementation
        api.getLeaderBoards = api._getLeaderBoards;

        // delete backup
        delete api._getLeaderBoards;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange
        // stub implementation
        api.getLeaderBoards = () => Promise.resolve(fakeLeaderboardsResponse);
        // mock dispatch
        const dispatch = jest.fn();

        // action
        await asyncPopulateLeaderboards()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(receiveLeaderBoardsActionCreator(fakeLeaderboardsResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange
        // stub implementation
        api.getLeaderBoards = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = jest.fn();
        // mock toast
        toast.error = jest.fn();

        // action
        await asyncPopulateLeaderboards()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});
