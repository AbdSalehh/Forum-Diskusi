import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';
import useInput from '../../hooks/useInput';

function LoginInput({ login }) {
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [showPassword, setShowPassword] = useState(false);

    function onShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <form className="login-input">
            <input type="email" value={email} onChange={onEmailChange} placeholder="Email" />
            <div className="login-input__password">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={onPasswordChange} placeholder="Password" />
                <button type="button" onClick={onShowPassword}>
                    {showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
                </button>
            </div>
            <button className="submit-button" type="button" onClick={() => login({ email, password })}>LOGIN</button>
        </form>
    );
}

LoginInput.propTypes = {
    login: PropTypes.func.isRequired
};

export default LoginInput;
