import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `
  <h1>Hello {{name}}!</h1>
  <div class="container">
    <div class="col-lg-12 row">
      <a class="btn btn-primary" href="#" [routerLink]="[{ outlets: { modal: ['alert'] } }]">Show modal as route</a>
      <a class="ml-2 btn btn-primary" href="#" [routerLink]="[{ outlets: { modal: ['/users', 100, 'edit'] } }]">Show a modal with form</a>
    </div>
    <div class="mt-3 col-lg-12 row">
      <a class="btn btn-primary" href="#" [routerLink]="[{ outlets: { modal: ['message'] } }]">A yes-no message</a>
    </div>
    <div class="mt-3 col-lg-12 row">
      <a class="btn btn-primary" href="#" [routerLink]="[{ outlets: { modal: ['users', 100, 'form', 'edit'] } }]">Show a modal with a formio form</a>
    </div>
  </div>
  <router-modal></router-modal>
  `,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string = "Angular";
}
