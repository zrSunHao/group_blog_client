import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyService } from 'src/@shared/services/notify.service';
import { TopicElet } from '../model';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-dialog-topic',
  templateUrl: './dialog-topic.component.html',
  styleUrls: ['./dialog-topic.component.scss']
})
export class DialogTopicComponent implements OnInit {

  form: FormGroup;
  update: boolean = false;
  origionName: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogTopicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TopicElet,
    private notifyServ: NotifyService,
    private hostServ: TopicService) {
    this.form = new FormGroup({
      name: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^[\u4E00-\u9FA5A-Za-z0-9_\.#]{2,32}$/)]),
    });
  }

  ngOnInit() {
    if (this.data.id) {
      this.update = true;
      this.origionName = this.data.name;
      this.form.controls['name'].setValue(this.data.name);
    }
  }

  onSaveClick(): void {
    this.data.name = this.form.controls['name'].value;
    if (this.update) this.onUpdate();
    else this.onAdd();
  }

  onCloseClick(): void {
    this.dialogRef.close({ op: 'close' });
  }

  private onAdd(): void {
    this.hostServ.addTopic(this.data).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`添加主题[${this.data.name}]成功！！！`, 'success');
          this.dialogRef.close({ op: 'save', data: res.data });
        } else {
          const msg = `添加主题[${this.data.name}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `添加主题[${this.data.name}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private onUpdate(): void {
    this.hostServ.updateTopic(this.data).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`更新主题[${this.origionName}]成功！！！`, 'success');
          this.dialogRef.close({ op: 'save', data: this.data });
        } else {
          const msg = `更新主题[${this.origionName}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `更新主题[${this.origionName}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

}
