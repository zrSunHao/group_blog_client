import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NoteElet, NoteOp, NoteType } from 'src/@cmpts/note-item/note-item.component';
import { Paginator, PaginatorColumn } from 'src/@cmpts/paginator/paginator.component';
import { PagingParameter, ResponsePagingResult } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { BlogService } from './blog.service';
import { DialogNoteToColumnComponent } from './dialog-note-to-column/dialog-note-to-column.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  params = new PagingParameter<string>();
  filter: string | null = '';
  noteType = NoteType;

  pageSize: 5 | 10 | 20 | 50 = 20;
  notes: NoteElet[] = [];
  total = 0;
  columnOp = 'lastModifiedAt';
  columns: Array<PaginatorColumn> = [
    { name: '标题', value: 'name' },
    { name: '最近修改时间', value: 'lastModifiedAt' },
  ];

  constructor(private router: Router,
    public hostServ: BlogService,
    private notifyServ: NotifyService,
    private dialog: MatDialog,) { }

  ngOnInit() {
    this.onResetClick();
  }

  onNoteOpClick(op: NoteOp, note: NoteElet): void {
    switch (op) {
      case NoteOp.see:
        this.onNoteSeeClick(note);
        break;
      case NoteOp.to_column:
        this.onNoteFavoriteClick(note);
        break;
    }
  }

  onPaginatorChange(paginator: Paginator) {
    this.params.filter = this.filter;
    this.params.pageIndex = paginator.pageIndex;
    this.params.pageSize = paginator.pageSize;
    this.params.sortColumn = paginator.column;
    this.params.sort = paginator.sort;
    this._loadData(this.params);
  }

  onSearchClick(): void {
    this.params.filter = this.filter;
    this._loadData(this.params);
  }

  onResetClick(): void {
    this.notes = [];
    this.filter = '';
    this.total = 0;
    this.pageSize = 20;
    this.params.filter = this.filter;
    this.params.pageIndex = 1;
    this.params.pageSize = this.pageSize;
    this.params.sortColumn = this.columnOp;
    this.columnOp = 'lastModifiedAt';
    this._loadData(this.params);
  }

  private onNoteSeeClick(n: NoteElet) {
    this.router.navigate([`read/${n.contentId}/${n.name}`]);
  }

  private onNoteFavoriteClick(n: NoteElet) {
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
        n.checked = true;
      }
    });
  }

  private _loadData(params: PagingParameter<string>): void {
    this.hostServ.getList(params).subscribe({
      next: res => { this._renderInfo(res); },
      error: err => {
        this.notes = [];
        const msg = `数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _renderInfo(res: ResponsePagingResult<NoteElet>): void {
    if (res.success) {
      this.total = res.rowsCount;
      this.notes = res.data;
    } else {
      const msg = `数据加载失败！！！ ${res.allMessages}`;
      this.notifyServ.notify(msg, 'error');
    }
  }

}
