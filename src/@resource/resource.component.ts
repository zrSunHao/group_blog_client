import { Component, OnInit } from '@angular/core';
import { Paginator, PaginatorColumn } from 'src/@cmpts/paginator/paginator.component';
import { AUTH_KEY, LoginRes } from 'src/@security/auth.service';
import { PagingParameter, ResponsePagingResult } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { CategoryOps, ResourceElet, ResourceFilter, RESOURCE_DATA } from './model';
import { ResourceService } from './resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  params = new PagingParameter<ResourceFilter>();
  filter: ResourceFilter = new ResourceFilter();
  categoryOps = CategoryOps;

  total = 0;
  columnOp = 'lastLoginAt';
  columns: Array<PaginatorColumn> = [
    { name: '文件名', value: 'name' },
    { name: '上传时间', value: 'createdAt' },
  ];

  displayedColumns = ['name', 'type', 'category', 'size', 'createdAt', 'operate',];
  dataSource: ResourceElet[] = RESOURCE_DATA;
  downloadUrl: string = '';

  constructor(private hostServ: ResourceService,
    private notifyServ: NotifyService,) { }

  ngOnInit() {
    this.onResetClick();
    let key: string = '';
    const json = localStorage.getItem(AUTH_KEY);
    if (json) {
      const res = JSON.parse(json) as LoginRes;
      if (res) key = res.key;
    }
    this.downloadUrl = `${this.hostServ.baseUrl}/GetFileByName?key=${key}&name=`;
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
    this.filter = new ResourceFilter();
    this.params.filter = this.filter;
    this.params.pageIndex = 1;
    this.params.sortColumn = this.columnOp;
    this.columnOp = 'createdAt';
    this._loadData(this.params);
  }

  private _loadData(params: PagingParameter<ResourceFilter>): void {
    this.hostServ.getList(params).subscribe({
      next: res => { this._renderInfo(res); },
      error: err => {
        this.dataSource = [];
        const msg = `数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _renderInfo(res: ResponsePagingResult<ResourceElet>): void {
    if (res.success) {
      this.total = res.rowsCount;
      this.dataSource = res.data;
    } else {
      const msg = `数据加载失败！！！ ${res.allMessages}`;
      this.notifyServ.notify(msg, 'error');
    }
  }
}
