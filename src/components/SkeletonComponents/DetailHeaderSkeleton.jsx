import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function DetailHeaderSkeleton() {
    return (
        <SkeletonTheme color="#8a8a8a" highlightColor="#cfcfcf">
            <div className="detail-header">
                <div className="detail-header-left">
                    <button type="button" className="detail-header__back-button" style={{ 'padding': '10px 0' }}>
                        <Skeleton width={200} height={25} />
                    </button>
                </div>
                <div className="profile-button">
                    <Skeleton circle width={30} height={30} />
                </div>
            </div>
        </SkeletonTheme>
    );
}

export default DetailHeaderSkeleton;
