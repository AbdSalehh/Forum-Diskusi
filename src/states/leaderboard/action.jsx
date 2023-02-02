const ActionType = {
    RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderBoardsActionCreator(leaderboards) {
    return {
        type: ActionType.RECEIVE_LEADERBOARDS,
        payload: {
            leaderboards,
        },
    };
}

export { ActionType, receiveLeaderBoardsActionCreator };
