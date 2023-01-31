import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';
import 'react-toastify/dist/ReactToastify.css';

function RegisterInput({ register }) {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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

    function onShowPassword() {
        setShowPassword(!showPassword);
    }

    function onShowConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    function onRegisterHandler(event) {
        event.preventDefault();

        if (name === '') {
            toastify('Nama tidak boleh kosong');
            return;
        }

        if (email === '') {
            toastify('Email tidak boleh kosong');
            return;
        }

        if (password === '') {
            toastify('Password tidak boleh kosong');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }

        register({ name, email, password });
    }

    return (
        <form className="register-input">
            <div className={passwordError ? 'password-error active' : 'password-error'}>
                {passwordError && 'Konfirmasi Password tidak sesuai'}
            </div>
            <input type="text" value={name} onChange={onNameChange} placeholder="Name" required />
            <input type="email" value={email} onChange={onEmailChange} placeholder="Email" required />
            <div className="register-input__password">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={onPasswordChange} placeholder="Password" required />
                <button type="button" onClick={onShowPassword}>
                    {showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
                </button>
            </div>
            <div className="register-confirm__password">
                <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={onConfirmPasswordChange} placeholder="Confirm Password" />
                <button type="button" onClick={onShowConfirmPassword}>
                    {showConfirmPassword ? <RxEyeOpen /> : <RxEyeClosed />}
                </button>
            </div>
            <button className="submit-button" type="button" onClick={onRegisterHandler}>REGISTER</button>
        </form>
    );
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
};

export default RegisterInput;
