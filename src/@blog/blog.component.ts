import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paginator, PaginatorColumn } from 'src/@cmpts/paginator/paginator.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  total = 30;
  columnOp = 'lastLoginAt';
  columns: Array<PaginatorColumn> = [
    { name: '账号', value: 'name' },
    { name: '最近登陆时间', value: 'lastLoginAt' },
    { name: '注册时间', value: 'createdAt' },
  ];

  constructor(private router: Router) {
  }
  ngOnInit() {
  }

  onNoteClick(note: any) {
    this.router.navigate(['topic/note']);
  }

  onPaginatorChange(paginator: Paginator) {
  }

}
