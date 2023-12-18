import { Alert, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { color_divider, color_primary } from "../../../colors";

const DIVIDER_WIDTH = 0.5;
const ROW_HEIGHT = 60;

interface DigitalInputProps {
    onClickCallback?: Function; // callback parameter (gridType, text)
    doneText?: string; 
}

export enum GridType {
    GRID_ZERO = 0,
    GRID_1 = 1,
    GRID_2 = 2,
    GRID_3 = 3,
    GRID_4 = 4,
    GRID_5 = 5,
    GRID_6 = 6,
    GRID_7 = 7,
    GRID_8 = 8,
    GRID_9 = 9,
    GRID_DATE = 10,
    GRID_ADD = 11,
    GRID_SUBTRACT = 12,
    GRID_DOT = 13,
    GRID_BACK = 14,
    GRID_DONE = 15
}

const grid = [
    [
        {
            text: '7',
            type: GridType.GRID_7
        },
        {
            text: '8',
            type: GridType.GRID_8
        },
        {
            text: '9',
            type: GridType.GRID_9
        },
        {
            text: '今天',
            type: GridType.GRID_DATE
        }
    ],
    [
        {
            text: '4',
            type: GridType.GRID_4
        },
        {
            text: '5',
            type: GridType.GRID_5
        },
        {
            text: '6',
            type: GridType.GRID_6
        },
        {
            text: '+',
            type: GridType.GRID_ADD
        }
    ],
    [
        {
            text: '1',
            type: GridType.GRID_1
        },
        {
            text: '2',
            type: GridType.GRID_2
        },
        {
            text: '3',
            type: GridType.GRID_3
        },
        {
            text: '-',
            type: GridType.GRID_SUBTRACT
        }
    ],
    [
        {
            text: '.',
            type: GridType.GRID_DOT
        },
        {
            text: '0',
            type: GridType.GRID_ZERO
        },
        {
            text: 'C',
            type: GridType.GRID_BACK
        },
        {
            text: '完成',
            type: GridType.GRID_DONE
        }
    ]
];

function DigitalInput(props: DigitalInputProps) {

    const { width: screenWidth } = useWindowDimensions();
    const everWidth = (screenWidth - DIVIDER_WIDTH * 3) / 4;
    const { onClickCallback, doneText } = props;

    function _renderCell(value: any) {
        const { type, text } = value || {};
        let textContent = text;
        let style_option = {};
        let style_container_option = {};
        if (type === GridType.GRID_ADD || type === GridType.GRID_SUBTRACT) {
            style_option = { fontSize: 25 };
        } 
        if (type === GridType.GRID_DONE){
            style_container_option = { backgroundColor: color_primary };
            textContent = doneText;
        }
        
        return (
            <TouchableOpacity onPress={() => {
                // Alert.alert(text);
                onClickCallback && onClickCallback(type, text);
            }}>
                <View style={[{ height: ROW_HEIGHT, width: everWidth, justifyContent: 'center', alignItems: 'center' }, style_container_option]}>
                    <Text style={[{ fontSize: 20, fontWeight: '400' }, style_option]}>{textContent}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function _renderRow(array: any, index: number) {
        // const style_row_option = (index === grid.length - 1) ? {} : { height: ROW_HEIGHT + DIVIDER_WIDTH };
        return (
            <View style={{ flexDirection: 'column' }} key={`item_${index}`}>
                <View style={{ height: DIVIDER_WIDTH, width: screenWidth, backgroundColor: color_divider }}/>
                <View style={[styles.style_row_container]}>
                    {
                        array.map((ele: any, index: number) => {
                            return (
                                <View style={{ flexDirection: 'row' }} key={`item_${index}`}>
                                    {_renderCell(ele)}
                                    <View style={{ height: ROW_HEIGHT, width: DIVIDER_WIDTH, backgroundColor: color_divider }}/>
                                </View>
                            );
                        })
                    }
                </View>
            </View>
        );
    }

    return (
        <View style={styles.style_container}>
            {
                grid.map((value: any, index: number) => {
                    return _renderRow(value, index);
                })
            }
            <View style={{ height: DIVIDER_WIDTH, width: screenWidth, backgroundColor: color_divider }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    style_container: {
        flexDirection: 'column',
        width: '100%'
    },
    style_row_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: ROW_HEIGHT + DIVIDER_WIDTH
    }
});

export default DigitalInput; 