import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlexableModal, FlexableType } from "../../components/FlexableModal";
import { useState } from "react";

// >>>>>> const area start >>>>>>>

const BUTTON_SIZE = 50;

// >>>>>> const area end >>>>>>>

function HomePage() {

    const [isShowModal, refreshModalState] = useState(false);

    function _renderAddButton() {
        return (
            <TouchableOpacity 
                style={{ position: 'absolute', bottom: 80, backgroundColor: 'red', right: 50, width: BUTTON_SIZE, height: BUTTON_SIZE }}
                onPress={() => {
                    refreshModalState(true);
                }}
            >
                <View style={{ backgroundColor: 'yellow', height: BUTTON_SIZE, width: BUTTON_SIZE, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: BUTTON_SIZE / 2 }}>
                    <Text style={{ color: 'black', fontSize: 40, fontWeight: '400' }}>+</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function _renderModal() {
        return null;
        return (
            <FlexableModal
                visible={true}
                // type={FlexableType.FLEX}
                // children={_renderModalContent()}
                // onClose={() => {
                //     refreshModalState(false);
                // }}
            />
        );
    }

    function _renderModalContent() {
        return (
            <View style={{ flexDirection: 'column', height: 100, width: '100%', backgroundColor: 'red' }}></View>
        );
    }

    return (
        <View style={styles.style_home_container}>
            <View style={{ marginTop: 50, backgroundColor: 'blue' }}>
                <Text>Home</Text>
            </View>
            {_renderAddButton()}
            {_renderModal()}
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