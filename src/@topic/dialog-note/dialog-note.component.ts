import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteElet } from 'src/@cmpts/note-item/note-item.component';
import { NotifyService } from 'src/@shared/services/notify.service';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-dialog-note',
  templateUrl: './dialog-note.component.html',
  styleUrls: ['./dialog-note.component.scss']
})
export class DialogNoteComponent implements OnInit {

  form: FormGroup;
  update: boolean = false;
  origionName: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteElet,
    private notifyServ: NotifyService,
    private hostServ: TopicService) {
    this.form = new FormGroup({
      name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(32)]),
      keys: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(32)]),
    });
  }

  ngOnInit() {
    if (this.data.id) {
      this.update = true;
      this.origionName = this.data.name;
      this.form.controls['name'].setValue(this.data.name);
      this.form.controls['keys'].setValue(this.data.keys);
    }
  }

  onSaveClick(): void {
    this.data.name = this.form.controls['name'].value;
    this.data.keys = this.form.controls['keys'].value;
    if (this.update) this.onUpdate();
    else this.onAdd();
  }

  onCloseClick(): void {
    this.dialogRef.close({ op: 'close' });
  }

  private onAdd(): void {
    this.hostServ.addNote(this.data).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`添加笔记[${this.data.name}]成功！！！`, 'success');
          this.dialogRef.close({ op: 'save', data: res.data });
        } else {
          const msg = `添加笔记[${this.data.name}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `添加笔记[${this.data.name}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private onUpdate(): void {
    this.hostServ.updateNote(this.data).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`更新笔记[${this.origionName}]成功！！！`, 'success');
          this.dialogRef.close({ op: 'save', data: this.data });
        } else {
          const msg = `更新笔记[${this.origionName}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `更新笔记[${this.origionName}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }
}
