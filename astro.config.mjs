import { defineConfig } from 'astro/config'
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
	site: "https://amindforlanguage.com/",
	base:"/rouse-greek-boy-pwa",
	outDir: 'docs',
	output: "static",
	build: {
		assets: 'astro'
	},
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  integrations: [
    AstroPWA({
      mode: 'development',
      base: '/rouse-greek-boy-pwa/',
      scope : '/rouse-greek-boy-pwa/',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Rouse PWA',
        short_name: 'Rouse PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/404',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        maximumFileSizeToCacheInBytes: 3000000,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
})
