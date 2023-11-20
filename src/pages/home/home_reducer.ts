import { Action } from "../../types/action";
import { ACTION_ADD_COST_ITEM, ACTION_REFRESH_COST_LIST } from "./action";
import calculatorReducer, { DoneButtonState } from "./calulator_reducer";

function homeReducer(state: any, action: Action) {
    const { type, payload } = action || {};
    // xLog.log('type: ', type, ', payload: ', payload, 'state: ', JSON.stringify(state));
    switch (type) {
        case ACTION_REFRESH_COST_LIST:
            const { data } = payload || {};
            return { ...state, data };
        case ACTION_ADD_COST_ITEM:
            const { item } = payload || {};
            const { data: originalData } = state || {};
            originalData.splice(0, 0, item);
            return { ...state, data: originalData };
    }
    // todo how to deal multi reducer.
    return calculatorReducer(state, action);
}

const initHomeState = {
    costMoney: '',  // 计算的金额
    isShowDigitalInput: false,  // 是否显示金额计算器
    doneButtonState: DoneButtonState.DONE, // 完成按钮显示状态
    desc: '', // desc of cost calculator 
    data: [], // cost money 数组
};

export { 
    homeReducer,
    initHomeState
};