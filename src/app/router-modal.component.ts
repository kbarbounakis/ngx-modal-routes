import { Component, Input, ElementRef, ViewEncapsulation, EventEmitter } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';


export const ButtonTypes = {
    ok: {
      buttonText: 'OK',
      buttonClass: 'btn btn-indigo',
      buttonDisabled: false
    },
    cancel: {
      buttonText: 'Cancel',
      buttonClass: 'btn btn-gray-100',
      buttonDisabled: false
    },
    yes: {
      buttonText: 'Yes',
      buttonClass: 'btn btn-indigo',
      buttonDisabled: false
    },
    no: {
      buttonText: 'No',
      buttonClass: 'btn btn-gray-100',
      buttonDisabled: false
    },
    abort: {
      buttonText: 'Abort',
      buttonClass: 'btn btn-danger',
      buttonDisabled: false
    },
    retry: {
      buttonText: 'Retry',
      buttonClass: 'btn btn-primary',
      buttonDisabled: false
    },
    ignore: {
      buttonText: 'Ignore',
      buttonClass: 'btn btn-warning',
      buttonDisabled: false
    }
  };

export declare interface RouterModalOutletComponent {
  modalTitle: string;
  modalClass: string;
  statusChanges: EventEmitter<any>;
}

export abstract class RouterModalOkCancel {
  @Input() okButtonText = ButtonTypes.ok.buttonText;
  @Input() okButtonClass = ButtonTypes.ok.buttonClass;
  @Input() cancelButtonText = ButtonTypes.cancel.buttonText;
  @Input() cancelButtonClass = ButtonTypes.cancel.buttonClass;
  abstract ok(): Promise<any>;
  abstract cancel(): Promise<any>;
  public readonly statusChanges = new EventEmitter<any>();
}

// noinspection JSUnusedGlobalSymbols
export abstract class RouterModalYesNoCancel {
  @Input() yesButtonText = ButtonTypes.yes.buttonText;
  @Input() yesButtonClass = ButtonTypes.yes.buttonClass;
  @Input() noButtonText = ButtonTypes.no.buttonText;
  @Input() noButtonClass = ButtonTypes.ignore.buttonClass;
  @Input() cancelButtonText = ButtonTypes.cancel.buttonText;
  @Input() cancelButtonClass = ButtonTypes.cancel.buttonClass;
  abstract yes(): Promise<any>;
  abstract no(): Promise<any>;
  abstract cancel(): Promise<any>;
  public readonly statusChanges = new EventEmitter<any>();
}

export abstract class RouterModalYesNo {
  @Input() yesButtonText = ButtonTypes.yes.buttonText;
  @Input() yesButtonClass = ButtonTypes.yes.buttonClass;
  @Input() noButtonText = ButtonTypes.no.buttonText;
  @Input() noButtonClass = ButtonTypes.no.buttonClass;
  abstract yes(): Promise<any>;
  abstract no(): Promise<any>;
  public readonly statusChanges = new EventEmitter<any>();
}

export abstract class RouterModalAbortRetryIgnore {
  @Input() abortButtonText = ButtonTypes.abort.buttonText;
  @Input() abortButtonClass = ButtonTypes.abort.buttonClass;
  @Input() retryButtonText = ButtonTypes.retry.buttonText;
  @Input() retryButtonClass = ButtonTypes.retry.buttonClass;
  @Input() ignoreButtonText = ButtonTypes.ignore.buttonText;
  @Input() ignoreButtonClass = ButtonTypes.ignore.buttonClass;
  // noinspection JSUnusedGlobalSymbols
  abstract abort(): Promise<any>;
  abstract retry(): Promise<any>;
  abstract ignore(): Promise<any>;
  public readonly statusChanges = new EventEmitter<any>();
}

@Component({
  selector: 'router-modal',
  template: `
  <div class="bd-modal d-none">
    <div class="modal-backdrop fade d-none"></div>
    <div class="modal" tabindex="-1" role="dialog" [ngClass]="{ 'modal-waiting': waiting }">
    <div class="modal-dialog" [ngClass]="modalInstanceClass" role="document">
      <div class="modal-content">
        <div class="modal-header" *ngIf="modalInstanceTitle">
          <h5 class="modal-title">{{modalInstanceTitle}}</h5>
          <button *ngIf="instanceButtons.cancel" [disabled]="waiting || instanceButtons.cancel.buttonDisabled" (click)="cancel()" type="button" class="close" data-dismiss="modal" aria-label="Cancel">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <router-outlet (activate)="onActivate($event)" (deactivate)="onDeactivate($event)" name="modal"></router-outlet>  
        </div>
        <div class="modal-footer justify-content-end">
          <button *ngIf="instanceButtons.ok" [disabled]="waiting || instanceButtons.ok.buttonDisabled" (click)="ok()" type="button" [ngClass]="instanceButtons.ok.buttonClass">
            {{instanceButtons.ok.buttonText}}
          </button>
          <button *ngIf="instanceButtons.yes" [disabled]="waiting || instanceButtons.yes.buttonDisabled" (click)="yes()" type="button" [ngClass]="instanceButtons.yes.buttonClass">
            {{instanceButtons.yes.buttonText}}
          </button>
          <button *ngIf="instanceButtons.no" [disabled]="waiting || instanceButtons.no.buttonDisabled" (click)="no()" type="button" [ngClass]="instanceButtons.no.buttonClass">
            {{instanceButtons.no.buttonText}}
          </button>
          <button *ngIf="instanceButtons.cancel" [disabled]="waiting || instanceButtons.cancel.buttonDisabled" (click)="cancel()" type="button" [ngClass]="instanceButtons.cancel.buttonClass" data-dismiss="modal">
            {{instanceButtons.cancel.buttonText}}
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  `,
  styles: [`
    .bd-modal .modal {
        position: absolute;
        right: auto;
        bottom: auto;
        z-index: 10000;
        display: block;
        }
        .bd-modal .modal .modal-body {
                margin-top: 0rem;
                margin-bottom: 0rem;
          }
        .bd-modal .modal.modal-waiting {
            opacity: 0.6;
          }
  `],
  encapsulation: ViewEncapsulation.None
})
export class RouterModalComponent {

  private componentReference: any;
  private componentStatusChanges: Subscription;
  private waiting = false;
  @Input() modalTitle = '';
  @Input() modalClass: string;
  
  // this properties are here as inputs in order to have a way to customize text and class of each button

  @Input() okButtonText = ButtonTypes.ok.buttonText;
  @Input() okButtonClass = ButtonTypes.ok.buttonClass;
  
  @Input() cancelButtonText = ButtonTypes.cancel.buttonText;
  @Input() cancelButtonClass = ButtonTypes.cancel.buttonClass;

  @Input() yesButtonText = ButtonTypes.yes.buttonText ;
  @Input() yesButtonClass = ButtonTypes.yes.buttonClass;

  @Input() noButtonText = ButtonTypes.no.buttonText ;
  @Input() noButtonClass = ButtonTypes.no.buttonClass;

  @Input() abortButtonText = ButtonTypes.abort.buttonText;
  @Input() abortButtonClass = ButtonTypes.abort.buttonClass;

  @Input() retryButtonText = ButtonTypes.retry.buttonText;
  @Input() retryButtonClass = ButtonTypes.retry.buttonClass;

  @Input() ignoreButtonText = ButtonTypes.ignore.buttonText;
  @Input() ignoreButtonClass = ButtonTypes.ignore.buttonClass;

  protected modalInstanceTitle: string;
  protected modalInstanceClass: string;

  // default instance buttons

  protected instanceButtons = {
    ok: null,
    cancel: null,
    yes: null,
    no: null,
    abort: null,
    retry: null,
    ignore: null
  };
  
  constructor(private _element: ElementRef,
            private _activatedRoute: ActivatedRoute,
            private _router: Router) {

  }

  async cancel() {
    try {
      if (this.componentReference) {
        
        // set waiting
        this.waiting = true;
        // if component has cancel() method
        if (typeof this.componentReference.cancel === 'function') {
          // do cancel
          await this.componentReference.cancel();
        }
        else {
          await this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        }
        // unset waiting
        this.waiting = false;
      }
    }
    catch(err) {
      this.waiting = false;
    }
  }

  async ok() {
    try {
      if (this.componentReference) {
        // set waiting
        this.waiting = true;
        if (typeof this.componentReference.ok === 'function') {
          // do submit
          await this.componentReference.ok();
        }
        else {
          await this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        }
        // unset waiting
        this.waiting = false;
      }
    }
    catch(err) {
      this.waiting = false;
    }
  }

  async abort() {
    try {
      if (this.componentReference) {
        // set waiting
        this.waiting = true;
        if (typeof this.componentReference.abort === 'function') {
          // do submit
          await this.componentReference.abort();
        }
        else {
          await this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        }
        // unset waiting
        this.waiting = false;
      }
    }
    catch(err) {
      this.waiting = false;
    }
  }

  async retry() {
    try {
      if (this.componentReference) {
        // set waiting
        this.waiting = true;
        if (typeof this.componentReference.retry === 'function') {
          // do submit
          await this.componentReference.retry();
        }
        else {
          await this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        }
        // unset waiting
        this.waiting = false;
      }
    }
    catch(err) {
      this.waiting = false;
    }
  }

  async ignore() {
    try {
      if (this.componentReference) {
        // set waiting
        this.waiting = true;
        if (typeof this.componentReference.ignore === 'function') {
          // do submit
          await this.componentReference.ignore();
        }
        else {
          await this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        }
        // unset waiting
        this.waiting = false;
      }
    }
    catch(err) {
      this.waiting = false;
    }
  }

  async yes() {
    try {
      if (this.componentReference) {
        // set waiting
        this.waiting = true;
        if (typeof this.componentReference.yes === 'function') {
          // do submit
          await this.componentReference.yes();
        }
        else {
          await this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        }
        // unset waiting
        this.waiting = false;
      }
    }
    catch(err) {
      this.waiting = false;
    }
  }

  async no() {
    try {
      if (this.componentReference) {
        // set waiting
        this.waiting = true;
        if (typeof this.componentReference.no === 'function') {
          // do submit
          await this.componentReference.no();
        }
        else {
          await this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        }
        // unset waiting
        this.waiting = false;
      }
    }
    catch(err) {
      this.waiting = false;
    }
  }

  onActivate(event) {
    this.componentReference = event;
    // get router outlet component
    if (this.componentReference) {
      if (this.componentReference.statusChanges) {
          // get status changes
          this.componentStatusChanges = this.componentReference.statusChanges.subscribe( status => {
              // validate ok status
              if (this.instanceButtons.ok) {
                this.instanceButtons.ok.buttonDisabled = status.invalid;
              }
              // validate yes status
              if (this.instanceButtons.yes) {
                this.instanceButtons.yes.buttonDisabled = status.invalid;
              }

          });
      }
      const outletComponentReference = (<RouterModalOutletComponent> this.componentReference);
      // get title
      this.modalInstanceTitle = outletComponentReference.modalTitle;
      // get class
      this.modalInstanceClass = outletComponentReference.modalClass;
      // hold this to validate buttons
      let hasAtLeastOneButton = false;
      this.instanceButtons = { 
        ok: null,
        cancel: null,
        yes: null,
        no: null,
        abort: null,
        retry: null,
        ignore: null
      };
      // enumerate button types
      Object.keys(ButtonTypes).forEach( key => {
        // search if component has a method with the same name
        if (typeof this.componentReference[key] === 'function') {
          // enable button
          this.instanceButtons[key] = Object.assign({ }, ButtonTypes[key]);
          hasAtLeastOneButton = true;
          const buttonTextProperty = `${key}ButtonText`;
          if (this.componentReference.hasOwnProperty(buttonTextProperty)) {
            this.instanceButtons[key].buttonText = this.componentReference[buttonTextProperty];
          }
          else {
            // get property from this component
            this.instanceButtons[key].buttonText = this[buttonTextProperty];
          }
          const buttonClassProperty = `${key}ButtonClass`;
          if (this.componentReference.hasOwnProperty(buttonClassProperty)) {
            this.instanceButtons[key].buttonClass = this.componentReference[buttonClassProperty];
          }
          else {
            // get property from this component
            this.instanceButtons[key].buttonClass = this[buttonClassProperty];
          }
        }
      });
      if (!hasAtLeastOneButton) {
        // there are no buttons, so add only ok
        this.instanceButtons.ok = Object.assign({ }, ButtonTypes.ok);
      }
    }
    const backdropElement = <HTMLDivElement> this._element.nativeElement.querySelector('.modal-backdrop');
    this._element.nativeElement.querySelector('.bd-modal').classList.remove('d-none');
    if (backdropElement) {
      // remove d-none
      backdropElement.classList.remove('d-none');
      // add show
      backdropElement.classList.add('show');
    }
    return false;
  }

  // noinspection JSUnusedLocalSymbols
  onDeactivate(event) {
    if (this.componentStatusChanges) {
      this.componentStatusChanges.unsubscribe();
    }
    // restore properties
    this.modalInstanceTitle = this.modalTitle;
    this.modalInstanceClass = this.modalClass;

    this.componentReference = null;
    const backdropElement = <HTMLDivElement> this._element.nativeElement.querySelector('.modal-backdrop');
    this._element.nativeElement.querySelector('.bd-modal').classList.add('d-none');
    if (backdropElement) {
      // remove show
      backdropElement.classList.remove('show');
      // add d-none
      backdropElement.classList.add('d-none');
    }
    return false;
  }

}
