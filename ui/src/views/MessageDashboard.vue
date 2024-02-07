<script setup lang="ts">
import {watch, nextTick, onMounted, ref, onUnmounted} from 'vue'
  import { useUsersStore } from '@/stores/users.ts'
  import Button from '@/components/button/Button.vue'
  import List from '@/components/list/List.vue'
  import { useRouter } from 'vue-router'
  import {ButtonSize} from '@/components/button/Button.ts'
  import {storeToRefs} from 'pinia'
  import {useMessagesStore} from '@/stores/messages.ts'
  import {useWebSocketStore} from '@/stores/websocket.ts'
  import { LOGIN } from '@/router/index.js'

  const router = useRouter()
  const userStore = useUsersStore()
  const messageStore = useMessagesStore()
  const webSocketStore = useWebSocketStore()
  const { username, loggedInUsers } = storeToRefs(userStore)
  const { messages } = storeToRefs(messageStore)

  const message = ref('')
  const messagePane = ref<HTMLUListElement | null>(null)

  onMounted(async () => {
    await userStore.fetchLoggedInUsers()
    await messageStore.fetchMessages()
    await webSocketStore.initializeConnection()
  })

  onUnmounted(() => {
    webSocketStore.closeConnection()
  })

  const scrollToBottom = () => {
    nextTick(() => {
      if (messagePane.value) {
        messagePane.value.scrollTop = messagePane.value.scrollHeight;
      }
    });
  };

  watch(messages, scrollToBottom);

  const handleSubmit = async () => {
    await messageStore.sendMessage(username.value, message.value)
    message.value = ''
  }

  const handleLogout = async () => {
    userStore.handleLogout()
    await router.push({ name: LOGIN })
  }
</script>

<template>
  <div class="bg-FarEastBlack h-screen min-h-full p-4 sm:p-20 flex flex-col gap-3">
    <div class="flex gap-3 flex-1 min-h-0">
      <div class="w-3/12 sm:w-1/12 flex flex-col">
        <div class="flex justify-center pb-6">
          <img class="h-24 w-24" src="@/assets/logo.svg" alt="Chat App Logo" />
        </div>
        <div id="user-wrapper" class="bg-ChocolateBlack border border-Gunmetal flex-1 py-6 px-3 overflow-y-scroll">
          <List :items="loggedInUsers" :highlight="username" @highlight-callback="handleLogout" />
        </div>
      </div>
      <ul ref="messagePane" id="message-pane" class="w-full bg-ChocolateBlack border border-Gunmetal flex-1 min-h-0 py-3 px-6 overflow-y-auto">
        <li v-for="{index, user, message} in messages" :key="index">
          {{user}}: {{message}}
        </li>
        <li v-if="messages.length === 0">No messages yet</li>
      </ul>
    </div>
    <div class="flex gap-3">
      <div class="hidden sm:block w-1/12"></div>
      <form class="w-full sm:flex-1 flex flex-col justify-center items-end gap-6 sm:flex-row" @submit.prevent="handleSubmit">
        <div class="w-full sm:flex-1">
          <input v-model="message" id="message" name="message" type="text" maxlength="512" required v-focus autocomplete="off" placeholder="Chat message" class="block w-full border-b border-QuickSilver bg-transparent p-1.5 text-Platinum placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-PearlAqua" />
        </div>

        <Button :size="ButtonSize.Large">Send</Button>
      </form>
    </div>
  </div>
</template>
