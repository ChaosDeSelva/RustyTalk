import { config } from '@vue/test-utils'
import { setupServer } from 'msw/node'
import { handlers } from './mock-handlers.ts'
import { afterAll, afterEach, beforeAll } from 'vitest'

const server = setupServer(...handlers)

beforeAll(() => {
    server.listen()
})

afterEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})

const tippyDirectiveMock = {
    mounted() {},
};

config.global.directives = {
    tippy: tippyDirectiveMock
};
