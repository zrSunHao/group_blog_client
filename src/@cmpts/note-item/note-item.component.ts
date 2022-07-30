import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {

  @Input() imgUrl:string = 'assets/files/card_1.png';

  constructor() { }

  ngOnInit() {
  }

}
