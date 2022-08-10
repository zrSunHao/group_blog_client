import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class ColumnElet {
  id: string | null = null;
  name: string = '';
  logo: string | null = '';
  intro: string = '';
  topicId: string = '';
  order: number = 1024;
}

export enum ColumnOp {
  selected = 1,
  update = 2,
  logo = 3,
  delete = 4,
  add_note = 5,
  other = 100,
}

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss']
})
export class ColumnItemComponent implements OnInit {

  @Input() data: ColumnElet = new ColumnElet();
  @Input() fileBaseUrl: string = '';
  @Input() selectedId: string | null | undefined = '';
  @Input() isFavorite: boolean = false;
  @Output() onOperate: EventEmitter<ColumnOp> = new EventEmitter<ColumnOp>();

  constructor() { }

  ngOnInit() {
  }

  onSelectedClick() {
    this.onOperate.emit(ColumnOp.selected);
  }

  onUpdateClick() {
    this.onOperate.emit(ColumnOp.update);
  }

  onLogoClick() {
    this.onOperate.emit(ColumnOp.logo);
  }

  onDeleteClick() {
    this.onOperate.emit(ColumnOp.delete);
  }

  onAddNoteClick() {
    this.onOperate.emit(ColumnOp.add_note);
  }

}
