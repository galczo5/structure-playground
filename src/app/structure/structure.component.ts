import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit, ApplicationRef,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  DoCheck, ElementRef, Inject,
  Input, NgZone,
  OnChanges,
  OnInit, Renderer2,
  SimpleChanges, ViewChild, ViewRef
} from '@angular/core';
import {StructureElement} from '../../data';
import {ViewportScroller} from '@angular/common';
import {BackgroundService} from '../background.service';
import {COMPONENT_LOGS} from '../../main';

@Component({
  selector: 'app-structure',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="element" [style.background]="color">
      <div class="name"
           [class.marked]="marked">
        <button>{{ element.name }}</button>
        <hr style="border: 1px dashed black; margin-bottom: 15px;">
        <button (click)="click()">Click</button>
        <button (click)="timeout()">Timeout</button>
        <button (click)="tick()">Tick</button>
        <button (click)="detectChanges()">Detect changes</button>
        <button (click)="ngZoneRun()">ngZoneRun</button>
      </div>
      <div class="children">
        <app-structure *ngFor="let child of getChildren()" [element]="child"></app-structure>
      </div>
    </div>
  `,
  styleUrls: ['./structure.component.css']
})
// tslint:disable-next-line:max-line-length
export class StructureComponent implements OnChanges, OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, DoCheck {

  @Input()
  element: StructureElement;

  color: string;

  marked = false;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly applicationRef: ApplicationRef,
              private readonly backgroundService: BackgroundService,
              private readonly ngZone: NgZone,
              @Inject(COMPONENT_LOGS) private readonly logs: boolean) {
    this.color = this.backgroundService.getColor();
  }

  ngOnChanges(changes: SimpleChanges): void { this.log('ngOnChanges'); }
  ngOnInit(): void { this.log('ngOnInit'); }
  ngAfterContentInit(): void { this.log('ngAfterContentInit'); }
  ngAfterContentChecked(): void { this.log('ngAfterContentChecked'); }
  ngAfterViewInit(): void { this.log('ngAfterViewInit'); }
  ngAfterViewChecked(): void { this.log('ngAfterViewChecked'); }
  ngDoCheck(): void { this.log('ngDoCheck'); }

  click(): void {
    this.log('click');
    this.marked = !this.marked;
  }

  timeout(): void {
    setTimeout(() => {
      this.log('timeout');
      this.marked = !this.marked;
    });
  }

  tick(): void {
    this.log('tick');
    this.applicationRef.tick();
  }

  detectChanges(): void {
    this.log('detectChanges');
    this.changeDetectorRef.detectChanges();
  }

  ngZoneRun(): void {
    this.log('ngZoneRun');
    this.ngZone.run(() => {});
  }

  log(log: string): void {
    if (!this.logs) {
      return;
    }

    console.log(
      '%c' + this.element.name + ': ' + log,
      'padding: 2px 4px; border: 2px solid' + this.color + '; background: #F5F5F5; border-radius: 4px;'
    );
  }

  getChildren(): Array<StructureElement> {
    return this.element.children || [];
  }

}
