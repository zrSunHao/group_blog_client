import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group.module.routing';

@NgModule({
  imports: [
    CommonModule,

    GroupRoutingModule
  ],
  declarations: [GroupComponent]
})
export class GroupModule { }
