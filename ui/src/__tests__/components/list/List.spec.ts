import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import List from '@/components/list/List.vue'

describe('List Component', () => {
    it('renders a list of items', () => {
        const items = ['Item 1', 'Item 2', 'Item 3']
        const wrapper = mount(List, {
            props: { items, highlight: 'Item 2' },
        })

        expect(wrapper.findAll('li').length).toBe(items.length)
    })

    it('highlights the correct item', () => {
        const items = ['Item 1', 'Item 2', 'Item 3']
        const highlight = 'Item 2'
        const wrapper = mount(List, {
            props: { items, highlight }
        })

        const highlightedItem = wrapper.find('.font-bold.cursor-pointer')
        expect(highlightedItem.text()).toContain(highlight)
    })

    it('emits "highlight-callback" when a highlighted item is clicked', async () => {
        const items = ['Item 1', 'Item 2', 'Item 3']
        const highlight = 'Item 2'
        const wrapper = mount(List, {
            props: { items, highlight }
        })

        await wrapper.find('.font-bold.cursor-pointer').trigger('click')
        expect(wrapper.emitted()).toHaveProperty('highlight-callback')
        expect(wrapper.emitted('highlight-callback')).toHaveLength(1)
    })
})
