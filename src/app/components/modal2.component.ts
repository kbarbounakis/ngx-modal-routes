import { Component, Input } from '@angular/core';
import { RouterModalOkCancel } from '../../../projects/modals/src/public_api';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'modal2',
  templateUrl: './modal2.component.html',
  styles: [`
  `]
})
export class Modal2Component extends RouterModalOkCancel {

  public okButtonText = 'Proceed';
  public okButtonClass = 'btn btn-indigo';

  public cancelButtonText = 'Dismiss';
  public cancelButtonClass = 'btn btn-gray-100';

  constructor(private _router: Router) {
    super();
  }


  async ok() {
    return this._router.navigate(['/hello']);
  }

  async cancel() {
    return this._router.navigate(['/hello']);
  }


}
