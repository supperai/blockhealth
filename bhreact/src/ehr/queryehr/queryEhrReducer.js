import {ITEM} from '../constant/EhrConstants';

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
                for (let j = 0; j < action.data[i].length; j++) {
                    newEhrs.push(action.data[i][j]);
                    newEhrs[index].columnname = ITEM[action.data[i][j].columnname];
                    newEhrs[index].no = ++index;
                }
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

        case 'LOGIN':
            return {
                ...state,
                token:action.data
            };

        default:
            return state;
    }
}