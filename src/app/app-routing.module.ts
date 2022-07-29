import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/@layout/layout.component';

const routes: Routes = [
  { path: 'notfound', loadChildren: () => import('../@notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: 'security', loadChildren: () => import('../@security/security.module').then(m => m.SecurityModule) },
  {
    path: '', component: LayoutComponent,children:
      [
        { path: 'blog', loadChildren: () => import('../@blog/blog.module').then(m => m.BlogModule) },
        { path: '**', redirectTo: '/blog' },
      ]
  },
  { path: '**', redirectTo: '/notfound/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
