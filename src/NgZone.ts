import {EventEmitter, NgZone} from '@angular/core';

export class NgZoneWithLogs extends NgZone {

  readonly ngZone: NgZone;

  constructor() {
    const conf = {
      enableLongStackTrace: false,
      shouldCoalesceEventChangeDetection: false
    };

    super(conf);
    this.ngZone = new NgZone(conf)
  }

  readonly hasPendingMacrotasks: boolean;
  readonly hasPendingMicrotasks: boolean;
  readonly isStable: boolean;
  readonly onUnstable: EventEmitter<any>;
  readonly onMicrotaskEmpty: EventEmitter<any>;
  readonly onStable: EventEmitter<any>;
  readonly onError: EventEmitter<any>;

  run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T {
    console.log('ZONE: run', fn, applyThis, applyArgs);
    return this.ngZone.run(fn, applyThis, applyArgs);
  }

  runTask<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[], name?: string): T {
    console.log('ZONE: runTask', fn, applyThis, applyArgs);
    return this.ngZone.run(fn, applyThis, applyArgs);
  }

  runGuarded<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T {
    console.log('ZONE: runGuarded', fn, applyThis, applyArgs);
    return this.ngZone.run(fn, applyThis, applyArgs);
  }

  runOutsideAngular<T>(fn: (...args: any[]) => T): T {
    console.log('ZONE: runOutsideAngular', fn);
    return this.ngZone.run(fn);
  }
}
