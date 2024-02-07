<script setup lang="ts">
  const props = defineProps<{
    items: string[],
    highlight: string,
  }>()

  const emit = defineEmits(['highlight-callback']);

  const isHighlighted = (item: string) => item === props.highlight

  const tippyOptions = (item: string) => {
    return {
      content: item,
      placement: 'right',
      arrow: true,
      onShow({ reference: { offsetWidth, scrollWidth } }: { reference: { offsetWidth: number, scrollWidth: number }}) {
        return offsetWidth < scrollWidth
      }
    }
  }

  const onItemClick = (item: string) => {
     if(isHighlighted(item)) {
       emit('highlight-callback')
     }
  }
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li v-for="(item, index) in items" :key="index"
        :class="[isHighlighted(item) ? 'highlighted font-bold cursor-pointer' : '', 'truncate']"
        v-tippy="tippyOptions(item)"
        @click="onItemClick(item)"
    >
      <span v-if="isHighlighted(item)">*</span>{{item}}
    </li>
  </ul>
</template>
