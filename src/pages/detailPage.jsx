import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/auth/action';
import {
    asyncAddComment, asyncReceiveThreadDetail, asyncToggleLikeThreadDetail, asyncToggleDislikeThreadDetail,
    asyncToggleNeutralDislikeThreadDetail, asyncToggleNeutralLikeThreadDetail,
} from '../states/threadDetail/action';
import DetailHeader from '../components/HeaderComponents/detailHeader';
import ThreadDetail from '../components/DetailPageComponents/threadDetail';
import ThreadReplyInput from '../components/DetailPageComponents/threadCommentInput';
import CommentList from '../components/DetailPageComponents/threadCommentList';
import DetailHeaderSkeleton from '../components/SkeletonComponents/DetailHeaderSkeleton';
import ThreadDetailSkeleton from '../components/SkeletonComponents/ThreadDetailSkeleton';
import ThreadCommentInputSkeleton from '../components/SkeletonComponents/ThreadCommentInputSkeleton';

function DetailPage({ auth }) {
    const { id } = useParams();
    const {
        threadDetail = null,
        authUser,
    } = useSelector((states) => states);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncReceiveThreadDetail(id));
    }, [id, dispatch]);

    const onSignOut = () => {
        dispatch(asyncUnsetAuthUser());
    };

    const onAddComment = (content) => {
        dispatch(asyncAddComment({ content, commentTo: id }));
    };

    const onLikeThreadDetail = (threadId) => {
        dispatch(asyncToggleLikeThreadDetail(threadId));
    };

    const onDislikeThreadDetail = (threadId) => {
        dispatch(asyncToggleDislikeThreadDetail(threadId));
    };

    const onNeutralLikeThreadDetail = (threadId) => {
        dispatch(asyncToggleNeutralLikeThreadDetail(threadId));
    };

    const onNeutralDislikeDetail = (threadId) => {
        dispatch(asyncToggleNeutralDislikeThreadDetail(threadId));
    };

    return (
        <section className="detail-page">
            {auth === null ? (<DetailHeaderSkeleton />)
                : (
                    <DetailHeader
                        auth={auth}
                        logout={onSignOut}
                        title={threadDetail === null ? 'Loading...' : threadDetail.title}
                    />
                )}
            {threadDetail === null ? (<ThreadDetailSkeleton />)
                : (
                    <ThreadDetail
                        {...threadDetail}
                        authUser={authUser.id}
                        like={onLikeThreadDetail}
                        dislike={onDislikeThreadDetail}
                        neutralLike={onNeutralLikeThreadDetail}
                        neutralDislike={onNeutralDislikeDetail}
                    />
                )}
            {auth === null ? (<ThreadCommentInputSkeleton />) : <ThreadReplyInput auth={auth} replyThread={onAddComment} />}
            {threadDetail !== null && <CommentList comments={threadDetail.comments} /> }
        </section>
    );
}

DetailPage.propTypes = {
    auth: PropTypes.object
};

export default DetailPage;
