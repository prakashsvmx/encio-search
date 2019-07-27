const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';

export function getSearchResults(changed) {
    return {changed, type: GET_SEARCH_RESULTS};
}


export function reducer(state = null, action) {
    const {data, type, changed} = action;
    switch (type) {
        case GET_SEARCH_RESULTS: {
            return {...state, ...changed};
        }
        default:
            return state;
    }
}
