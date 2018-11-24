const initialState = {
    ehrs:[],
    token: '',
    diseaseList: ['a','b'],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'QUERY_EHR':

            let newEhrs = state.ehrs;
            let index = state.ehrs.length;
            for (let i = 0; i < action.data.length; i++) {
                newEhrs.push(action.data[i]);
                newEhrs[index].no = ++index;
            }

            return {
                ...state,
                ehrs: newEhrs
            };

        case 'CLEAR_EHRS':
            return {
                ...state,
                ehrs: []
            };

        case 'GET_DISEASE_LIST':
            let diseases = [];
            for (let i = 0; i < action.data.length; i++) {
                diseases.push(action.data[i]);
            }
            return {
                ...state,
                diseaseList:diseases
            };

        default:
            return state;
    }
}