<script setup lang="ts">
  import { ButtonSize } from '@/components/button/Button.ts';

  /*
    TODO: extend to handle more than form submission types
   */

  const props = defineProps<{
    size?: ButtonSize
  }>()

  const styles = {
    base: 'group w-fit text-white transform ease-out duration-300 transition hover:text-PearlAqua hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-PearlAqua',
    fontSize: props.size || ButtonSize.Medium
  }
</script>

<template>
  <button type="submit" :class="Object.entries(styles).flat()">
    <span class="group-hover:pr-2">[</span> <slot /> <span class="group-hover:pl-2">]</span>
  </button>
</template>
