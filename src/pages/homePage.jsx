import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncUnsetAuthUser } from '../states/auth/action';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
    asyncAddThread, asyncToogleLikeThread, asyncToogleDislikeThread, asyncToggleNeutralLikeThread, asyncToggleNeutralDislikeThread
} from '../states/threads/action';
import ThreadsList from '../components/ThreadComponents/threadList';
import Header from '../components/HeaderComponents/headerBar';
import ThreadInput from '../components/ThreadComponents/threadInput';
import CategoryList from '../components/CategoryComponents/categoryList';
import ThreadItemSkeleton from '../components/SkeletonComponents/ThreadItemSkeleton';
import CategoryItemSkeleton from '../components/SkeletonComponents/CategoryItemSkeleton';

function HomePage({ auth }) {
    const [modal, setModal] = useState(false);
    const [threadCategory, setThreadCategory] = useState('');
    let threadList = [];
    let filteredThreadsList = [];
    let nameThread = '';

    const {
        threads = [],
        users = [],
    } = useSelector((states) => states);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncPopulateUsersAndThreads());
    }, [dispatch]);

    const onAddThread = (title, category, body) => {
        dispatch(asyncAddThread({ title, category, body }));
        setModal(false);
    };

    const onLike = (id) => {
        dispatch(asyncToogleLikeThread(id));
    };

    const onDislike = (id) => {
        dispatch(asyncToogleDislikeThread(id));
    };

    const onNeutralLike = (id) => {
        dispatch(asyncToggleNeutralLikeThread(id));
    };

    const onNeutralDislike = (id) => {
        dispatch(asyncToggleNeutralDislikeThread(id));
    };

    const onSignOut = () => {
        dispatch(asyncUnsetAuthUser());
    };

    function onShowModalHandler() {
        document.body.style.overflow = 'hidden';
        setModal(true);
    }

    function onCloseModalHandler() {
        document.body.style.overflow = 'unset';
        setModal(false);
    }

    function onCategoryChange(event) {
        if (event.target.value === threadCategory) {
            setThreadCategory('');
        } else {
            setThreadCategory(event.target.value);
        }
    }

    const filteredThreads = threads.filter((thread) => thread.category === threadCategory);

    filteredThreadsList = filteredThreads.map((thread) => ({
        ...thread,
        ownerName: users.find((user) => user.id === thread.ownerId)
    }));

    threadList = threads.map((thread) => ({
        ...thread,
        ownerName: users.find((user) => user.id === thread.ownerId)
    }));

    if (auth !== null) {
        filteredThreadsList = filteredThreadsList.map((thread) => ({
            ...thread,
            authUser: auth.id,
        }));

        threadList = threadList.map((thread) => ({
            ...thread,
            authUser: auth.id,
        }));

        nameThread = auth.name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }

    return (
        <section className="home-page">
            <Header auth={auth} logout={onSignOut} />
            <div className="banner-container">
                <div className="banner-card">
                    {auth === null ? (
                        <div className="banner-card__title">Hallo!</div>
                    ) : (
                        <div className="banner-card__title">Selamat Datang, {nameThread}!</div>)}
                    <p>
                        <span>FoCus</span> atau <span>Forum Discussion</span> merupakan platform diskusi bersama yang disediakan untuk membahas atau menjawab
                        beberapa pertanyaan maupun kesulitan yang dibuat oleh user. Jika anda mempunyai pertanyaan, jangan sungkan untuk bertanya.
                    </p>
                    {auth !== null && (
                        <div className="add-button">
                            <button type="button" aria-label="Tambah Diskusi" onClick={onShowModalHandler}>Tambah Diskusi</button>
                        </div>
                    )}
                </div>
            </div>
            <h2>Daftar Diskusi</h2>
            {threadList.length === 0
                ? (
                    <div className="categories-list">
                        <CategoryItemSkeleton cards={3} />
                    </div>
                )
                : <CategoryList threads={threadList} handleClick={onCategoryChange} selected={threadCategory} /> }
            { threadList.length === 0 ? (
                <div className="threads-list">
                    <ThreadItemSkeleton cards={2} />
                </div>
            ) : (
                <ThreadsList
                    threads={filteredThreadsList.length === 0 ? threadList : filteredThreadsList}
                    like={onLike}
                    dislike={onDislike}
                    neutralLike={onNeutralLike}
                    neutralDislike={onNeutralDislike}
                />
            )}

            {modal && <ThreadInput addThread={onAddThread} closeModal={onCloseModalHandler} />}

        </section>
    );
}

const authUserShape = {
    name: PropTypes.string.isRequired,
};

HomePage.propTypes = {
    auth: PropTypes.shape(authUserShape),
};

export default HomePage;
