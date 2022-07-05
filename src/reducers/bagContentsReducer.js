import {

    GET_BAG_CONTENTS_STARTED,
    GET_BAG_CONTENTS_SUCCESS,
    GET_BAG_CONTENTS_FAILURE,
    REMOVE_BAG_ITEM_SUCCESS,
    EMPTY_BAG_CONTENTS,
} from "../actions/ActionTypes";

const initialState = {
    items: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    switch (action.type) {

        case EMPTY_BAG_CONTENTS:
            return {
                ...initialState,
            }

        case GET_BAG_CONTENTS_STARTED:
            return {
                ...state,
                loading: action.payload.loading,
            }

        case GET_BAG_CONTENTS_SUCCESS:
            return {
                ...state,
                items: action.payload.items || [],
                loading: action.payload.loading,
            }

        case GET_BAG_CONTENTS_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: action.payload.loading,
            }

        case REMOVE_BAG_ITEM_SUCCESS:
            return {
                ...state,
                items: action.payload.items || [],
                loading: action.payload.loading,
            }

        default:
            return state;
    }
}
