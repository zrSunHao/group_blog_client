import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnElet, ColumnOp } from 'src/@cmpts/column-item/column-item.component';
import { NoteElet, NoteOp } from 'src/@cmpts/note-item/note-item.component';
import { FileCategory } from 'src/@resource/model';
import { ConfirmDialogComponent } from 'src/@shared/cmpts/confirm-dialog/confirm-dialog.component';
import { OptionItem } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { DialogColumnComponent } from '../dialog-column/dialog-column.component';
import { DialogNoteSequenceComponent } from '../dialog-note-sequence/dialog-note-sequence.component';
import { DialogNoteToColumnComponent } from '../dialog-note-to-column/dialog-note-to-column.component';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';
import { SequnceM } from '../model';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  domainId: string = '';
  topicId: string = '';
  topicName: string = '';
  selectedColumn: ColumnElet | null = null;
  columns: ColumnElet[] = [];
  notes: NoteElet[] = [];

  @ViewChild("imageInput", { static: false })
  imageInput!: ElementRef;
  file: any;
  waitLogoColumn: ColumnElet | null = null;
  waitLogoNote: NoteElet | null = null;
  waitIsColumn = true;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private notifyServ: NotifyService,
    private dialog: MatDialog,
    public hostServ: TopicService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.topicId = params['topicId'];
      this.domainId = params['domainId'];
      this.topicName = params['topicName'];
      this.onResetClick();
    });
  }

  onAddColumnClick() {
    let column = new ColumnElet();
    column.topicId = this.topicId;
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

  onResetClick() {
    this.selectedColumn = null;
    this.notes = [];
    this.getColumnList();
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

  onFileChange(e: any): void {
    if (e?.target?.files?.length) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      let ownerId: string | null | undefined = '';
      let ownerName: string = '';
      if (this.waitIsColumn) {
        ownerId = this.waitLogoColumn?.id;
        ownerName = `专栏${this.waitLogoColumn?.name}的logo`;
      } else {
        ownerId = this.waitLogoNote?.contentId;
        ownerName = `笔记${this.waitLogoNote?.name}的封面`;
      }
      this.hostServ.logo(ownerId as string, FileCategory.column_logo, formData).subscribe(
        {
          next: res => {
            if (res.success) {
              if (this.waitIsColumn) this._logoColumn(res.data as string);
              else this._profileNote(res.data as string);
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
    if (this.waitIsColumn) {
      if (this.waitLogoColumn) this.imageInput.nativeElement.click();
    }
    if (!this.waitIsColumn) {
      if (this.waitLogoNote) this.imageInput.nativeElement.click();
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
      case NoteOp.logo:
        this.onNoteLogoClick(note);
        break;
      case NoteOp.update:
        this.onNoteUpdateClick(note);
        break;
      case NoteOp.delete:
        this.onNoteDeleteClick(note);
        break;
      case NoteOp.closed:
        this.onNoteClosedClick(note);
        break;
      case NoteOp.opened:
        this.onNoteOpenedClick(note);
        break;
      case NoteOp.to_column:
        this.onNoteToColumn(note);
        break;
    }
  }

  onSortNote(): void {
    const dialogRef = this.dialog.open(DialogNoteSequenceComponent,
      { width: '360px', data: this.notes, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (!result?.op || result?.op != 'save') {
        this.getMyNoteList();
      }
    });
  }

  private onNoteToColumn(n: NoteElet): void {
    let data = {
      domainId: this.domainId,
      topicId: this.topicId,
      columnId: this.selectedColumn?.id as string,
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

  private onNoteSeeClick(n: NoteElet): void {
    this.router.navigate([`topic/note/${n.contentId}/${n.name}`]);
  }

  private onNoteUpdateClick(n: NoteElet): void {
    const note = new NoteElet();
    note.id = n.id;
    note.contentId = n.contentId;
    note.name = n.name;
    note.profileName = n.profileName;
    note.columnId = n.columnId;
    note.intro = n.intro;
    note.keys = n.keys;
    note.order = n.order;
    const dialogRef = this.dialog.open(DialogNoteComponent,
      { width: '360px', data: note, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save') {
        const data: NoteElet = result?.data;
        n.name = data.name;
        n.keys = data.keys;
      }
    });
  }

  private onNoteDeleteClick(n: NoteElet): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '260px',
      data: `确定要删除[${n.name}]笔记吗？`,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'yes') this._deleteNote(n);
    });
  }

  private onNoteLogoClick(n: NoteElet): void {
    this.waitLogoNote = n;
    this.waitIsColumn = false;
    this.onFileClick();
  }

  private onNoteOpenedClick(n: NoteElet): void {
    this._openNote(n, true);
  }

  private onNoteClosedClick(n: NoteElet): void {
    this._openNote(n, false);
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
    this.getMyNoteList();
  }

  private onAddNoteClick(column: ColumnElet): void {
    let note = new NoteElet();
    note.columnId = column.id as string;
    const dialogRef = this.dialog.open(DialogNoteComponent,
      { width: '360px', data: note, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save' && result?.data) {
        const data: NoteElet = result?.data;
        if (this.notes && this.selectedColumn?.id == column.id) this.notes.splice(0, 0, data);
      }
    });
  }

  private onLogoColumnClick(c: ColumnElet): void {
    this.waitLogoColumn = c;
    this.waitIsColumn = true;
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
    this.hostServ.getColumnList(this.topicId).subscribe({
      next: res => {
        this.columns = res.data;
        if (this.columns.length > 0) {
          this.selectedColumn = this.columns[0];
          this.getMyNoteList();
        }
      },
      error: err => {
        const msg = `专栏数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private getMyNoteList(): void {
    this.notes = [];
    let columnId = '';
    if (this.selectedColumn?.id) columnId = this.selectedColumn.id;
    else {
      if (this.columns.length > 0 && this.columns[0]?.id) columnId = this.columns[0].id;
    }
    this.hostServ.getMyNoteList(columnId).subscribe({
      next: res => {
        this.notes = res.data;
      },
      error: err => {
        const msg = `笔记数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _profileNote(logo: string): void {
    this.hostServ.addNoteProfile(this.waitLogoNote?.contentId as string, logo).subscribe({
      next: res => {
        if (res.success) {
          if (this.waitLogoNote) this.waitLogoNote.profileName = logo;
          this.notifyServ.notify(`笔记封面[${this.waitLogoNote?.name}]信息上传成功！！！`, 'success');
        } else {
          const msg = `笔记封面[${this.waitLogoNote?.name}]信息上传失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `笔记封面[${this.waitLogoNote?.name}]信息上传失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _deleteNote(n: NoteElet): void {
    this.hostServ.deleteNote(n.contentId as string).subscribe({
      next: res => {
        if (res.success) {
          this.notes = this.notes.filter(x => x.id != n.id);
          this.notifyServ.notify(`删除笔记[${n.name}]成功！！！`, 'success');
        } else {
          const msg = `删除笔记[${n.name}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `删除笔记[${n.name}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _openNote(n: NoteElet, open: boolean): void {
    let title = '公开';
    if (!open) title = '取消公开';
    this.hostServ.openNote(n.contentId as string, open).subscribe({
      next: res => {
        if (res.success) {
          n.opened = open;
          this.notifyServ.notify(`笔记${title}[${n.name}]成功！！！`, 'success');
        } else {
          const msg = `笔记${title}[${n.name}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `笔记${title}[${n.name}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }
}
