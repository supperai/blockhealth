const initialState = {
    ehrs:[],
    token: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'QUERY_EHR':

            return {
                ...state,
                ehrs: action.data
            };

        case 'GET_TOKEN':

            return {
                ...state,
                token: action.data
            };

        default:
            return state;
    }
}