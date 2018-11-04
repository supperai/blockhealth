const initialState = {
    ehrs:[]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'QUERY_EHR':

            return {
                ...state,
                ehrs: action.data
            };

        default:
            return state;
    }
}