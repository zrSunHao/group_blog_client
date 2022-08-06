import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifyService } from 'src/@shared/services/notify.service';
import { DialogDomainComponent } from './dialog-domain/dialog-domain.component';
import { DomainElet, TopicElet } from './model';
import { TopicService } from './topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  domains: DomainElet[] = [];

  constructor(private router: Router,
    private dialog: MatDialog,
    private notifyServ: NotifyService,
    private hostServ: TopicService,) {
  }

  ngOnInit() {
    this.getDomainList();
  }

  onTopicClick(topic: any) {
    this.router.navigate(['topic/column']);
  }

  private getDomainList(): void {
    this.domains = [];
    this.hostServ.getDomainList().subscribe({
      next: res => {
        this.domains = res.data;
      },
      error: err => {
        const msg = `领域数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  onAddDomain(): void {
    const domain = new DomainElet();
    const dialogRef = this.dialog.open(DialogDomainComponent,
      { width: '360px', data: domain, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save' && result?.data) {
        const data: DomainElet = result?.data;
        this.domains.splice(0, 0, data);
      }
    });
  }

  onUpdateDomain(d: DomainElet): void {
    const domain = new DomainElet();
    domain.id = d.id;
    domain.name = d.name;
    domain.order = d.order;
    const dialogRef = this.dialog.open(DialogDomainComponent,
      { width: '360px', data: domain, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save') {
        const data: DomainElet = result?.data;
        d.name = data.name;
      }
    });
  }

  onDeleteDomain(d: DomainElet): void {

  }

  onAddTopic(d: DomainElet): void {

  }

  onUpdateTopic(t: TopicElet): void {

  }

  onDeleteTopic(t: TopicElet): void {

  }

  onOpenColumn(t: TopicElet): void {

  }

}
