import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FormioModule } from 'angular-formio';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Modal1Component } from './components/modal1.component';
import { Modal2Component } from './components/modal2.component';
import { Modal3Component } from './components/modal3.component';
import { Edit1Component } from './components/edit1.component';
import { AppRoutingModule } from './app.routing';
import { RouterModalComponent } from './router-modal.component';

import { AppLayoutComponent } from './app-layout.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    FormioModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent,
    RouterModalComponent,
    HelloComponent, 
    AppLayoutComponent,
    Modal1Component,
    Modal2Component,
    Modal3Component,
    Edit1Component
    ],
  bootstrap:    [ AppComponent ],
  providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
  ]
})
export class AppModule { }
