import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { StarRoutingModule } from './star.module.routing';

@NgModule({
  imports: [
    CommonModule,

    StarRoutingModule
  ],
  declarations: [StarComponent]
})
export class StarModule { }
