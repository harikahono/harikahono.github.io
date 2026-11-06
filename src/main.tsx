import '@fontsource-variable/geist';
import './style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App, LinkedinBanner } from './app';

function Root() {
  return new URLSearchParams(location.search).has('banner') ? <LinkedinBanner /> : <App />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><Root /></StrictMode>);
