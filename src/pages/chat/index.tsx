import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { ROLE_USER } from '../../consts';
import chatStore from './chat';
import chatgpt from './chatgpt';

function ChatPage() {

    const navigation = useNavigation();
    const [data, refreshData] = useState(chatStore.getMessages());
    const [textValue, refreshTextValue] = useState('');
    const chatListRef = useRef(null);

    useEffect(() => {
        chatgpt.connect();
    }, []);

    function renderHeader() {
        return (
            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
                <Text style={{ fontSize: 26, color: 'black' }}>Chat with AI</Text>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function renderItem({item, index}: any) {
        const { role, content } = item || {};
        const style_chat_container = role === ROLE_USER ? { flexDirection: 'row-reverse' } : { flexDirection: 'row'};
        const style_chat_text = (role === ROLE_USER) ? { marginRight: 15, justifyContent: 'flex-end' } : { marginLeft: 15, justifyContent: 'flex-start' };
        const img_uri = role === ROLE_USER ? require('../../assets/icon_user.png') : require('../../assets/icon_ai.png');
        return (
            <View key={`item_${index}`} style={[{ paddingHorizontal: 20, marginBottom: 10 }, style_chat_container]}>
                <Image style={{ height: 30, width: 30, borderRadius: 15 }} source={img_uri}></Image>
                <View style={[style_chat_text, { flex: 1, flexDirection: 'row', marginTop: 5 }]}>
                    <Text selectable={true}>{content}</Text>
                </View>
            </View>
        );
    }

    function refreshChatList(message: string, type?: string) {
        if (type === 'user') {
            chatStore.addUserMessage(message);
            refreshData(chatStore.getMessages());
            refreshTextValue('');
            setTimeout(() => {
                chatListRef.current.scrollToEnd();
            }, 100);
        } else {
            chatStore.addAIMessage(message);
            refreshData(chatStore.getMessages());
            setTimeout(() => {
                chatListRef.current.scrollToEnd();
            }, 100);
        }
    }

    return (
        <View style={{ height: '100%', width: '100%', flexDirection: 'column' }}>
            {renderHeader()}
            <View style={{ flexDirection: 'column', width: '100%', height: '75%' }}>
                <FlatList
                    ref={chatListRef}
                    data={data}
                    scrollEnabled={true}
                    renderItem={renderItem}/>
            </View>
            <View style={{ height: 60, width: '100%', position: 'absolute', bottom: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextInput style={{ marginHorizontal: 15, borderRadius: 5, borderColor: 'grey', borderWidth: 1, flex: 1, paddingLeft: 15 }}
                    placeholder='Say something'
                    value={textValue}
                    onChangeText={(text) => {
                        refreshTextValue(text);
                    }}
                />
                <TouchableOpacity style={{ marginRight:15 }}
                    onPress={() => {
                        if (textValue === '') {
                            return;
                        }
                        refreshChatList(textValue, 'user');
                        chatgpt.send(chatStore.getLastFiveMessages(), (message: string) => {
                            console.log("message: ", message);
                            refreshChatList(message);
                        });
                    }}
                >
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ChatPage;