import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { runOnJS } from "react-native-reanimated";
import xLog from "../../../utils/logs";

interface LeftSwipeItemProps {
    onLeftSwipe?: Function;
    item: any;
    index: number;
}

function LeftSwipeItem(props: LeftSwipeItemProps) {

    const { item, index } = props;
    const { desc, cost } = item || {};

    function _log(_type: string, obj?: any) {
        console.log(_type);
        
    }

    const pan = Gesture.Pan()
        .onBegin((e) => {
            'worklet';
            runOnJS(_log)('onBegin');
        })
        .onUpdate((e) => {
            'worklet';
            // runOnJS(_log)('onChange', e);
        })
        .onFinalize((e) => {
            'worklet';
            // runOnJS(_log)('onFinalize', e);
        });

    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={pan}>
                <Animated.View style={styles.style_item_container} key={`item_${index}`}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginLeft: 15 }}>{desc}</Text>
                    </View>
                    <Text style={{ marginRight: 10 }}>{"-" + cost}</Text>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    style_item_container: {
        flexDirection: 'row',
        height: 50, 
        width: '100%', 
        alignItems: 'center', 
        backgroundColor: 'orange', 
        marginBottom: 10
    }
});

export default LeftSwipeItem;