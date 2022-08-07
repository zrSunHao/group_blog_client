import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopicElet } from 'src/@topic/model';
import { TopicService } from 'src/@topic/topic.service';

export enum TopicOp {
  column = 1,
  update = 2,
  logo = 3,
  delete = 4,
  other = 100,
}

@Component({
  selector: 'app-topic-item',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss']
})
export class TopicItemComponent implements OnInit {

  @Input() data: TopicElet = new TopicElet();

  @Output() onOperate: EventEmitter<TopicOp> = new EventEmitter<TopicOp>();

  constructor(public hostServ: TopicService) { }

  ngOnInit() {
  }

  onColumnClick() {
    this.onOperate.emit(TopicOp.column);
  }

  onLogoClick() {
    this.onOperate.emit(TopicOp.logo);
  }

  onUpdateClick() {
    this.onOperate.emit(TopicOp.update);
  }

  onDeleteClick() {
    this.onOperate.emit(TopicOp.delete);
  }

}
