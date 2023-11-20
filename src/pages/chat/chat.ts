import { ROLE_AI, ROLE_USER } from "../../consts";

interface Message {
    role: string,
    content: string
}

function ChatStorage() {

    // todo init system content
    let messages: any[] = [];

    function addMessage(message: Message) {
        messages.push(message);
    }

    function addUserMessage(content: string) {
        addMessage({ role: ROLE_USER, content });
    }

    function addAIMessage(content: string) {
        addMessage({ role: ROLE_AI, content });
    }

    function getMessages() {
        return messages.filter((value) => {
            const { role } = value || {};
            return role === ROLE_AI || role == ROLE_USER;
        });
    }

    /**
     * connect to chat gpt.
     */
    function getLastFiveMessages() {
        const len = messages.length;
        const lastFiveMessages = len > 5 ? messages.slice(len - 5) : messages;
        console.log("lastFiveMessages: ", lastFiveMessages);
        return lastFiveMessages;
    }

    function removeAllMessage() {
        messages = [];
    }

    return {
        addUserMessage,
        addAIMessage,
        getMessages,
        removeAllMessage,
        getLastFiveMessages 
    }
}

const chatStore = ChatStorage();

export default chatStore;