import { Component } from '@angular/core';
import {DATA, StructureElement} from '../data';

@Component({
  selector: 'app-root',
  template: `
    <div style="padding: 10px;">
      <app-structure [element]="structure"
                     [style.height.%]="100"
                     [style.flexGrow]="1"
                     [style.display]="'flex'"></app-structure>
    </div>
  `
})
export class AppComponent {

  structure: StructureElement = DATA;

}
