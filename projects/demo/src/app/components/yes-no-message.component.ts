import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RouterModalYesNo } from '../../../../modals/src/public_api';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'demo-yes-no',
  template: `
  <p>
    Are you sure to complete this action?
  </p>
  `,
  styles: [`
  `]
})
export class YesNoMessageComponent extends RouterModalYesNo implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private subscription: Subscription;

    ngOnInit(): void {
        this.subscription = this.activatedRoute.data.subscribe( data => {
            this.yesButtonText = data.yesButtonText;
        });
        setTimeout(()=> {
            this.yesButtonDisabled = true;
        }, 5000);
    }
  //
  @Input() modalTitle = 'A Yes/No Message';

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }

  async no() {
      // close
    return this.close();
  }

  async yes() {
      // do something and close
    return this.close();
  }

}
