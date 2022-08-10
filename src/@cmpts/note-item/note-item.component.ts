import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class NoteElet {
  id: number | null = null;
  contentId: string | null = null;
  name: string = '';
  profileName: string | null = '';
  intro: string | null = '';
  keys: string = '';
  columnId: string = '';
  hits: number = 0;
  order: number = 0;
  author: string = '';
  opened: boolean = false;
  lastModifiedAt: Date | null = null;
  checked: boolean | null = null;
}

export enum NoteType {
  my = 0,
  public = 1,
  favorite = 3,
}

export enum NoteOp {
  see = 1,
  update = 2,
  logo = 3,
  delete = 4,
  opened = 5,
  closed = 6,
  to_column = 7,
}

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {

  @Input() data: NoteElet = new NoteElet();
  @Input() fileBaseUrl: string = '';
  @Input() isAuthor = false;
  @Input() type: NoteType = NoteType.my;
  @Output() onClick: EventEmitter<NoteOp> = new EventEmitter<NoteOp>();
  defaultImgUrl: string = '';
  noteType = NoteType;

  constructor() { }

  ngOnInit() {
    let index = Math.ceil(Math.random() * 10);
    this.defaultImgUrl = `assets/imgs/card_${index}.png`
  }

  onSeeClick() {
    this.onClick.emit(NoteOp.see);
  }

  onUpdateClick() {
    this.onClick.emit(NoteOp.update);
  }

  onLogoClick() {
    this.onClick.emit(NoteOp.logo);
  }

  onDeleteClick() {
    this.onClick.emit(NoteOp.delete);
  }

  onOpenClick() {
    this.onClick.emit(NoteOp.opened);
  }

  onCloseClick() {
    this.onClick.emit(NoteOp.closed);
  }

  onToColumnClick() {
    this.onClick.emit(NoteOp.to_column);
  }
}
