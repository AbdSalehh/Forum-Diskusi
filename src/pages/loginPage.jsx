import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import LoginInput from '../components/auth/loginInput';
import { asyncSetAuthUser } from '../states/auth/action';
import image from '../assets/discussion.svg';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = ({ email, password }) => {
        dispatch(asyncSetAuthUser({ email, password }));
        if (localStorage.getItem('authUser')) {
            navigate('/');
        }
    };

    return (
        <section className="login-page">
            <LoadingBar className="auth-loading-bar" />
            <div className="login-page__side">
                <div className="login-page__side__img">
                    <img src={image} alt="discussion" />
                </div>
            </div>
            <article className="login-page__main">
                <div className="login-page__main-top">
                    <div className="login-input__title">
                        <div className="login-input__img">
                            <img src={image} alt="discussion" />
                        </div>
                        <h2>Hello Again!</h2>
                        <p>Silahkan login terlebih dahulu untuk melakukan vote dan berpartisipasi dalam diskusi</p>
                    </div>
                    <LoginInput login={onLogin} />
                    <p>
                        Belum punya akun ?
                        {' '}
                        <Link to="/register" className="register-link">Register</Link>
                    </p>
                </div>
                <p>
                    <button type="button" onClick={() => navigate('/')} className="register-link">Kembali</button>
                </p>
            </article>
        </section>
    );
}

export default LoginPage;
