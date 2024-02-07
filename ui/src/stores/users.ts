import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
    const username = ref('')
    const loggedInUsers = ref<string[]>([])

    const SESSION_KEY = 'username'

    const handleLogin = async (user: string) => {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user })
        })

        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        const record: { user: string } = await response.json()

        const isValidUser = record.user === user

        if (isValidUser) {
            username.value = record.user
            sessionStorage.setItem(SESSION_KEY, username.value);
        } else {
            const message = 'Invalid user';
            throw new Error(message);
        }

        return isValidUser
    }

    const fetchLoggedInUsers = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        const record: { users: string[] } = await response.json()

        loggedInUsers.value = record.users

        return response.ok
    }

    const findUserSession = () => {
        let sessionUsername = sessionStorage.getItem(SESSION_KEY)

        if (sessionUsername) {
            username.value = sessionUsername
        }
    }

    const addUser = (user: string) => {
        loggedInUsers.value = [user, ...loggedInUsers.value]
    }

    const handleLogout = () => {
        username.value = ''
        sessionStorage.removeItem(SESSION_KEY)
    }

    return {
        username,
        handleLogin,
        loggedInUsers,
        fetchLoggedInUsers,
        findUserSession,
        addUser,
        handleLogout,
    }
})
