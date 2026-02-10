import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

const root = createRoot(document.getElementById('app')!);

root.render(<App />);

// Register service worker for PWA with immediate activation
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
  onRegisteredSW(swUrl, r) {
    console.log('Service Worker registered:', swUrl);
    if (r) {
      console.log('Service Worker registration:', r);
    }
  },
  onRegisterError(error) {
    console.error('Service Worker registration error:', error);
  },
});
