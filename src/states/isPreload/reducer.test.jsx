import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer function', () => {
    it('should return the initial state when given by unknown action', () => {
        // arrange
        const initialState = [];
        const action = { type: 'UNKNOWN' };

        // action
        const nextState = isPreloadReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the isPreload when given by SET_IS_PRELOAD action', () => {
        // arrange
        const initialState = true;
        const action = {
            type: ActionType.SET_IS_PRELOAD,
            payload: {
                isPreload: false,
            },
        };

        // action
        const nextState = isPreloadReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.isPreload);
    });
});