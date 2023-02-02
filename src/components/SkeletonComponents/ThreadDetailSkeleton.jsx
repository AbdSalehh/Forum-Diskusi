import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ThreadDetailSkeleton() {
    return (
        <SkeletonTheme color="#8a8a8a" highlightColor="#cfcfcf">
            <div className="thread-detail">
                <div className="thread-item__content">
                    <div className="thread-item__owner">
                        <Skeleton circle height={40} width={40} />
                        <p className="thread-item__user-name" style={{ 'padding': '0 10px' }}>
                            <Skeleton width={100} height={20} />
                        </p>
                        •
                        <p className="thread-item__created-at" style={{ 'padding': '0 10px' }}>
                            <Skeleton width={100} height={20} />
                        </p>
                    </div>
                    <Skeleton className="thread-detail__title-skeleton" />
                    <Skeleton width={100} height={18} />
                    <div className="thread-detail__body">
                        <Skeleton count={8} height={20} style={{ 'paddingTop': '20px' }} />
                    </div>
                </div>
                <div className="thread-item__other-info">
                    <div className="thread-item__comment">
                        <Skeleton width={120} height={30} />
                    </div>
                    <div className="thread-item__button">
                        <Skeleton width={30} height={30} />
                        <Skeleton width={30} height={30} />
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
}

export default ThreadDetailSkeleton;
