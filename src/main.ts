import {enableProdMode, InjectionToken} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {NgZoneWithLogs} from './NgZone';
import {NoopZone} from './NoopZone';

if (environment.production) {
  enableProdMode();
}

export const COMPONENT_LOGS = new InjectionToken<boolean>('COMPONENT_LOGS');

const noop = location.hash.indexOf('noop') !== -1;

platformBrowserDynamic([
    { provide: COMPONENT_LOGS, useValue: true }
  ])
  .bootstrapModule(AppModule, {
    ngZone: noop ? new NoopZone() : new NgZoneWithLogs()
  })
  .catch(err => console.error(err));
