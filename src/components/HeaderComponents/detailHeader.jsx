import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { IoIosArrowDown, IoMdLogOut } from 'react-icons/io';
import PropTypes from 'prop-types';

function DetailHeader({ auth, logout, title }) {
    const navigate = useNavigate();
    const { id, name, avatar } = auth;

    return (
        <div className="detail-header">
            <div className="detail-header-left">
                <button type="button" className="detail-header__back-button" onClick={() => navigate('/')}>
                    <BsArrowLeft className="arrow-icon" /> <div className="detail-header__title">{title}</div>
                </button>
            </div>
            <div className="profile-button">
                <IoIosArrowDown className="arrow-icon" />
                <img src={avatar} alt={id} title={name} className="user-icon" />
                <ul className="dropdown">
                    <li>
                        <button onClick={logout} type="button">
                            <IoMdLogOut className="icon" />
                            {' '}
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

const authUserShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

DetailHeader.propTypes = {
    auth: PropTypes.shape(authUserShape).isRequired,
    logout: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default DetailHeader;
