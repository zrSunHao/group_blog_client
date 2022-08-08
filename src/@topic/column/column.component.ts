import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnElet, ColumnOp } from 'src/@cmpts/column-item/column-item.component';
import { NoteElet } from 'src/@cmpts/note-item/note-item.component';
import { FileCategory } from 'src/@resource/model';
import { ConfirmDialogComponent } from 'src/@shared/cmpts/confirm-dialog/confirm-dialog.component';
import { OptionItem } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { DialogColumnComponent } from '../dialog-column/dialog-column.component';
import { SequnceM } from '../model';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  topicId: string = '';
  topicName: string = '';
  selectedColumn: ColumnElet | null = null;
  columns: ColumnElet[] = [];
  notes: NoteElet[] = [];

  @ViewChild("imageInput", { static: false })
  imageInput!: ElementRef;
  file: any;
  waitLogoColumn: ColumnElet | null = null;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private notifyServ: NotifyService,
    private dialog: MatDialog,
    public hostServ: TopicService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.topicId = params['topicId'];
      this.topicName = params['topicName'];
      this.onResetClick();
    });
  }

  onAddColumnClick() {
    let topic = new ColumnElet();
    topic.topicId = this.topicId;
    const dialogRef = this.dialog.open(DialogColumnComponent,
      { width: '360px', data: topic, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save' && result?.data) {
        const data: ColumnElet = result?.data;
        if (this.columns) this.columns.splice(0, 0, data);
      }
    });
  }

  onResetClick() {
    this.selectedColumn = null;
    this.getColumnList();
    this.getMyNoteList();
  }

  onReFreshClick() {
    this.getColumnList();
    this.getMyNoteList();
  }

  onBackClick() {
    this.router.navigate(['topic/']);
  }

  onColumnOpClick(op: ColumnOp, column: ColumnElet): void {
    switch (op) {
      case ColumnOp.add_note:
        this.onAddNoteClick(column);
        break;
      case ColumnOp.logo:
        this.onLogoColumnClick(column);
        break;
      case ColumnOp.update:
        this.onUpdateColumnClick(column);
        break;
      case ColumnOp.delete:
        this.onDeleteColumnClick(column);
        break;
      case ColumnOp.selected:
        this.onColumnSelectedClick(column);
        break;
    }
  }

  onNoteClick(note: any) {
    this.router.navigate(['topic/note']);
  }

  onFileChange(e: any): void {
    if (e?.target?.files?.length) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      this.hostServ.logo(this.waitLogoColumn?.id as string, FileCategory.column_logo, formData).subscribe(
        {
          next: res => {
            if (res.success) {
              this._logoColumn(res.data as string);
            } else {
              const msg = `专栏${this.waitLogoColumn?.name}的logo上传失败！！！ ${res.allMessages}`;
              this.notifyServ.notify(msg, 'error');
            }
            this.file = null;
          },
          error: err => {
            const msg = `专栏${this.waitLogoColumn?.name}的logo上传失败！！！ ${err}`;
            this.notifyServ.notify(msg, 'error');
            this.file = null;
          }
        }
      )
    }
  }

  onFileClick(): void {
    if (this.waitLogoColumn) {
      this.imageInput.nativeElement.click();
    }
  }

  onColumnDrop(event: CdkDragDrop<ColumnElet[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columnSort();
  }

  private columnSort(): void {
    let items: OptionItem[] = [];
    this.columns.forEach((value, index) => {
      const item: OptionItem = { key: index, value: value.id as string };
      items.push(item);
    });
    let sequence = new SequnceM();
    sequence.dragObjectId = this.topicId;
    sequence.dropGroupId = this.topicId;
    sequence.dropTargets = items;
    this.hostServ.sortColumn(sequence).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`专栏排序成功！！！`, 'success');
        } else {
          const msg = `添加专栏排序失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `添加专栏排序失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private onColumnSelectedClick(column: ColumnElet): void {
    this.selectedColumn = column;
  }

  private onAddNoteClick(column: ColumnElet): void {

  }

  private onLogoColumnClick(c: ColumnElet): void {
    this.waitLogoColumn = c;
    this.onFileClick();
  }

  private onUpdateColumnClick(c: ColumnElet): void {
    const column = new ColumnElet();
    column.id = c.id;
    column.name = c.name;
    column.logo = c.logo;
    column.topicId = c.topicId;
    column.intro = c.intro;
    column.order = c.order;
    const dialogRef = this.dialog.open(DialogColumnComponent,
      { width: '360px', data: column, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save') {
        const data: ColumnElet = result?.data;
        c.name = data.name;
        c.intro = data.intro;
      }
    });
  }

  private onDeleteColumnClick(c: ColumnElet): void {
    console.log(c)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '260px',
      data: `确定要删除[${c.name}]专栏吗？`,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'yes') this._deleteColumn(c);
    });
  }

  private _deleteColumn(c: ColumnElet): void {
    this.hostServ.deleteColumnc(c.id as string).subscribe({
      next: res => {
        if (res.success) {
          this.columns = this.columns.filter(x => x.id != c.id);
          this.notifyServ.notify(`删除专栏[${c.name}]成功！！！`, 'success');
        } else {
          const msg = `删除专栏[${c.name}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `删除专栏[${c.name}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _logoColumn(logo: string): void {
    this.hostServ.addColumnLogo(this.waitLogoColumn?.id as string, logo).subscribe({
      next: res => {
        if (res.success) {
          if (this.waitLogoColumn) this.waitLogoColumn.logo = logo;
          this.notifyServ.notify(`专栏logo[${this.waitLogoColumn?.name}]信息上传成功！！！`, 'success');
        } else {
          const msg = `专栏logo[${this.waitLogoColumn?.name}]信息上传失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `专栏logo[${this.waitLogoColumn?.name}]信息上传失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private getColumnList(): void {
    this.columns = [];
    this.hostServ.getColumnList(this.topicId).subscribe({
      next: res => {
        this.columns = res.data;
      },
      error: err => {
        const msg = `专栏数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private getMyNoteList(): void {
    this.columns = [];
    let columnId = '';
    if (this.selectedColumn?.id) columnId = this.selectedColumn.id;
    this.hostServ.getMyNoteList(columnId).subscribe({
      next: res => {
        this.notes = res.data;
      },
      error: err => {
        const msg = `文章数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

}
