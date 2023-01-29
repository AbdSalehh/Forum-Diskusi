import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ThreadCommentInputSkeleton() {
    return (
        <SkeletonTheme color="#8a8a8a" highlightColor="#cfcfcf">
            <div className="reply-input">
                <div className="reply-card">
                    <div className="detail-user">
                        <Skeleton circle height={40} width={40} />
                        <p className="thread-item__user-name" style={{ 'padding': '0 10px' }}>
                            <Skeleton width={100} height={20} />
                        </p>
                    </div>
                    <div className="comment-form">
                        <Skeleton height={200} />
                        <div className="reply-button">
                            <Skeleton width={100} height={35} />
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
}

export default ThreadCommentInputSkeleton;
