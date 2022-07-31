import { Component, OnInit } from '@angular/core';
import { Paginator, PaginatorColumn } from 'src/@cmpts/paginator/paginator.component';
import { OptionItem, RoleType, UserElet, UserFilter, USER_DATA } from 'src/@shared/models/paging.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  filter: UserFilter = new UserFilter();
  roleOps: OptionItem[] = [
    { key: RoleType.other, value: '全部' },
    { key: RoleType.odinary, value: '普通用户' },
    { key: RoleType.manager, value: '管理员' },
    { key: RoleType.superManager, value: '超级管理员' },
  ];

  total = 30;
  columnOp = 'lastLoginAt';
  columns: Array<PaginatorColumn> = [
    { name: '账号', value: 'name' },
    { name: '最近登陆时间', value: 'lastLoginAt' },
    { name: '注册时间', value: 'createdAt' },
  ];

  displayedColumns = ['userName', 'role', 'limited', 'createdAt', 'lastLoginAt', 'operate',];
  dataSource: UserElet[] = USER_DATA;

  constructor() { }

  ngOnInit() {
  }

  onPaginatorChange(paginator: Paginator) {
  }

}
