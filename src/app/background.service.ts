import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  getColor(): string {
    const R = this.getRandom();
    const G = this.getRandom();
    const B = this.getRandom();
    return '#' + R.toString(16) + G.toString(16) + B.toString(16);
  }

  getRandom(): number {
    const factor = 2;
    let result = 0;
    for (let i = 0; i < factor; i++) {
      const rand = Math.random() * (255 / factor);
      result += Math.round(rand);
    }
    return result;
  }
}
