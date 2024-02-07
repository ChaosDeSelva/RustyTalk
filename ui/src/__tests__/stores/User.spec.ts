import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUsersStore } from '@/stores/users.ts'

describe('User Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('handles successful login', async () => {
        const user = 'testUser'

        const store = useUsersStore()
        const result = await store.handleLogin(user)

        expect(result).toBe(true)
        expect(store.username).toBe(user)
        expect(sessionStorage.getItem('username')).toBe(user)
    })

    it('fetches logged-in users successfully', async () => {
        const store = useUsersStore()
        await store.fetchLoggedInUsers()

        expect(store.loggedInUsers).toEqual(['user1', 'user2'])
    })
})
