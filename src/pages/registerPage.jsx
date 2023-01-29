import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import RegisterInput from '../components/auth/registerInput';
import { asyncRegisterUser } from '../states/users/action';
import image from '../assets/discussion.svg';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onRegister = async ({ name, email, password }) => {
        try {
            await dispatch(asyncRegisterUser({ name, email, password }));
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section className="register-page">
            <LoadingBar className="auth-loading-bar" />
            <article className="register-page__main">
                <div className="register-page__main-top">
                    <div className="register-input__title">
                        <h2>Create Your Account</h2>
                        <p>Silahkan daftar akun terlebih dahulu untuk melakukan login</p>
                    </div>
                    <RegisterInput register={onRegister} />
                    <p>
                        Sudah punya akun ?
                        {' '}
                        <Link to="/login" className="login-link">Login</Link>
                    </p>
                </div>
                <p>
                    <button type="button" onClick={() => navigate('/')} className="login-link">Kembali</button>
                </p>
            </article>
            <div className="register-page__side">
                <div className="register-page__side__img">
                    <img src={image} alt="discussion" />
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;
