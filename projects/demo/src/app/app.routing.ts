import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { HelloComponent } from './hello.component';
import { Modal1Component } from './components/modal1.component';
import { OkCancelMessageComponent } from './components/ok-cancel-message.component';
import { YesNoMessageComponent } from './components/yes-no-message.component';
import { Edit1Component } from './components/edit1.component';
import { HomeComponent } from './components/home.component';
export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                component: HomeComponent,
                children: [
                    {
                        path: 'message',
                        pathMatch: 'full',
                        component: YesNoMessageComponent,
                        outlet: 'modal',
                        data: {
                            yesButtonText: 'Complete'
                        }
                    },
                    {
                        path: 'alert',
                        pathMatch: 'full',
                        component: OkCancelMessageComponent,
                        outlet: 'modal',
                    }    
                ]
            },
            {
                path: 'hello',
                component: HelloComponent,
                children: [
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
