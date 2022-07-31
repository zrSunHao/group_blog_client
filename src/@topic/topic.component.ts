import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifyService } from 'src/@shared/services/notify.service';
import { DialogDomainComponent } from './dialog-domain/dialog-domain.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  constructor(private router: Router,
    private dialog: MatDialog,
    private notifyServ: NotifyService) {
  }

  ngOnInit() {
  }

  onTopicClick(topic: any) {
    this.router.navigate(['topic/column']);
  }

  onAddDomain(): void {
    const domain = {};
    const dialogRef = this.dialog.open(DialogDomainComponent,
      { width: '360px', data: domain, }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save') {
        const newPsd: string = result?.newPsd;
        this.notifyServ.notify(`领域添加成功！！！`, 'success');
      }
    });
  }

}
