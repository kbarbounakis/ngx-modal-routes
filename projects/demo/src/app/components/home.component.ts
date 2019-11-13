import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html'
})
export class HomeComponent  {
  @Input() name: string = "Home";
}
