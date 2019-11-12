import { Component, Input, ViewChild, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'modal1',
  templateUrl: './modal1.component.html',
  styles: [`
  `]
})
export class Modal1Component implements OnInit, OnDestroy {
  public parentRoute: any;
  public modalTitle  = 'A modal window as route';
  public modalClass = 'modal-xl';
  public okButtonText = 'Continue';
  public statusChangesSubscription: Subscription;
  public readonly statusChanges = new EventEmitter<any>();

  @ViewChild('form', {
    static: true
  }) form: NgForm;

  public model = {
    email: null,
    password: null,
    checkMeOut: true
  };
  //
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
      this.parentRoute = this._activatedRoute.parent;
  }

  ngOnInit() {
    this.statusChangesSubscription = this.form.statusChanges.subscribe( status => {
      this.statusChanges.emit({
        invalid: this.form.invalid
      });
    });
  }

  ngOnDestroy() {

    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }

  }



  cancel() {
    return this._router.navigate(['/hello']);
  }

  ok() {
    // do something
    return new Promise( resolve => {
      setTimeout(() => {
        return this._router.navigate(['/hello']).then(() => {
          return resolve();
        });
      }, 5000);
    });
  }

}
