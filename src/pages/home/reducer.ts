import { ACTION_HOME_DEAL_INPUT, ACTION_REFRESH_DIGITAL_INPUT_STATE } from "./components/action";
import { GridType } from "./components/digital_input";

export const initState = {
    costMoney: '',
    isShowDigitalInput: false
};

export default function reducer(state: any, action: any) {
    const { type, playload } = action || {};
    switch (type) {
        case ACTION_HOME_DEAL_INPUT:
            const dealedState = dealInput(state, playload);
            return { ...state, ...dealedState };
        case ACTION_REFRESH_DIGITAL_INPUT_STATE:
            const { isShow } = playload || {};
            return { ...state, isShowDigitalInput: isShow };
    }
}

function dealInput(state: any, playload: any) {
    let { costMoney, isShowDigitalInput } = state || {};
    const { gridType } = playload || {};
    switch (gridType) {
        case GridType.GRID_1:
        case GridType.GRID_2:
        case GridType.GRID_3:
        case GridType.GRID_4:
        case GridType.GRID_5:
        case GridType.GRID_6:
        case GridType.GRID_7:
        case GridType.GRID_8:
        case GridType.GRID_9:
            costMoney = carryDigital(costMoney, gridType);
            break;
        case GridType.GRID_BACK:
            if (costMoney && costMoney.length > 0) {
                costMoney = costMoney.slice(0, costMoney.length - 1);
            }
            break;
        case GridType.GRID_DONE:
            isShowDigitalInput = false;
            break;
    }
    return { ...state, costMoney, isShowDigitalInput };
}

// 进位
function carryDigital(num: number, digital: number) {
    console.log("num: ", num, ", digital: ", digital);
    return num + digital;
}