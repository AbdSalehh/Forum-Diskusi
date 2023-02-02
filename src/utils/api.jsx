import { toast } from 'react-toastify';
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

const toastifySuccess = (message) => {
    toast.success(message, {
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

const api = (() => {
    const BASE_URL = 'https://forum-api.dicoding.dev/v1';

    async function _fetchWithAuth(url, options = {}) {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
    }

    function putAccessToken(token) {
        localStorage.setItem('accessToken', token);
    }

    function getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    async function register({ name, email, password }) {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const responseJson = await response.json();
        const { status, message } = responseJson;

        if (status !== 'success') {
            toastify(message);
            throw new Error(message);
        }

        const { data: { user } } = responseJson;
        toastifySuccess('Register success! Please login to continue.');

        return user;
    }

    async function login({ email, password }) {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { token } } = responseJson;
        toastifySuccess('Login success!');

        return token;
    }

    async function getOwnProfile() {
        const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            if (message === 'Token maximum age exceeded') {
                toastify('Sesi login Anda telah berakhir, silahkan login kembali');
            }
            throw new Error(message);
        }

        const { data: { user } } = responseJson;

        return user;
    }

    async function getAllUsers() {
        const response = await fetch(`${BASE_URL}/users`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { users } } = responseJson;

        return users;
    }

    async function getAllThreads() {
        const response = await fetch(`${BASE_URL}/threads`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { threads } } = responseJson;

        return threads;
    }

    async function getThreadDetail(id) {
        const response = await fetch(`${BASE_URL}/threads/${id}`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { detailThread } } = responseJson;

        return detailThread;
    }

    async function createThread({ title, body, category }) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                body,
                category,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            toastify(message);
            throw new Error(message);
        }

        const { data: { thread } } = responseJson;
        toastifySuccess('Thread Berhasil Ditambahkan');

        return thread;
    }

    async function createComment({ content, commentTo = '' }) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${commentTo}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { comment } } = responseJson;
        toastifySuccess('Komentar Ditambahkan');

        return comment;
    }

    async function toggleUpVoteThread(id) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadId: id,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
    }

    async function toggleDownVoteThread(id) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadId: id,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
    }

    async function toggleNeutralVoteThread(id) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/neutral-vote`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadId: id,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
    }

    async function toggleUpVoteCommentThread(tId, cId) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${tId}/comments/${cId}/up-vote`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadId: tId,
                commentId: cId
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
    }

    async function toggleDownVoteCommentThread(tId, cId) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${tId}/comments/${cId}/down-vote`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadId: tId,
                commentId: cId
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
    }

    async function toggleNeutralVoteCommentThread(tId, cId) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${tId}/comments/${cId}/neutral-vote`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadId: tId,
                commentId: cId
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
    }

    async function getLeaderBoards() {
        const response = await fetch(`${BASE_URL}/leaderboards`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { leaderboards } } = responseJson;

        return leaderboards;
    }

    return {
        putAccessToken,
        getAccessToken,
        register,
        login,
        getOwnProfile,
        getAllUsers,
        getAllThreads,
        createThread,
        toggleUpVoteThread,
        getThreadDetail,
        createComment,
        toggleDownVoteThread,
        toggleNeutralVoteThread,
        toggleUpVoteCommentThread,
        toggleDownVoteCommentThread,
        toggleNeutralVoteCommentThread,
        getLeaderBoards,
    };
})();

export default api;
