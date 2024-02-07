import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMessagesStore } from '@/stores/messages.ts'

describe('useMessagesStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('fetches messages and updates store', async () => {
        const store = useMessagesStore()
        const status = await store.fetchMessages()

        expect(status).toBeTruthy()
        expect(store.messages).toHaveLength(2)
        expect(store.messages[0].user).toBe('user1')
        expect(store.messages[1].user).toBe('user2')
    })

    it('sends a new message and receives an index', async () => { console.log('index')
        const store = useMessagesStore()
        const index = await store.sendMessage('user3', 'Test message')

        expect(index).toBeDefined();
        expect(typeof index).toBe('number');
    })

    it('adds a local message correctly', () => {
        const store = useMessagesStore()
        const newMessage = { index: 3, user: 'user3', message: 'Another message' }

        store.addMessage(newMessage);

        expect(store.messages).toContainEqual(newMessage);
    })
})
