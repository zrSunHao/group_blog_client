import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopicElet } from 'src/@topic/model';

@Component({
  selector: 'app-topic-item',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss']
})
export class TopicItemComponent implements OnInit {

  @Input() data: TopicElet = new TopicElet();

  @Output() onColumn: EventEmitter<any> = new EventEmitter<any>();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onColumnClick() {
    this.onColumn.emit();
  }

  onUpdateClick() {
    this.onUpdate.emit();
  }

  onDeleteClick() {
    this.onDelete.emit();
  }

}
