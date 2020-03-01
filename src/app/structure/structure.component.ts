import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  DoCheck, ElementRef,
  Input,
  OnChanges,
  OnInit, Renderer2,
  SimpleChanges, ViewChild
} from '@angular/core';
import {StructureElement} from '../../data';

@Component({
  selector: 'app-structure',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="element"
         [style.background]="color">
      <div class="name">
        <button>{{ element.name }}</button>
        <button (click)="click()">Click</button>
        <button (click)="timeout()">Timeout</button>
      </div>
      <div class="children">
        <app-structure *ngFor="let child of getChildren()" [element]="child"></app-structure>
      </div>
    </div>
  `,
  styles: [`
    :host {
      flex-grow: 1;
    }

    .element {
      width: 100%;
      height: 100%;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      border: 2px solid black;
      padding: 10px;
    }

    .name {
      text-align: center;
      width: 100%;
      margin-bottom: 10px;
    }

    .name button {
      display: inline-block;
      padding: 5px 10px;
      background: white;
      border-radius: 4px;
      border: 2px solid black;
      color: black;
    }

    .name button + button {
      margin-left: 10px;
    }

    .children {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
    }

    .children app-structure + app-structure {
      margin-left: 10px;
    }
  `]
})
export class StructureComponent implements OnChanges, OnInit, AfterContentInit, AfterViewInit, DoCheck {

  @ViewChild('name', { read: ElementRef, static: true })
  nameElement: ElementRef;

  @Input()
  element: StructureElement;

  color: string;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.log('ngOnInit');
  }

  ngAfterContentInit(): void {
    this.log('ngAfterContentInit');
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit');
  }

  ngDoCheck(): void {
    this.log('ngDoCheck');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.element.firstChange) {
      this.color = this.getColor();
    }

    this.log('ngOnChanges');
  }

  click(): void {
    this.log('click');
    // this.changeDetectorRef.detectChanges();
  }

  timeout(): void {
    setTimeout(() => {
      this.log('timeout');
      // this.changeDetectorRef.detectChanges();
    });
  }

  getColor(): string {
    if (this.element.color && this.element.color !== 'random') {
      return this.element.color;
    }

    const R = Math.round(Math.random() * 255);
    const G = Math.round(Math.random() * 255);
    const B = Math.round(Math.random() * 255);

    return '#' + R.toString(16) + G.toString(16) + B.toString(16);
  }

  log(log: string): void {
    console.log(
      '%c' + this.element.name + ': ' + log,
      'padding: 2px 4px; border: 2px solid ' + this.color
    );
  }

  getChildren(): Array<StructureElement> {
    return this.element.children || [];
  }

}
