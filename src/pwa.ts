import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    console.log('SW registered now: ', swScriptUrl)
  },
  onOfflineReady() {
    console.log('PWA application ready to work offline')
  },
},)

