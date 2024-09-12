import { actionType } from "./actionTypes";

export const initialState = {
    isLoading: false,
    error: null
};

function fetchReducer(state, action) {
    switch (action.type) {
        case actionType.fetchStart: { 
            return {
                isLoading: true,
                ...state
            }
        }

        case actionType.fetchSuccess: {
            return {
                isLoading: false,
                ...state
            }
        }

        case actionType.fetchFailed: {
            return {
                isLoading: false,
                error: action.payload,
            }
        }

        case actionType.fetchEnd: {
            return {
                isLoading: false,
                ...state
            }
        }

        default: { return {state} }
    };    
}

export default fetchReducer;