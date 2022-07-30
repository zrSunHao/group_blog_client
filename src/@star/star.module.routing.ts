import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarComponent } from './star.component';

const routes: Routes = [
    {
        path: '', component: StarComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StarRoutingModule {
}