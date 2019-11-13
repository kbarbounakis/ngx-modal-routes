import { Component, Input } from '@angular/core';
import { RouterModalOkCancel } from '../../../../modals/src/public_api';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'demo-ok-cancel-message',
  template: `
  <p>
    Had denoting properly jointure you occasion directly raillery. In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son.
  </p>
  `,
  styles: [`
  `]
})
export class OkCancelMessageComponent extends RouterModalOkCancel {

  // custom properties
  
  @Input() okButtonText = 'Proceed';
  @Input() modalTitle = 'Alter Message';
  
  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }

  async ok() {
    return this.close();
  }

  async cancel() {
    return this.close();
  }


}
