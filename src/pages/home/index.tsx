import { Modal, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { FlexableModal, FlexableType } from "../../components/FlexableModal";
import { useReducer, useState } from "react";
import DigitalInput, { GridType } from "./components/digital_input";
import homeReducer, { DoneButtonState, initState } from './reducer';
import { ACTION_HOME_DEAL_INPUT, ACTION_REFRESH_DIGITAL_INPUT_STATE } from "./components/action";

// >>>>>> const area start >>>>>>>

const BUTTON_SIZE = 50;

// >>>>>> const area end >>>>>>>

function HomePage() {

    const [ state, dispatch ] = useReducer(homeReducer, initState);
    const { costMoney, isShowDigitalInput, doneButtonState } = state || {};

    function _renderAddButton() {
        return (
            <TouchableOpacity 
                style={{ position: 'absolute', bottom: 80, backgroundColor: 'red', right: 50, width: BUTTON_SIZE, height: BUTTON_SIZE }}
                onPress={() => {
                    dispatch({ type: ACTION_REFRESH_DIGITAL_INPUT_STATE, playload: { isShow: true } });
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
                    dispatch({ type: ACTION_REFRESH_DIGITAL_INPUT_STATE, playload: { isShow: false } });
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
                        dispatch({ type: ACTION_HOME_DEAL_INPUT, playload: { gridType } });
                    }}
                />
            </View>
        );
    }

    return (
        <View style={styles.style_home_container}>
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