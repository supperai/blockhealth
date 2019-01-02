const initialState = {
    requestList: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_REQUEST_LIST':

            return {
                requestList: action.data,
                ...state,
            };

        default:
            return state;
    }
}