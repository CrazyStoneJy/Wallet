import { Modal, StyleSheet, Text, TouchableOpacity, View, Alert, SectionList, FlatList, Button } from "react-native";
import { FlexableModal, FlexableType } from "../../components/FlexableModal";
import { useEffect, useReducer, useState } from "react";
import DigitalInput, { GridType } from "./components/digital_input";
import calulatorReducer, { DoneButtonState, initState } from './calulator_reducer';
import { ACTION_HOME_DEAL_INPUT, ACTION_REFRESH_DIGITAL_INPUT_STATE } from "./action";
import sqliteHelper from "../../db/internal/sqlite_helper";
import dao from "../../db/internal/storage_access_manager";
import { TABLE_COST } from "../../db/consts";
import costStorageManager from "../../db/cost_storage_manager";

// >>>>>> const area start >>>>>>>

const BUTTON_SIZE = 50;

// >>>>>> const area end >>>>>>>

function HomePage() {

    const [ state, dispatch ] = useReducer(calulatorReducer, initState);
    const { costMoney, isShowDigitalInput, doneButtonState } = state || {};
     

    useEffect(() => {
        costStorageManager.createTable();
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

    function _renderModal() {
        // return _renderModalContent();
        return (
            <FlexableModal
                visible={isShowDigitalInput}
                type={FlexableType.FLEX}
                children={_renderModalContent()}
                onClose={() => {
                    dispatch({ type: ACTION_REFRESH_DIGITAL_INPUT_STATE, payload: { isShow: false } });
                }}
            /> 
        );
    }

    function _renderModalContent() {
        const doneText = doneButtonState === DoneButtonState.DONE ? "完成" : "=";
        return (
            <View style={{ flexDirection: 'column', width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20, marginBottom: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: '400' }}>{costMoney ? costMoney : 0}</Text>
                </View>
                <DigitalInput 
                    doneText={doneText}
                    onClickCallback={(gridType: GridType, text: string) => {
                        dispatch({ type: ACTION_HOME_DEAL_INPUT, payload: { gridType } });
                        if (gridType === GridType.GRID_DONE && doneButtonState === DoneButtonState.DONE) {
                            // Alert.alert("costMoney: " + costMoney);
                        }
                    }}
                />
            </View>
        );
    }

    function _renderCostListItem({ item, index }: any ) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text></Text>    
            </View>
        );
    }

    function _renderCostListByDay() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <FlatList data={[]} renderItem={_renderCostListItem}/>
            </View>
        );
    }

    return (
        <View style={styles.style_home_container}>
            <View style={{ marginTop: 50, flexDirection: 'row' }}>
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
            </View>
            {_renderCostListByDay()}
            {_renderModal()}
            {_renderAddButton()}
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