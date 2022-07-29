import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

export interface Paginator {
  total: number;
  column: string;
  sort: 'desc' | 'asc';
  pageIndex: number;
  pageSize: number;
}

export interface PaginatorColumn {
  name: string;
  value: string;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() columns: Array<PaginatorColumn> = [{ name: '默认', value: 'default' }];
  @Input() columnOp: string = 'default';
  @Input() total: number = 0;

  @Input() sort: 'desc' | 'asc' = 'desc';
  @Input() pageIndex: number = 1;
  @Input() pageSize: 5 | 10 | 20 | 50 = 10;

  @Output() onChange: EventEmitter<Paginator> = new EventEmitter<Paginator>();

  firstDisabled = false;
  lastDisabled = false;
  previousDisabled = false;
  nextDisabled = false;

  constructor() { }

  ngOnInit() {
    this.btnStatus();
  }

  ngOnChanges(changes: any) {
    this.btnStatus();
  }

  pageInfo(): string {
    let count = Math.ceil(this.total / this.pageSize);
    return `共${count}页/共${this.total}条`;
  }

  firstPage(): void {
    this.indexValid();
    if (this.pageIndex > 1) {
      this.pageIndex = 1;
      this.btnStatus();
      this.notify();
    }

  }

  previousPage(): void {
    this.indexValid();
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.btnStatus();
      this.notify();
    }
  }

  nextPage(): void {
    this.indexValid();
    let count = Math.ceil(this.total / this.pageSize);
    if (this.pageIndex < count) {
      this.pageIndex++;
      this.btnStatus();
      this.notify();
    }
  }

  lastPage(): void {
    this.indexValid();
    let count = Math.ceil(this.total / this.pageSize);
    if (this.pageIndex != count) {
      this.pageIndex = count;
      this.btnStatus();
      this.notify();
    }
  }

  notify(): void {
    const paginator: Paginator = {
      total: this.total,
      column: this.columnOp,
      sort: this.sort,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    this.onChange.emit(paginator)
  }

  keyEnter() {
    this.indexValid();
    this.btnStatus();
    this.notify();
  }

  indexValid(): boolean {
    let flag = true;
    if (this.pageIndex < 1) { this.pageIndex = 1; flag = false; }
    let count = Math.ceil(this.total / this.pageSize);
    if (this.pageIndex > count) { this.pageIndex = count; flag = false; }
    return flag;
  }

  btnStatus() {
    if (this.pageIndex <= 1) {
      this.previousDisabled = true;
      this.firstDisabled = true;
    } else {
      this.previousDisabled = false;
      this.firstDisabled = false;
    }
    let count = Math.ceil(this.total / this.pageSize);
    if (this.pageIndex >= count) {
      this.nextDisabled = true;
      this.lastDisabled = true;
    } else {
      this.nextDisabled = false;
      this.lastDisabled = false;
    }
  }

}
