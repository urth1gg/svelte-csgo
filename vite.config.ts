import { sveltekit } from '@sveltejs/kit/vite';
// import { webSocketServer } from './socketsVite';
import type { UserConfig } from 'vite';
import path from 'path';
const config: UserConfig = {
	plugins: [sveltekit()],	
};

export default config;
