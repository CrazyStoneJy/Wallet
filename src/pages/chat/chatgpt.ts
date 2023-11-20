import { DeviceEventEmitter } from "react-native";

const uri = "wss://tts-online.sofitalks.ai/";

const ChatGPTState = {
    DEFAULT: 0,
    INITED: 1,
    CONNECTING: 2,
    CLOSE: -1
}

function ChatGPT() {

    let web_socket: any = null;
    let state = ChatGPTState.DEFAULT;
    let _onMessageCallback: any = null;
    let messageContentReceiver = '';

    function init() {
        if (state > ChatGPTState.INITED) {
            console.log("you has aleardy inited.");
            return;
        }
        web_socket = new WebSocket(uri);
        state = ChatGPTState.INITED;
    }

    function addListener(openCallback?: Function) {
        if (!web_socket) {
            return;
        }
        web_socket.onopen = (event: any) => {
            console.log("web socket onopen");
            state = ChatGPTState.CONNECTING;
            openCallback && openCallback();
        }
        web_socket.onmessage = (event: any) => {
            // console.log("web socket onmessage: ");
            const { data } = event || {};
            try {
                const message = JSON.parse(data);
                dealMessageByType(message);
                // const { msg } = message || {};
                // console.log("message: ", message);
            } catch (e) {
                console.log("json parse error: ", e);
            }
        }
        web_socket.onclose = (event: any) => {
            console.log("web socket onclose");
            state = ChatGPTState.CLOSE;
        }
    }

    function dealMessageByType(message: any) {
        const { msg, kind } = message || {};
        if (kind === 'chat') {
            messageContentReceiver += msg;
        } else if (kind === 'chat_end') {
            _onMessageCallback && _onMessageCallback(messageContentReceiver);
            messageContentReceiver = '';
        }
    }

    function connect(openCallback?: Function) {
        init();
        addListener(openCallback);
    }

    function send(messages: any, onMessageCallback: Function) {
        _onMessageCallback = onMessageCallback;
        if (!web_socket || state < ChatGPTState.INITED) {
            connect(() => {
                web_socket.send(JSON.stringify(messages));
            });
            console.log("websocket could be disconnected.");
            return;
        }
        web_socket.send(JSON.stringify(messages));
    }

    function close() {
        console.log("state: ", state);
        if (web_socket && state > ChatGPTState.DEFAULT) {
            console.log("operation close");
            web_socket.close();
        }
    }

    function getState() {
        return state;
    }
    
    return {
        connect,
        send,
        close,
        getState
    }

}

const chatgpt = ChatGPT();

export default chatgpt;