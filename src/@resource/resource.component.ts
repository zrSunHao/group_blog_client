import { Component, OnInit } from '@angular/core';
import { Paginator, PaginatorColumn } from 'src/@cmpts/paginator/paginator.component';
import { CategoryOps, ResourceElet, ResourceFilter, RESOURCE_DATA } from './model';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  filter: ResourceFilter = new ResourceFilter();
  categoryOps = CategoryOps;

  total = 30;
  columnOp = 'lastLoginAt';
  columns: Array<PaginatorColumn> = [
    { name: '文件名', value: 'name' },
    { name: '上传时间', value: 'createdAt' },
  ];

  displayedColumns = ['fileName', 'type', 'category', 'size', 'createdAt', 'operate',];
  dataSource: ResourceElet[] = RESOURCE_DATA;

  constructor() { }

  ngOnInit() {
  }

  onPaginatorChange(paginator: Paginator) {
  }


}
