import {EventEmitter, NgZone} from '@angular/core';

export class NoopZone extends NgZone {
  constructor() {
    super({
      enableLongStackTrace: false,
      shouldCoalesceEventChangeDetection: false
    });
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
    return fn.apply(applyThis, applyArgs);
  }

  runTask<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[], name?: string): T {
    console.log('ZONE: runTask', fn, applyThis, applyArgs);
    return fn.apply(applyThis, applyArgs);
  }

  runGuarded<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T {
    console.log('ZONE: runGuarded', fn, applyThis, applyArgs);
    return fn.apply(applyThis, applyArgs);
  }

  runOutsideAngular<T>(fn: (...args: any[]) => T): T {
    console.log('ZONE: runOutsideAngular', fn);
    return fn();
  }
}
