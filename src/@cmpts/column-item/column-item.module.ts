import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnItemComponent } from './column-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[ColumnItemComponent],
  declarations: [ColumnItemComponent]
})
export class ColumnItemModule { }
