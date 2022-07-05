import {
    GET_BAG_STARTED,
    GET_BAG_SUCCESS,
    GET_BAG_FAILURE,
    EMPTY_BAG,
} from "../actions/ActionTypes";

const initialState = {
    loading: true,
    data: {},
    error: {},

};

export default function (state = initialState, action) {
    switch (action.type) {
        case EMPTY_BAG:
            return {
                ...initialState,
            }

        case GET_BAG_STARTED:
            return {
                ...state,
                ...action.payload,
                loading: true,
            }

        case GET_BAG_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
            }

        case GET_BAG_FAILURE:
            return {
                ...state,
                error: { ...action.payload.data },
                loading: false,
            }

        default:
            return state;
    }
}
