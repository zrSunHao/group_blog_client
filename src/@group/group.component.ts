import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginator, PaginatorColumn } from 'src/@cmpts/paginator/paginator.component';
import { OptionItem, PagingParameter, ResetDto, ResponsePagingResult, RoleType, } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { DialogMemberComponent } from './dialog-member/dialog-member.component';
import { DialogResetComponent } from './dialog-reset/dialog-reset.component';
import { GroupService } from './group.service';
import { UserElet, UserFilter } from './model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  params = new PagingParameter<UserFilter>();
  filter: UserFilter = new UserFilter();
  roleOps: OptionItem[] = [
    { key: RoleType.odinary, value: '普通用户' },
    { key: RoleType.manager, value: '管理员' },
    { key: RoleType.superManager, value: '超级管理员' },
  ];

  pageSize: 5 | 10 | 20 | 50 = 5;
  total = 30;
  columnOp = 'lastLoginAt';
  columns: Array<PaginatorColumn> = [
    { name: '账号', value: 'userName' },
    { name: '最近登陆时间', value: 'lastLoginAt' },
  ];

  displayedColumns = ['userName', 'role', 'limited', 'lastLoginAt', 'remark', 'operate',];
  dataSource: UserElet[] = [];

  constructor(private hostServ: GroupService,
    private dialog: MatDialog,
    private notifyServ: NotifyService,) { }

  ngOnInit() {
    this.onResetClick();
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
    this.filter = new UserFilter();
    this.params.filter = this.filter;
    this.params.pageIndex = 1;
    this.params.pageSize = this.pageSize;
    this.params.sortColumn = this.columnOp;
    this.columnOp = 'lastLoginAt';
    this._loadData(this.params);
  }

  onUpdate(member: UserElet): void {
    const dialogRef = this.dialog.open(DialogMemberComponent,
      { width: '360px', data: member, }
    );
  }

  onPsdReset(member: UserElet): void {
    const user = new ResetDto();
    user.userName = member.userName;
    const dialogRef = this.dialog.open(DialogResetComponent,
      { width: '360px', data: user, }
    );
  }

  private _loadData(params: PagingParameter<UserFilter>): void {
    this.dataSource = [];
    this.hostServ.getList(params).subscribe({
      next: res => { this._renderInfo(res); },
      error: err => {
        const msg = `数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _renderInfo(res: ResponsePagingResult<UserElet>): void {
    if (res.success) {
      this.total = res.rowsCount;
      this.dataSource = res.data;
    } else {
      const msg = `数据加载失败！！！ ${res.allMessages}`;
      this.notifyServ.notify(msg, 'error');
    }
  }
}
