if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/rouse-greek-boy-pwa/sw.js', { scope: '/rouse-greek-boy-pwa/' })})}