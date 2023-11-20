import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function wrap(OriginalComponent: any) {

    return function (props: any) {
        const xOffset = useSharedValue(300);
        const yOffset = useSharedValue(50);
        const [isShowDebug, showDebug] = useState(false);
        const navigation = useNavigation();

        const pan = Gesture.Pan()
            .onBegin(() => {
                // pressed.value = true;
                // console.log("gesture on begin");
            })
            .onChange((event) => {
                xOffset.value = event.x;
                yOffset.value = event.y;
            })
            .onFinalize(() => {
                // console.log("gesture on finish");
            });

        const animatedStyles = useAnimatedStyle(() => ({
            transform: [
                { translateX: xOffset.value },
                { translateY: yOffset.value }
            ]
        }));

        const debugView = () => {
            return (
                <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
                    <View style={{ marginTop: 50 }}/>
                    <TouchableOpacity style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    }}>
                        <Text>跳转埋点记录页面</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    }}>
                        <Text>跳转用户信息页面</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    }}>
                        <Text>跳转Playground页面</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    }}>
                        <Text>跳转Evilsetting页面</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.8} onPress={() => {
                        showDebug(false);
                    }}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        const debugCircleView = () => {
            return (
                isShowDebug ? debugView() : (<GestureHandlerRootView style={[styles.style_debug]}>
                    <GestureDetector gesture={pan}>
                        <View style={{ display: 'flex' }}>
                            <Animated.View style={[styles.style_circle, animatedStyles]}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                    // Alert.alert('go to debug page');
                                    showDebug(true);
                                }}>
                                    <Text style={{ color: 'white' }}>debug</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </GestureDetector>
                </GestureHandlerRootView>)
            );
        }

        return (
            <View style={{ width: '100%', height: '100%', display: 'flex' }}>
                <OriginalComponent {...props} />
                { __DEV__ ? debugCircleView() : null }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    style_debug: {
        position: 'absolute',
    },
    style_circle: {
        width: 50,
        position: 'relative',
        left: 0,
        top: 0,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 25,
    },
});