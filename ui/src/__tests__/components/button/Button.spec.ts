import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/button/Button.vue'
import { ButtonSize } from '@/components/button/Button.ts';

describe('Button Component', () => {
    it('renders correctly with default size', () => {
        const wrapper = mount(Button)
        expect(wrapper.classes()).toContain('text-white')
        expect(wrapper.classes()).toContain(ButtonSize.Medium)
    })

    it('applies the large size correctly', () => {
        const wrapper = mount(Button, {
            props: { size: ButtonSize.Large }
        })
        expect(wrapper.classes()).toContain(ButtonSize.Large)
        expect(wrapper.classes()).not.toContain(ButtonSize.Medium)
    })

    it('displays slot content correctly', () => {
        const slotContent = 'Click Me'
        const wrapper = mount(Button, {
            slots: { default: slotContent }
        })
        expect(wrapper.text()).toContain(slotContent)
    })
})
