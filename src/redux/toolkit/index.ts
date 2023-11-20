const combineReducers = (...reducers: any[]) => (prevState: any, value: any) =>
    reducers.reduce((newState, reducer) => reducer(newState, value), prevState);


 export {
    combineReducers
 }