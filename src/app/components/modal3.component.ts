import { Component, Input } from '@angular/core';
import { RouterModalYesNo } from '../router-modal.component';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'modal2',
  templateUrl: './modal2.component.html',
  styles: [`
  `]
})
export class Modal3Component extends RouterModalYesNo {
  //
  @Input('modalTitle') modalTitle = "Yes/No Message";

  public yesButtonText = "Yes, I agree";

  constructor(private _router: Router) {
    super();
  }

  async no() {
    return this._router.navigate(['/hello']); 
  }

  async yes() {
    return this._router.navigate(['/hello']); 
  }


}
