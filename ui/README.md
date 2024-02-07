# Development Setup

The following commands will allow you to run the project.

```
$ git clone the project github url
$ cd chat-backend
$ cargo run
$ cd ui
$ npm i
$ cp -i .env.example .env.local
$ npm run dev
```

You should now have a functional program.

Common issues

1. Make sure to not forget to create your .env file.

```
$ cp -i .env.example .env.local
```

# Unit Testing

If you have already set up the project for development you can run the following command to run the unit tests.

```
$ npm run test
```

# e2e Testing

You will need the program running in order to have successful tests.

```
$ cd ui
$ npm i
$ npm run dev
$ npm run cypress:open
```

You will be given a given in which you can run the e2e tests. If you have an issues please refer to the documentation.

https://docs.cypress.io/guides/getting-started/opening-the-app

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
