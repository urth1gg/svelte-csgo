import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testMatch: '**/*.e2e.ts',
	// webServer: {
	// 	command: 'npm run build && npm run preview',
	// 	port: 4173
	// }
};

export default config;
