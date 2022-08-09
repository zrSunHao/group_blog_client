import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';

const routes: Routes = [
    {
        path: ':type/:id/:name', component: ReportComponent,
    },
    {
        path: '**', redirectTo:'/notfound',
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule {
}