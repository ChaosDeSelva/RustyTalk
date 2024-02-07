<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users.ts'
import Button from '@/components/button/Button.vue'
import { MESSAGE_DASHBOARD } from '@/router/index.ts'

const router = useRouter()
const { handleLogin } = useUsersStore()

const username = ref('')

const handleSubmit = async () => {
  const foundUser = await handleLogin(username.value)

  if (foundUser) {
    username.value = ''
    await router.push({name: MESSAGE_DASHBOARD})
  }
}

</script>

<template>
  <div class="bg-FarEastBlack h-screen min-h-full flex flex-col justify-center p-12">
    <div class="bg-ChocolateBlack border border-Gunmetal sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col justify-center gap-3 pt-12 px-16 sm:flex-row sm:items-end">
          <label for="username" class="text-QuickSilver">Username</label>
          <div class="flex-1">
            <input v-model="username" id="username" name="username" type="text" maxlength="64" pattern="[A-Za-z0-9]+" title="Only letters and numbers are allowed" autocomplete="off" required autofocus v-focus class="block w-full border-b border-QuickSilver bg-transparent p-1.5 text-Platinum shadow-sm  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-PearlAqua" />
          </div>
        </div>

        <div class="flex flex-col items-end py-6 px-16">
          <Button>Login</Button>
        </div>
      </form>
    </div>
  </div>
</template>
