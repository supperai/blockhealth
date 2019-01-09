const initialState = {
    requestList: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_REQUEST_LIST':

            let reqList = [];
            let reqs = action.data.split(',');
            for (let i=0; i<reqs.length; i++) {
                reqList.push(reqs[i]);
            }

            return {
                ...state,
                requestList: reqList,
            };

        default:
            return state;
    }
}