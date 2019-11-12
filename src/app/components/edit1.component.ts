import {Component, Input, ViewChild, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterModalOkCancel } from '../router-modal.component';
import {FormioComponent, FormioForm} from "angular-formio";

import EDIT_FORM from './edit1.json';

@Component({
  selector: 'app-edit1',
  template: `<formio [form]="formData" (change)="onChange($event)" [refresh]="refreshForm"  #form></formio>`,
  styles: [`
  `]
})
export class Edit1Component extends RouterModalOkCancel implements OnInit, OnDestroy {

  @Input('formData') formData: any;

  public modalTitle = "A modal window as route";

  @ViewChild('form', {
    static: true
  }) form: FormioComponent;

  @Output() refreshForm = new EventEmitter<any>();

  public readonly statusChanges = new EventEmitter<any>();

  constructor(private _router: Router) {
    super();
  }

  async ngOnInit() {
    const findButton = EDIT_FORM.components.find( component => {
      return component.type === "button" && component.label === "Submit";
    });
    if (findButton) {
      findButton.hidden = true;
    }
    // set form data
    this.formData = EDIT_FORM;
    this.modalTitle = EDIT_FORM.title;
    // do refresh
    this.refreshForm.emit(this.formData);
  }
  ngOnDestroy() {
    //
  }

  onChange(event) {
    this.statusChanges.emit({
      invalid: !event.isValid
    });
  }

  ok() {
    return this._router.navigate(['/hello']);
  }

  cancel() {
    return this._router.navigate(['/hello']);
  }

}
