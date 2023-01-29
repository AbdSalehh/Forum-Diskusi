import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
    return (
        <div className="loading">
            <LoadingBar style={{ backgroundColor: '#25262B' }} />
        </div>
    );
}

export default Loading;
