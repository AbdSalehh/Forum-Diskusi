import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { asyncPreloadProcess } from './states/isPreload/action';
import Footer from './components/FooterComponent/footer';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import HomePage from './pages/homePage';
import DetailPage from './pages/detailPage';
import LeaderboardsPage from './pages/leaderboardPage';
import NotFoundPage from './pages/notFoundPage';

function App() {
    const {
        authUser = null,
        isPreload = false,
    } = useSelector((states) => states);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncPreloadProcess());
    }, [dispatch]);

    if (isPreload) {
        return null;
    }

    if (authUser === null) {
        return (
            <div className="app-container">
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage auth={authUser} />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/leaderboard" element={<LeaderboardsPage auth={authUser} />} />
                        <Route path="/threads/:id" element={<NotFoundPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Footer />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }

    return (
        <div className="app-container">
            <main>
                <Routes>
                    <Route path="/" element={<HomePage auth={authUser} />} />
                    <Route path="/threads/:id" element={<DetailPage auth={authUser} />} />
                    <Route path="/leaderboard" element={<LeaderboardsPage auth={authUser} />} />
                    <Route path="/login" element={<Navigate replace to="/" />} />
                    <Route path="/register" element={<Navigate replace to="/" />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
