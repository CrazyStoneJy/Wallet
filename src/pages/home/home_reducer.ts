export type Action = {
    type: string,
    payload?: any
}

export const initHomeState = {};

// todo
function homeReducer(state: any, action: Action) {
    return {
        ...state
    }
}

export default homeReducer;