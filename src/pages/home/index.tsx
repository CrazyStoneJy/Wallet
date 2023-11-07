import { Modal, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { FlexableModal, FlexableType } from "../../components/FlexableModal";
import { useReducer, useState } from "react";
import DigitalInput, { GridType } from "./components/digital_input";
import homeReducer, { initState } from './reducer';
import { ACTION_HOME_DEAL_INPUT, ACTION_REFRESH_DIGITAL_INPUT_STATE } from "./components/action";

// >>>>>> const area start >>>>>>>

const BUTTON_SIZE = 50;

// >>>>>> const area end >>>>>>>

function HomePage() {

    const [ state, dispatch ] = useReducer(homeReducer, initState);
    const { costMoney, isShowDigitalInput } = state || {};

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
        return (
            <View style={{ flexDirection: 'column', width: '100%' }}>
                <DigitalInput onClickCallback={(gridType: GridType, text: string) => {
                    dispatch({ type: ACTION_HOME_DEAL_INPUT, playload: { gridType } });
                }}/>
            </View>
        );
    }

    return (
        <View style={styles.style_home_container}>
            <View style={{ marginTop: 50 }}>
                <Text>{costMoney}</Text>
            </View>
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