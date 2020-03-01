import { Component } from '@angular/core';
import {DATA, StructureElement} from '../data';

@Component({
  selector: 'app-root',
  template: `
    <app-structure [element]="structure"></app-structure>
  `
})
export class AppComponent {

  structure: StructureElement = DATA;

}
