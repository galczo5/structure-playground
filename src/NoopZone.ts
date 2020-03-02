import {EventEmitter, Inject, NgZone} from '@angular/core';

export class NoopZone extends NgZone {
  constructor(private logs: boolean = true) {
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
    this.log('run', fn, applyThis, applyArgs);
    return fn.apply(applyThis, applyArgs);
  }

  runTask<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[], name?: string): T {
    this.log('runTask', fn, applyThis, applyArgs);
    return fn.apply(applyThis, applyArgs);
  }

  runGuarded<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T {
    this.log('runGuarded', fn, applyThis, applyArgs);
    return fn.apply(applyThis, applyArgs);
  }

  runOutsideAngular<T>(fn: (...args: any[]) => T): T {
    this.log('runOutsideAngular', fn);
    return fn();
  }

  log(msg: string, ...args): void {
    if (!this.logs) {
      return;
    }

    console.log(
      '%cZONE: ' + msg,
      'padding: 2px 4px; border: 2px solid red; background: red; color: white; border-radius: 4px;',
      ...args
    );
  }
}
