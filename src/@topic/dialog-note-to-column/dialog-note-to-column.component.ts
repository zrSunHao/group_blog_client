import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OptionItem } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { TopicService } from '../topic.service';

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
  domains: OptionItem[] = [];
  topics: OptionItem[] = [];
  columns: OptionItem[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogNoteToColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifyServ: NotifyService,
    private hostServ: TopicService) {
    this.form = new FormGroup({
      domainId: new FormControl<string>('', [Validators.required,]),
      topicId: new FormControl<string>('', [Validators.required,]),
      columnId: new FormControl<string>('', [Validators.required,]),
    });
  }

  ngOnInit() {
    this.origionName = this.data.name;
    this.noteId = this.data.contentId;
    this.form.controls['domainId'].setValue(this.data.domainId);
    this.form.controls['topicId'].setValue(this.data.topicId);
    this.form.controls['columnId'].setValue(this.data.columnId);
    this._loadDomains();
    if (this.data.domainId) this._loadTopics(this.data.domainId);
    if (this.data.topicId) this._loadColumns(this.data.topicId);
  }

  onDomainChange($event: any): void {
    if ($event) this._loadTopics($event);
  }

  onTopicChange($event: any): void {
    if ($event) this._loadColumns($event);
  }

  onSaveClick(): void {
    this.data.domainId = this.form.controls['domainId'].value;
    this.data.topicId = this.form.controls['topicId'].value;
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

  private _loadDomains(): void {
    this.hostServ.getDomainItems().subscribe({
      next: res => {
        if (res.success) {
          this.domains = res.data as OptionItem[];
        } else {
          const msg = `领域选项信息加载失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `领域选项信息加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _loadTopics(domainId: string): void {
    this.hostServ.getTopicItems(domainId).subscribe({
      next: res => {
        if (res.success) {
          this.topics = res.data as OptionItem[];
        } else {
          const msg = `主题选项信息加载失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `主题选项信息加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _loadColumns(topicId: string): void {
    this.hostServ.getColumnItems(topicId).subscribe({
      next: res => {
        if (res.success) {
          this.columns = res.data as OptionItem[];
        } else {
          const msg = `专栏选项信息加载失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `专栏选项信息加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

}
