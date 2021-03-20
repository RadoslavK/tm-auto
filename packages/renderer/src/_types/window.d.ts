import type { Api } from 'shared/types/api.type.js';

declare global {
  const window: Window;

  interface Window {
    readonly api: Api;
  }
}