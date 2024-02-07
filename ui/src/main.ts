import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '@/stores/users.ts'
import App from './App.vue'
import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import './style.css'
import { routes, LOGIN, MESSAGE_DASHBOARD } from "@/router/index.ts"

const pinia = createPinia()

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    const store = useUsersStore()
    const { username } = storeToRefs(store)

    if (
        !username.value.length &&
        to.meta.authRequired
    ) {
        return { name: LOGIN }
    }

    if (
        username.value.length &&
        to.name === LOGIN
    ) {
        return { name: MESSAGE_DASHBOARD }
    }
})

const app = createApp(App)

app.directive('focus', {
    mounted(el) {
        el.focus();
    },
});

app.use(pinia)
app.use(router)
app.use(VueTippy, { directive: 'tippy' })

app.mount('#app')
