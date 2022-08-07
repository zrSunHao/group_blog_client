import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OptionItem } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { DomainElet } from '../model';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-dialog-domain-sequence',
  templateUrl: './dialog-domain-sequence.component.html',
  styleUrls: ['./dialog-domain-sequence.component.scss']
})
export class DialogDomainSequenceComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogDomainSequenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DomainElet[],
    private notifyServ: NotifyService,
    private hostServ: TopicService) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<DomainElet[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  onSaveClick(): void {
    let items: OptionItem[] = [];
    this.data.forEach((value, index) => {
      const item: OptionItem = { key: index, value: value.id as string };
      items.push(item);
    });
    this.hostServ.sortDomain(items).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`领域排序成功！！！`, 'success');
          this.dialogRef.close({ op: 'save', data: res.data });
        } else {
          const msg = `添加领域排序失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `添加领域排序失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  onCloseClick(): void {
    this.dialogRef.close({ op: 'close' });
  }

}
