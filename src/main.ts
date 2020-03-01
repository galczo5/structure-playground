import {enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {NgZoneWithLogs} from './NgZone';
import {NoopZone} from './NoopZone';

if (environment.production) {
  enableProdMode();
}

const noop = true;

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    //ngZone: noop ? new NoopZone() : new NgZoneWithLogs()
    ngZone: 'noop'
  })
  .catch(err => console.error(err));
