const initialState = {
    ehrs:[],
    token: '',
    diseaseList: [],
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
            if (action.data.length > 0) {
                let tmpList = action.data.split(',');
                for (let i = 0; i < tmpList.length; i++) {
                    if (tmpList[i] !== '') {
                        diseases.push(tmpList[i]);
                    }
                }
            }

            return {
                ...state,
                diseaseList:diseases
            };

        case 'LOGIN':
            return {
                ...state,
                token:action.data
            };

        default:
            return state;
    }
}