import { http, HttpResponse } from 'msw'

type AddUserRequestBody = {
    user: string
}

export const handlers = [
    http.post<{}, AddUserRequestBody>(`${import.meta.env.VITE_SERVER}/signin`, async ({ request }) => {
        const record = await request.json()
        return HttpResponse.json({ user: record.user })
    }),

    http.get(`${import.meta.env.VITE_SERVER}/users`, () => {
        const users = ['user1', 'user2']
        return HttpResponse.json({ users })
    }),

    http.post(`${import.meta.env.VITE_SERVER}/messages`, () => {
        return HttpResponse.json({ index: 3 })
    }),

    http.get(`${import.meta.env.VITE_SERVER}/messages`, () => {
        const messages = [
            { index: 1, user: 'user1', message: 'Hello' },
            { index: 2, user: 'user2', message: 'Hi there' },
        ]

        return HttpResponse.json({ messages })
    }),
]
