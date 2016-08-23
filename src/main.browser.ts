// Angular 2 Universal
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

// Application
import {App} from './component/app';
import {routes} from './route';

// you must return bootstrap for client.ts
export function ngApp() {
  return bootstrap(App, [
    ...HTTP_PROVIDERS,
    provideRouter(routes)
  ]);
}