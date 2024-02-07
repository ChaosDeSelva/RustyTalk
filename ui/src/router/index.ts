export const LOGIN = 'LogIn'
export const MESSAGE_DASHBOARD = 'MessageDashboard'

export const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
    },
    {
        path: '/',
        name: LOGIN,
        meta: { authRequired: false, },
        component: () => import('@/views/LogIn.vue'),
    },
    {
        path: '/chatroom',
        name: MESSAGE_DASHBOARD,
        meta: { authRequired: true, },
        component: () => import('@/views/MessageDashboard.vue'),
    },
];
