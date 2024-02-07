<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useUsersStore } from '@/stores/users.ts'

  const { findUserSession } = useUsersStore()

  onMounted(() => {
    findUserSession()
  })
</script>

<template>
  <div class="relative w-screen h-screen bg-repeat min-h-screen bg-fixed" >
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in" appear>
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
</template>
