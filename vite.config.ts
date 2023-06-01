import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

// <reference types="vitest" />

const config: UserConfig = {
        plugins: [sveltekit()],
};

// const config: UserConfig = {
// 	plugins: [sveltekit(), basicSsl()],
// };

export default config;