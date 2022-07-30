import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report.module.routing';

@NgModule({
  imports: [
    CommonModule,

    ReportRoutingModule
  ],
  declarations: [ReportComponent]
})
export class ReportModule { }
