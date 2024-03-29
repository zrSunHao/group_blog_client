import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/@shared/shared.module';
import { EditorModule } from 'src/@cmpts/editor/editor.module';

import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report.module.routing';
import { HeadlineComponent } from './cmpts/headline/headline.component';
import { ReportService } from './report.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EditorModule,
    ReportRoutingModule
  ],
  declarations: [ReportComponent, HeadlineComponent],
  providers: [ReportService]
})
export class ReportModule { }
