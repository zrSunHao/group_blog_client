import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/@layout/layout.component';

const routes: Routes = [
  { path: 'notfound', loadChildren: () => import('../@notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: 'security', loadChildren: () => import('../@security/security.module').then(m => m.SecurityModule) },
  { path: 'report', loadChildren: () => import('../@report/report.module').then(m => m.ReportModule) },
  {
    path: '', component: LayoutComponent, children:
      [
        { path: 'blog', loadChildren: () => import('../@blog/blog.module').then(m => m.BlogModule) },
        { path: 'topic', loadChildren: () => import('../@topic/topic.module').then(m => m.TopicModule) },
        { path: 'star', loadChildren: () => import('../@star/star.module').then(m => m.StarModule) },
        { path: 'resource', loadChildren: () => import('../@resource/resource.module').then(m => m.ResourceModule) },
        { path: 'group', loadChildren: () => import('../@group/group.module').then(m => m.GroupModule) },
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
