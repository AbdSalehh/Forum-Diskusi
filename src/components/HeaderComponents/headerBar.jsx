import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { BsBarChartLine } from 'react-icons/bs';
import { IoIosArrowDown, IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import PropTypes from 'prop-types';
import Loading from './LoadingBar';

function Header({ auth, logout }) {
    const navRef = useRef();

    const responsiveNavbar = () => {
        navRef.current.classList.toggle('responsive_nav');
    };

    return (
        <header>
            <div className="header">
                <Link className="link-title" to="/"><h1>FoCus</h1></Link>
                <div id="none-element" ref={navRef}></div>
                <div id="navigation" className={auth === null ? 'responsive' : 'null'}>
                    <nav>
                        {(() => {
                            if (window.location.pathname === '/') {
                                return (
                                    <ul>
                                        <Link className="link" to="/">
                                            <GoHome className="link-icon" />
                                            <li className="active">Home</li>
                                        </Link>
                                        <Link className="link" to="/leaderboard">
                                            <BsBarChartLine className="link-icon" />
                                            <li>Leaderboard</li>
                                        </Link>
                                    </ul>
                                );
                            } else {
                                return (
                                    <ul>
                                        <Link className="link" to="/">
                                            <GoHome className="link-icon" />
                                            <li>Home</li>
                                        </Link>
                                        <Link className="link" to="/leaderboard">
                                            <BsBarChartLine className="link-icon" />
                                            <li className="active">Leaderboard</li>
                                        </Link>
                                    </ul>
                                );
                            }
                        })()}
                        {auth === null
                        && (
                            <div className="authentication">
                                <Link className="login" to="/login">Login &nbsp; <IoMdLogIn /></Link>
                                <Link className="register" to="/register">Register</Link>
                            </div>
                        )}
                    </nav>
                </div>
                <div className="header-card" style={auth === null ? { 'display': 'none' } : { 'display': 'block' }}>
                    {auth !== null
                            && (
                                <div className="profile-button">
                                    <IoIosArrowDown className="arrow-icon" />
                                    <img src={auth.avatar} alt={auth.id} title={auth.name} className="user-icon" />
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
                            )}
                </div>
                <button className="bars-menu" onClick={responsiveNavbar} type="button">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
            <Loading />
        </header>
    );
}

const authUserShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

Header.propTypes = {
    auth: PropTypes.shape(authUserShape),
    logout: PropTypes.func.isRequired
};

export default Header;
