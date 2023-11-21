import { StyleSheet, Text, TouchableOpacity, View, Alert, SectionList, FlatList, Button, Keyboard, KeyboardAvoidingView } from "react-native";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import DigitalInput, { GridType } from "./components/digital_input";
import calulatorReducer, { DoneButtonState } from './calulator_reducer';
import { ACTION_ADD_COST_ITEM, ACTION_CHANGE_DESC, ACTION_HOME_DEAL_INPUT, ACTION_INIT_COST_MONEY, ACTION_REFRESH_COST_LIST, ACTION_REFRESH_DIGITAL_INPUT_STATE } from "./action";
import sqliteHelper from "../../db/internal/sqlite_helper";
import dao from "../../db/internal/storage_access_manager";
import { CostType, TABLE_COST } from "../../db/consts";
import costStorageManager from "../../db/cost_storage_manager";
import { safeParseFloat } from "../../utils/safe_invoker";
import { TextInput } from "react-native-gesture-handler";
import FlexableBottomSheet, { FlexableType } from "../../components/flexable_bottom_sheet";
import xLog from "../../utils/logs";
import { homeReducer, initHomeState } from "./home_reducer";
import { useNavigation } from "@react-navigation/native";

// >>>>>> const area start >>>>>>>

const BUTTON_SIZE = 50;

// >>>>>> const area end >>>>>>>

function HomePage() {

    const [ state, dispatch ] = useReducer(homeReducer, initHomeState);
    const { costMoney, isShowDigitalInput, doneButtonState, desc } = state || {};
    const { data } = state || {};
    const bottomSheetRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        costStorageManager.queryAll((result: []) => {
            dispatch({ type: ACTION_REFRESH_COST_LIST, payload: {
                data: result
            } });
        });
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            xLog.log('Keyboard Shown');
            bottomSheetRef.current?.snapToIndex(1);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            xLog.log('Keyboard Hidden');
            bottomSheetRef.current?.snapToIndex(0);
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    function _renderAddButton() {
        return (
            <TouchableOpacity 
                style={{ position: 'absolute', bottom: 80, backgroundColor: 'red', right: 50, width: BUTTON_SIZE, height: BUTTON_SIZE }}
                onPress={() => {
                    dispatch({ type: ACTION_REFRESH_DIGITAL_INPUT_STATE, payload: { isShow: true } });
                }}
            >
                <View style={{ backgroundColor: 'yellow', height: BUTTON_SIZE, width: BUTTON_SIZE, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: BUTTON_SIZE / 2 }}>
                    <Text style={{ color: 'black', fontSize: 40, fontWeight: '400' }}>+</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function _renderCostListItem({ item, index }: any ) {
        const { cost, desc, type, timestamp } = item || {};
        // xLog.log('item:', item);
        return (
            <View style={{ flexDirection: 'row', height: 50, width: '100%', alignItems: 'center', backgroundColor: 'orange', marginBottom: 10 }} key={`item_${index}`}>
                <View style={{ flex: 1 }}>
                    <Text style={{ marginLeft: 15 }}>{desc}</Text>
                </View>
                <Text style={{ marginRight: 10 }}>{"-" + cost}</Text>
            </View>
        );
    }

    function _renderCostListByDay() {
        if (!data) {
            return;
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 10, width: '100%' }}>
                <FlatList data={data} renderItem={_renderCostListItem}/>
            </View>
        );
    }

    function _rendetDBTestCaseView() {
        return (
            <View style={{ position: 'absolute', bottom: 200, flexDirection: 'row' }}>
                <Button title="insert" onPress={() => {
                        // timestamp: number;
                        // cost: number;
                        // desc: string;
                        // type: CostType;
                    dao.insertData(TABLE_COST, ['cost', 'desc', 'type', 'timestamp'], [12.3, 'test sd', 1, Date.now()]);
                }}/>
                <View style={{ marginRight: 10 }}></View>
                <Button title="drop table" onPress={() => {
                        // timestamp: number;
                        // cost: number;
                        // desc: string;
                        // type: CostType;
                    sqliteHelper.dropTable(TABLE_COST);
                }}/>
                <View style={{ marginRight: 10 }}></View>
                <Button title="query" onPress={() => {
                        // timestamp: number;
                        // cost: number;
                        // desc: string;
                        // type: CostType;
                    costStorageManager.queryAll((result: []) => {
                        // console.log("rseult: ", result);
                    });
                }}/>
                <Button title="go to chat" onPress={() => {
                    navigation.navigate('Chat');
                }}/>
            </View>
        );
    }

    function _renderBottomSheetContent() {
        const doneText = doneButtonState === DoneButtonState.DONE ? "完成" : "=";
        return (
            <View style={{ flexDirection: 'column', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center',  marginHorizontal: 20, marginBottom: 10, height: 40 }}>
                    <View style={{ flexDirection: 'row', flex: 1, height: 40, alignItems: 'center' }}>
                        <Text>描述：</Text>
                        <TextInput 
                            placeholder="请输入"
                            onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(text: string) => {
                                xLog.log('text:', text);
                                dispatch({ type: ACTION_CHANGE_DESC, payload: { desc: text } });
                            }}
                        />
                    </View>
                    <TouchableOpacity 
                        activeOpacity={1}
                        style={{ paddingLeft: 20 }}
                        onPress={() => {
                        if (Keyboard.isVisible()) {
                            Keyboard.dismiss();
                        }
                    }}>
                        <Text style={{ fontSize: 25, fontWeight: '400' }}>{costMoney ? costMoney : 0}</Text>
                    </TouchableOpacity>
                </View>
                <DigitalInput 
                    doneText={doneText}
                    onClickCallback={(gridType: GridType, text: string) => {
                        dispatch({ type: ACTION_HOME_DEAL_INPUT, payload: { gridType } });
                        if (gridType === GridType.GRID_DONE && doneButtonState === DoneButtonState.DONE) {
                            const item = {
                                desc,
                                type: CostType.SHOPPING,
                                cost: safeParseFloat(costMoney),
                                timestamp: Date.now()
                            };
                            // refresh ui
                            dispatch({ type: ACTION_ADD_COST_ITEM, payload: { item } });
                            dispatch({ type: ACTION_INIT_COST_MONEY });
                            // to store database
                            costStorageManager.insert(item);
                        }
                    }}
                />
            </View>
        );
    }

    function _renderBottomSheet() {
        return (
            <FlexableBottomSheet 
                setRefCallback={(_ref: any) => {
                    bottomSheetRef.current = _ref;
                }}
                snapToPercent={'50%'}
                visible={isShowDigitalInput}
                type={FlexableType.FLEX_TO}
                children={_renderBottomSheetContent()}
                onClose={() => {
                    dispatch({ type: ACTION_REFRESH_DIGITAL_INPUT_STATE, payload: { isShow: false } });
                }}
            />
        );
    }

    return (
        <View style={styles.style_home_container}>
            {_renderCostListByDay()}
            {_renderAddButton()} 
            {_rendetDBTestCaseView()}
            {_renderBottomSheet()}
        </View>
    );
}

const styles = StyleSheet.create({
    style_home_container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    }
});

export default HomePage;