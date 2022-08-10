import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OptionItem } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { StarService } from '../star.service';

@Component({
  selector: 'app-dialog-note-to-column',
  templateUrl: './dialog-note-to-column.component.html',
  styleUrls: ['./dialog-note-to-column.component.scss']
})
export class DialogNoteToColumnComponent implements OnInit {

  form: FormGroup;
  update: boolean = false;
  origionName: string = '';
  noteId: string = '';
  columns: OptionItem[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogNoteToColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifyServ: NotifyService,
    private hostServ: StarService) {
    this.form = new FormGroup({
      columnId: new FormControl<string>('', [Validators.required,]),
    });
  }

  ngOnInit() {
    this.origionName = this.data.name;
    this.noteId = this.data.contentId;
    this.form.controls['columnId'].setValue(this.data.columnId);
    this._loadColumns();
    console.log(this.data);
  }

  onSaveClick(): void {
    this.data.columnId = this.form.controls['columnId'].value;
    this.hostServ.toNoteColumn(this.noteId, this.data.columnId).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`笔记[${this.data.name}]移动成功！！！`, 'success');
          this.dialogRef.close({ op: 'save', data: this.data });
        } else {
          const msg = `笔记[${this.data.name}]移动失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `笔记[${this.data.name}]移动失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  onCloseClick(): void {
    this.dialogRef.close({ op: 'close' });
  }

  private _loadColumns(): void {
    this.hostServ.getColumnItems().subscribe({
      next: res => {
        if (res.success) {
          this.columns = res.data as OptionItem[];
        } else {
          const msg = `专栏选项加载失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `专栏选项加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

}
