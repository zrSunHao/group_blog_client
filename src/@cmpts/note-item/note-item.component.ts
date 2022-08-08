import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class NoteElet {
  id: number | null = null;
  contentId: string | null = null;
  name: string = '';
  profileName: string | null = '';
  intro: string = '';
  columnId: string = '';
  hits: number = 0;
  author: string = '';
  opened: boolean = false;
  lastModifiedAt: Date | null = null;
}

export enum NoteOp {
  see = 1,
  update = 2,
  logo = 3,
  delete = 4,
}

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {

  @Input() data: NoteElet = new NoteElet();
  @Input() fileBaseUrl: string = '';
  @Output() onClick: EventEmitter<NoteOp> = new EventEmitter<NoteOp>();
  defaultImgUrl: string = '';

  constructor() { }

  ngOnInit() {
    let index = Math.ceil(Math.random() * 10);
    this.defaultImgUrl = `assets/files/card_${index}.png`
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
}
