import { DomainElet, TopicElet } from './../../model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {

  @Input() data: DomainElet = new DomainElet();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddTopic: EventEmitter<any> = new EventEmitter<any>();

  @Output() onTopicColumn: EventEmitter<TopicElet> = new EventEmitter<TopicElet>();
  @Output() onUpdateTopic: EventEmitter<TopicElet> = new EventEmitter<TopicElet>();
  @Output() onDeleteTopic: EventEmitter<TopicElet> = new EventEmitter<TopicElet>();

  constructor() { }

  ngOnInit() {
  }

  onUpdateClick() {
    this.onUpdate.emit();
  }

  onDeleteClick() {
    this.onDelete.emit();
  }

  onAddTopicClick() {
    this.onAddTopic.emit();
  }

  onTopicColumnClick(topic: TopicElet) {
    this.onTopicColumn.emit(topic);
  }

  onUpdateTopicClick(topic: TopicElet) {
    this.onUpdateTopic.emit(topic);
  }

  onDeleteTopicClick(topic: TopicElet) {
    this.onDeleteTopic.emit(topic);
  }

}
