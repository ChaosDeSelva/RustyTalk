import { defineStore } from 'pinia'
import { useMessagesStore } from './messages.ts'
import { useUsersStore } from './users.ts'
import { ref } from 'vue';
enum Kind {
    SignIn = 'signIn',
    Message = 'message',
}
interface Event {
    kind: Kind
    user: string
    index: number
    message: string
}
export const useWebSocketStore = defineStore('webSocket', () => {
    const socket = ref(null)

    const initializeConnection = async () => {
        const ws = new WebSocket(`${import.meta.env.VITE_WEBSOCKET}/ws`)

        socket.value = ws

        ws.onmessage = (message) => {
            const data: Event = JSON.parse(message.data)

            if (data.kind === Kind.SignIn) {
                const { addUser } = useUsersStore()
                addUser(data.user)

            } else if (data.kind === Kind.Message) {
                const { addMessage } = useMessagesStore()
                const message: Omit<Event, 'kind'> = data
                addMessage(message)
            }
        }
    }

    const closeConnection = () => {
        socket.value.close();
    }

    return {
        initializeConnection,
        closeConnection
    }
})
