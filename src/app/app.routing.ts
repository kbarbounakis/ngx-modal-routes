import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { HelloComponent } from './hello.component';
import { Modal1Component } from './components/modal1.component';
import { Modal2Component } from './components/modal2.component';
import { Modal3Component } from './components/modal3.component';
import { Edit1Component } from './components/edit1.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'hello',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'hello',
        component: HelloComponent,
        children: [
          {
            path: 'alert',
            pathMatch: 'full',
            component: Modal2Component,
            outlet: 'modal',
          },
          {
            path: 'message',
            pathMatch: 'full',
            component: Modal3Component,
            outlet: 'modal',
          },
          {
              path: ':model/:id/form/edit',
              pathMatch: 'full',
              component: Edit1Component,
              outlet: 'modal'
            },
          {
              path: ':model/:id/edit',
              pathMatch: 'full',
              component: Modal1Component,
              outlet: 'modal'
            }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
        paramsInheritanceStrategy: 'always'
      })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
