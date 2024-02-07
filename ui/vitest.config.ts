import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'happy-dom',
            exclude: [...configDefaults.exclude, 'e2e/*'],
            include: ['./src/__tests__/**/*.{js,tsx,ts}'],
            setupFiles: ['./test-setup.ts'],
        },
    }),
)
