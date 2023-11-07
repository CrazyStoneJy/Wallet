import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView, useBottomSheetTimingConfigs } from "@gorhom/bottom-sheet";
import { useRef, useCallback, ReactNode } from 'react';
import { useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Easing } from "react-native-reanimated";

export enum FlexableType {
    FLEX, // 自适应高度
    FIX, // 固定高度
    FIX_TO_FULL, // 固定高度，滑动到全屏
    FLEX_TO_FULL // 自适应高度，滑动到全屏
}

export interface FlexableModalProps {
    visible: boolean;
    maxHeight?: number;
    fixHeight?: number | string; // 固定高度，`FlexableType`为`FIX`或者`FIX_TO_FULL`时,才有效
    children?: ReactNode;
    onClose?: Function;
    type?: FlexableType
    setRefCallback?: Function;
    isTransparentBackground?: boolean;
}

function FlexableModal(props: FlexableModalProps) {

    const { visible, onClose, children, type, maxHeight, fixHeight, setRefCallback, isTransparentBackground } = props;
    const { height: screenHeight } = useWindowDimensions();
    const DEFAULT_MAX_HEIGHT = 0.8 * screenHeight;
    const DEAULT_FIX_HEIGHT = 0.3 * screenHeight;
    const style_transparent = isTransparentBackground ? { backgroundColor: 'transparent' } : {};

    // hooks
    let sheetRef = useRef<BottomSheet>(null);
    // callbacks
    const handleSheetChange = useCallback((index: number) => {
        // console.log("handleSheetChange", index);
        if (index === - 1) {
            onClose && onClose();
        }
    }, []);

    const handleClosePress = useCallback(() => {
        sheetRef.current?.close(closeAnimationConfigs);
    }, []);

    function close() {
        handleClosePress();
    }

    function setRef(_ref: any) {
        // logD("_ref: ", _ref);
        setRefCallback && setRefCallback(_ref);
        if (sheetRef) {
            sheetRef.current = _ref;
        }
    }

    function getConfigByType(): any {
        const _fixHeight = fixHeight || DEAULT_FIX_HEIGHT;
        switch (type) {
            case FlexableType.FLEX:
                return {
                    enableDynamicSizing: true,
                    contentHeight: 1,
                    maxDynamicContentSize: maxHeight || DEFAULT_MAX_HEIGHT
                };
            case FlexableType.FIX:
            default:
                return {
                    snapPoints: [_fixHeight]
                };
            case FlexableType.FIX_TO_FULL:
                return {
                    snapPoints: [_fixHeight, '100%']
                };
            case FlexableType.FLEX_TO_FULL:
                return {
                    enableDynamicSizing: true,
                    contentHeight: 1,
                    maxDynamicContentSize: maxHeight || DEFAULT_MAX_HEIGHT,
                    snapPoints: ['100%']
                };
        }
    }

    const closeAnimationConfigs = useBottomSheetTimingConfigs({
        duration: 250,
        easing: Easing.ease
    });

    return (
        <Modal visible={visible}
            transparent={true}
            onRequestClose={() => {
                close();
            }}>
            <GestureHandlerRootView>
                <View style={[styles.style_container, style_transparent]}>
                    <TouchableOpacity style={styles.style_top_section} onPress={() => {
                        close();
                    }} />
                    <BottomSheet
                        ref={(_ref) => setRef(_ref)}
                        handleIndicatorStyle={{ backgroundColor: '#8F8F8F', height: 4, width: 34 }}
                        onChange={handleSheetChange}
                        enablePanDownToClose={true}
                        // gestureEventsHandlersHook={useGestureEventsHandlersDefault}
                        onClose={() => {
                            // console.log(">>>bottom sheet close");
                            onClose && onClose();
                        }}
                        {...getConfigByType()}
                    >
                        <BottomSheetView>
                            {children}
                        </BottomSheetView>
                    </BottomSheet>
                </View>
            </GestureHandlerRootView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    style_container: {
        backgroundColor: '#00000099',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    style_top_section: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    style_bottom_section: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'transparent',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    style_bottom_container: {
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'column',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    }
});

export {
    FlexableModal
}