import { DomainElet, SequnceM, TopicElet } from './../../model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopicOp } from '../topic-item/topic-item.component';
import { TopicService } from 'src/@topic/topic.service';
import { OptionItem } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';

export class TopicEvent {
  op: TopicOp = TopicOp.other;
  topic: TopicElet = new TopicElet();
}

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

  @Output() onTopic: EventEmitter<TopicEvent> = new EventEmitter<TopicEvent>();

  constructor(private hostServ: TopicService,
    private notifyServ: NotifyService) { }

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

  onTopicClick(op: TopicOp, topic: TopicElet) {
    const event: TopicEvent = { op: op, topic: topic };
    this.onTopic.emit(event);
  }

  onDragStart(topic: TopicElet, event: DragEvent) {
    this.hostServ.dragTopic = topic;
    this.hostServ.dragTopicDomain = this.data;
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDrop(topic: TopicElet, event: any) {
    console.log(1111);
    if (!this.hostServ.dragTopic) return;
    event.stopPropagation();
    event.preventDefault();

    let dragTopic = this.hostServ.dragTopic as TopicElet;
    let items: OptionItem[] = [];
    let position = this.data.topics.indexOf(topic);
    let index = 0;
    let isPre = false;
    for (const x of this.data.topics) {
      if (x.id == dragTopic.id) {
        if (index < position) isPre = true;
        continue;
      }
      const item: OptionItem = { key: index, value: x.id as string };
      items.push(item);
      if (index == position) {
        items.push({ key: index + 1, value: dragTopic.id as string });
        index++;
      }
      index++;
    }
    if (index < this.data.topics.length) {
      items.push({ key: this.data.topics.length, value: dragTopic.id as string });
    }
    const sequence: SequnceM = new SequnceM();
    sequence.dragObjectId = dragTopic.id as string;
    sequence.dropGroupId = this.data.id as string;
    sequence.dropTargets = items;

    if (isPre && position > 0) position--;
    this._move(dragTopic, sequence, false, position);
  }

  onDropWrap(event: any) {
    console.log(2222);
    if (!this.hostServ.dragTopic) return;
    event.stopPropagation();
    event.preventDefault();

    let dragTopic = this.hostServ.dragTopic as TopicElet;
    let items: OptionItem[] = [];
    let index = 0;
    for (const x of this.data.topics) {
      if (x.id == dragTopic.id) continue;
      const item: OptionItem = { key: index, value: x.id as string };
      items.push(item);
      index++;
    }
    items.push({ key: this.data.topics.length, value: dragTopic.id as string });
    const sequence: SequnceM = new SequnceM();
    sequence.dragObjectId = dragTopic.id as string;
    sequence.dropGroupId = this.data.id as string;
    sequence.dropTargets = items;

    this._move(dragTopic, sequence, true);
  }

  private _move(dragTopic: TopicElet, sequence: SequnceM, isWrap: boolean, position: number = 0) {
    this.hostServ.sortTopic(sequence).subscribe({
      next: res => {
        if (res.success) {
          if (this.hostServ.dragTopicDomain) {
            this.hostServ.dragTopicDomain.topics = this.hostServ.dragTopicDomain.topics.filter(x => x.id != dragTopic.id);
          }
          dragTopic.domainId = this.data.id as string;
          if (isWrap) this.data.topics.push(dragTopic);
          else this.data.topics.splice(position + 1, 0, dragTopic);
          this.notifyServ.notify(`主题[${dragTopic.name}]移动成功！！！`, 'success');
        } else {
          const msg = `删除主题[${dragTopic.name}]移动失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `删除主题[${dragTopic.name}]移动失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
    this.hostServ.dragTopic = null;
  }

}
