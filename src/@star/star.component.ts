import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnElet, ColumnOp } from 'src/@cmpts/column-item/column-item.component';
import { NoteElet, NoteOp, NoteType } from 'src/@cmpts/note-item/note-item.component';
import { FileCategory } from 'src/@resource/model';
import { ConfirmDialogComponent } from 'src/@shared/cmpts/confirm-dialog/confirm-dialog.component';
import { OptionItem } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { SequnceM } from 'src/@topic/model';
import { DialogColumnComponent } from './dialog-column/dialog-column.component';
import { DialogNoteSequenceComponent } from './dialog-note-sequence/dialog-note-sequence.component';
import { DialogNoteToColumnComponent } from './dialog-note-to-column/dialog-note-to-column.component';
import { StarService } from './star.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {

  selectedColumn: ColumnElet | null = null;
  columns: ColumnElet[] = [];
  notes: NoteElet[] = [];
  noteType = NoteType;

  @ViewChild("imageInput", { static: false })
  imageInput!: ElementRef;
  file: any;
  waitLogoColumn: ColumnElet | null = null;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private notifyServ: NotifyService,
    private dialog: MatDialog,
    public hostServ: StarService) {
  }

  ngOnInit() {
    this.onResetClick();
  }

  onResetClick() {
    this.selectedColumn = null;
    this.notes = [];
    this.getColumnList();
  }

  onFileChange(e: any): void {
    if (e?.target?.files?.length) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      let ownerId = this.waitLogoColumn?.id;
      let ownerName = `专栏${this.waitLogoColumn?.name}的logo`;
      this.hostServ.logo(ownerId as string, FileCategory.favorite_column_logo, formData).subscribe(
        {
          next: res => {
            if (res.success) {
              this._logoColumn(res.data as string);
            } else {
              const msg = `${ownerName}上传失败！！！ ${res.allMessages}`;
              this.notifyServ.notify(msg, 'error');
            }
            this.file = null;
          },
          error: err => {
            const msg = `${ownerName}上传失败！！！ ${err}`;
            this.notifyServ.notify(msg, 'error');
            this.file = null;
          }
        }
      )
    }
  }

  onFileClick(): void {
    this.imageInput.nativeElement.click();
  }

  onAddColumnClick() {
    let column = new ColumnElet();
    column.topicId = 'myf';
    const dialogRef = this.dialog.open(DialogColumnComponent,
      { width: '360px', data: column, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save' && result?.data) {
        const data: ColumnElet = result?.data;
        if (this.columns) this.columns.splice(0, 0, data);
      }
    });
  }

  onColumnOpClick(op: ColumnOp, column: ColumnElet): void {
    switch (op) {
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

  onColumnDrop(event: CdkDragDrop<ColumnElet[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columnSort();
  }

  onNoteOpClick(op: NoteOp, note: NoteElet): void {
    switch (op) {
      case NoteOp.see:
        this.onNoteSeeClick(note);
        break;
      case NoteOp.to_column:
        this.onNoteToColumnClick(note);
        break;
      case NoteOp.delete:
        this.onNoteDeleteClick(note);
        break;
    }
  }

  onSortNote(): void {
    const dialogRef = this.dialog.open(DialogNoteSequenceComponent,
      { width: '360px', data: this.notes, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (!result?.op || result?.op != 'save') {
        this.getNoteList();
      }
    });
  }

  private onNoteSeeClick(n: NoteElet): void {
    this.router.navigate(['read']);
  }

  private onNoteToColumnClick(n: NoteElet) {
    let data = {
      columnId: n.columnId,
      name: n.name,
      contentId: n.contentId as string
    }
    const dialogRef = this.dialog.open(DialogNoteToColumnComponent,
      { width: '360px', data: data, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save' && result?.data) {
        const res: any = result?.data;
        n.columnId = res.columnId;
        this.notes = this.notes.filter(x => x.columnId == this.selectedColumn?.id);
      }
    });
  }

  private onNoteDeleteClick(n: NoteElet): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '260px',
      data: `确定要取消收藏[${n.name}]笔记吗？`,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'yes') this._cancelNote(n);
    });
  }

  private columnSort(): void {
    let items: OptionItem[] = [];
    this.columns.forEach((value, index) => {
      const item: OptionItem = { key: index, value: value.id as string };
      items.push(item);
    });
    let sequence = new SequnceM();
    sequence.dragObjectId = 'myf';
    sequence.dropGroupId = 'myf';
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
    this.getNoteList();
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '260px',
      data: `确定要删除[${c.name}]专栏吗？`,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'yes') this._deleteColumn(c);
    });
  }

  private _deleteColumn(c: ColumnElet): void {
    this.hostServ.deleteColumn(c.id as string).subscribe({
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
    this.hostServ.getColumnList().subscribe({
      next: res => {
        this.columns = res.data;
        if (this.columns.length > 0) {
          this.selectedColumn = this.columns[0];
          this.getNoteList();
        }
      },
      error: err => {
        const msg = `专栏数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private getNoteList(): void {
    this.notes = [];
    let columnId = '';
    if (this.selectedColumn?.id) columnId = this.selectedColumn.id;
    else {
      if (this.columns.length > 0 && this.columns[0]?.id) columnId = this.columns[0].id;
    }
    this.hostServ.getNoteList(columnId).subscribe({
      next: res => {
        this.notes = res.data;
      },
      error: err => {
        const msg = `笔记数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _cancelNote(n: NoteElet): void {
    this.hostServ.cancelNote(n.contentId as string).subscribe({
      next: res => {
        if (res.success) {
          this.notes = this.notes.filter(x => x.id != n.id);
          this.notifyServ.notify(`取消收藏笔记[${n.name}]成功！！！`, 'success');
        } else {
          const msg = `取消收藏笔记[${n.name}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `取消收藏笔记[${n.name}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }
}
