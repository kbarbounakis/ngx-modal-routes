import {Component, Input, ViewChild, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { RouterModalOkCancel } from '../../../../modals/src/public_api';
import {FormioComponent} from 'angular-formio';

import EDIT_FORM from './edit1.json';

@Component({
  selector: 'demo-edit1',
  template: `<formio [form]="formData" (change)="onChange($event)" [refresh]="refreshForm"  #form></formio>`,
  styles: [`
  `]
})
export class Edit1Component extends RouterModalOkCancel implements OnInit, OnDestroy {

  @Input('formData') formData: any;

  public modalTitle = 'A modal window as route';

  @ViewChild('form', {
    static: true
  }) form: FormioComponent;

  @Output() refreshForm = new EventEmitter<any>();

  public readonly statusChanges = new EventEmitter<any>();

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }

  async ngOnInit() {
    const findButton = EDIT_FORM.components.find( component => {
      return component.type === 'button' && component.label === 'Submit';
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

  onChange(event: any) {
    this.statusChanges.emit({
      invalid: !event.isValid
    });
  }

  ok() {
      // do something and close
    return this.close();
  }

  cancel() {
    return this.close();
  }

}
