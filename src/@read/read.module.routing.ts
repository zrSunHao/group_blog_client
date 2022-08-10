import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadComponent } from './read.component';

const routes: Routes = [
    {
        path: ':id/:name', component: ReadComponent,
    },
    {
        path: '**', redirectTo: '/notfound',
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReadRoutingModule {
}