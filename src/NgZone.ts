import {EventEmitter, Inject, NgZone} from '@angular/core';

function noop() {}

export class NgZoneWithLogs extends NgZone {

  constructor(private logs: boolean = true) {
    super({
      enableLongStackTrace: false,
      shouldCoalesceEventChangeDetection: false
    });
  }

  readonly hasPendingMacrotasks: boolean;
  readonly hasPendingMicrotasks: boolean;
  readonly isStable: boolean;
  readonly onUnstable: EventEmitter<any> = new EventEmitter<any>();
  readonly onMicrotaskEmpty: EventEmitter<any> = new EventEmitter<any>();
  readonly onStable: EventEmitter<any> = new EventEmitter<any>();
  readonly onError: EventEmitter<any> = new EventEmitter<any>();

  run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T {
    this.log('run', fn, applyThis, applyArgs);
    return (this as any)._inner.run(fn, applyThis, applyArgs);
  }

  runTask<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[], name?: string): T {
    this.log('runTask', fn, applyThis, applyArgs);
    const zone = (this as any)._inner;
    const task = zone.scheduleEventTask('NgZoneEvent: ' + name, fn, {}, noop, noop);
    try {
      return zone.runTask(task, applyThis, applyArgs) as T;
    } finally {
      zone.cancelTask(task);
    }
  }

  runGuarded<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T {
    this.log('runGuarded', fn, applyThis, applyArgs);
    return (this as any)._inner.run(fn, applyThis, applyArgs);
  }

  runOutsideAngular<T>(fn: (...args: any[]) => T): T {
    this.log('runOutsideAngular', fn);
    return (this as any)._outer.run(fn);
  }

  log(msg: string, ...args): void {
    if (!this.logs) {
      return;
    }

    console.log(
      '%cZONE: ' + msg,
      'padding: 2px 4px; border: 2px solid blue; background: blue; color: white; border-radius: 4px;',
      ...args
    );
  }
}
