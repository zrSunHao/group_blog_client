import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class NoteElet {
  id: number | null = null;
  contentId: string | null = null;
  name: string = '';
  profileName: string | null = '';
  intro: string = '';
  columnId: string = '';
  hits: number = 0;
  opened: boolean = false;
  lastModifiedAt: Date | null = null;
}

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {

  @Input() imgUrl: string = 'assets/files/card_1.png';
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onMyClick() {
    this.onClick.emit();
  }

}
