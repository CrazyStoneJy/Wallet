import { useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated from "react-native-reanimated";
import { color_green, color_primary, color_red } from "../../../colors";
import { font_size_14 } from "../../../dp";

interface LeftSwipeItemProps {
    onLeftSwipe?: Function;
    item: any;
    index: number;
}

function LeftSwipeItem(props: LeftSwipeItemProps) {
    const { item, index } = props;
    const { desc, cost, id } = item || {};
    const swiperableRef = useRef(null);

    useEffect(() => {
        console.log("item: ", item);
    }, []);

    function renderRightActions(
        progress: Animated.AnimatedInterpolation<number>,
        dragX: Animated.AnimatedInterpolation<number>
    ) {
        return (
            <View style={{ height: "100%", width: 120, flexDirection: "row" }}>
                <TouchableOpacity
                    style={styles.style_right_action_item_container}
                    activeOpacity={0.8}
                >
                    <Text style={styles.style_right_action_text}>edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.style_right_action_item_container}
                    activeOpacity={0.8}
                    onPress={deleteAction}
                >
                    <Text style={styles.style_right_action_text}>delete</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function deleteAction() {}

    function close() {
        if (swiperableRef.current) {
            // @ts-ignore
            swiperableRef.current?.close();
        }
    }

    return (
        <GestureHandlerRootView style={styles.style_item_guesture_container}>
            <Swipeable
                childrenContainerStyle={{
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor: color_green,
                }}
                renderRightActions={renderRightActions}
                overshootRight={false}
            >
                <View style={styles.style_item_container} key={`item_${index}`}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginLeft: 15 }}>{desc}</Text>
                    </View>
                    <Text style={{ marginRight: 10 }}>{"-" + cost}</Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    style_item_guesture_container: {
        flexDirection: "row",
        height: 50,
        width: "100%",
        alignItems: "center",
        // backgroundColor: "orange",
        marginBottom: StyleSheet.hairlineWidth,
    },
    style_item_container: {
        flexDirection: "row",
        height: 50,
        width: "100%",
        alignItems: "center",
        backgroundColor: color_primary,
    },
    style_right_action_item_container: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color_red,
    },
    style_right_action_text: {
        fontSize: font_size_14,
        color: "white",
    },
});

export default LeftSwipeItem;
