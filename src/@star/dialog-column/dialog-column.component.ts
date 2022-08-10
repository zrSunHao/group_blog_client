import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnElet } from 'src/@cmpts/column-item/column-item.component';
import { NotifyService } from 'src/@shared/services/notify.service';
import { StarService } from '../star.service';

@Component({
  selector: 'app-dialog-column',
  templateUrl: './dialog-column.component.html',
  styleUrls: ['./dialog-column.component.scss']
})
export class DialogColumnComponent implements OnInit {

  form: FormGroup;
  update: boolean = false;
  origionName: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColumnElet,
    private notifyServ: NotifyService,
    private hostServ: StarService) {
    this.form = new FormGroup({
      name: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^[\u4E00-\u9FA5A-Za-z0-9_-·]{2,32}$/)]),
      intro: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(256)]),
    });
  }

  ngOnInit() {
    if (this.data.id) {
      this.update = true;
      this.origionName = this.data.name;
      this.form.controls['name'].setValue(this.data.name);
      this.form.controls['intro'].setValue(this.data.intro);
    }
  }

  onSaveClick(): void {
    this.data.name = this.form.controls['name'].value;
    this.data.intro = this.form.controls['intro'].value;
    if (this.update) this.onUpdate();
    else this.onAdd();
  }

  onCloseClick(): void {
    this.dialogRef.close({ op: 'close' });
  }

  private onAdd(): void {
    this.hostServ.addColumn(this.data).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`添加专栏[${this.data.name}]成功！！！`, 'success');
          this.dialogRef.close({ op: 'save', data: res.data });
        } else {
          const msg = `添加专栏[${this.data.name}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `添加专栏[${this.data.name}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private onUpdate(): void {
    this.hostServ.updateColumn(this.data).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`更新专栏[${this.origionName}]成功！！！`, 'success');
          this.dialogRef.close({ op: 'save', data: this.data });
        } else {
          const msg = `更新专栏[${this.origionName}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `更新专栏[${this.origionName}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

}
