import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/@shared/shared.module';
import { PaginatorModule } from 'src/@cmpts/paginator/paginator.module';

import { ResourceComponent } from './resource.component';
import { ResourceRoutingModule } from './resource.module.routing';

@NgModule({
  imports: [
    CommonModule,

    PaginatorModule,
    SharedModule,
    ResourceRoutingModule
  ],
  declarations: [ResourceComponent]
})
export class ResourceModule { }
