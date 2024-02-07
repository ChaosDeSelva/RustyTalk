import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Message {
    index: number,
    user: string,
    message: string,
}

export const useMessagesStore = defineStore('messages', () => {
    const messages = ref<Message[]>([])

    const sendMessage = async (user: string, message: string) => {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, message })
        })

        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        const record: { index: number } = await response.json()

        return record.index
    }

    const fetchMessages = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`
            throw new Error(message);
        }

        const record: { messages: Message[] } = await response.json()

        messages.value = record.messages.sort((a, b) => a.index - b.index)

        return response.ok
    }

    const addMessage = (message: Message) => {
        let insertionIndex = messages.value.findIndex(item => message.index < item.index)

        if (insertionIndex === -1) {
            messages.value = [...messages.value, message]
        } else {
            messages.value.splice(insertionIndex, 0, message)
        }
    }

    return {
        messages,
        sendMessage,
        fetchMessages,
        addMessage,
    }
})
