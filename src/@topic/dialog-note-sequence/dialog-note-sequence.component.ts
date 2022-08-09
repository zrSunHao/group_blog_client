import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteElet } from 'src/@cmpts/note-item/note-item.component';
import { OptionItem } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { SequnceM } from '../model';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-dialog-note-sequence',
  templateUrl: './dialog-note-sequence.component.html',
  styleUrls: ['./dialog-note-sequence.component.scss']
})
export class DialogNoteSequenceComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogNoteSequenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteElet[],
    private notifyServ: NotifyService,
    private hostServ: TopicService) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<NoteElet[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  onSaveClick(): void {
    let items: OptionItem[] = [];
    this.data.forEach((value, index) => {
      const item: OptionItem = { key: index, value: value.contentId as string };
      items.push(item);
    });
    let sequence = new SequnceM();
    sequence.dragObjectId = this.data[0].contentId as string;
    sequence.dropGroupId = this.data[0].columnId;
    sequence.dropTargets = items;
    this.hostServ.sortNote(sequence).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`笔记排序成功！！！`, 'success');
          this.dialogRef.close({ op: 'save', data: res.data });
        } else {
          const msg = `添加笔记排序失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `添加笔记排序失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  onCloseClick(): void {
    this.dialogRef.close({ op: 'close' });
  }
}
