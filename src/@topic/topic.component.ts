import { FileCategory } from './../@resource/model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/@shared/cmpts/confirm-dialog/confirm-dialog.component';
import { NotifyService } from 'src/@shared/services/notify.service';
import { TopicEvent } from './cmpts/domain/domain.component';
import { TopicOp } from './cmpts/topic-item/topic-item.component';
import { DialogDomainSequenceComponent } from './dialog-domain-sequence/dialog-domain-sequence.component';
import { DialogDomainComponent } from './dialog-domain/dialog-domain.component';
import { DialogTopicComponent } from './dialog-topic/dialog-topic.component';
import { DomainElet, TopicElet } from './model';
import { TopicService } from './topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  @ViewChild("imageInput", { static: false })
  imageInput!: ElementRef;
  file: any;
  waitLogoTopic: TopicElet | null = null;
  domains: DomainElet[] = [];

  constructor(private router: Router,
    private dialog: MatDialog,
    private notifyServ: NotifyService,
    private hostServ: TopicService,) {
  }

  ngOnInit() {
    this.getDomainList();
  }

  onRefreshClick() {
    this.getDomainList();
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '260px',
      data: `确定要删除[${d.name}]领域吗？`,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'yes') this._deleteDomain(d);
    });
  }

  onSortDomain(): void {
    const dialogRef = this.dialog.open(DialogDomainSequenceComponent,
      { width: '360px', data: this.domains, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (!result?.op || result?.op != 'save') {
        this.getDomainList();
      }
    });
  }

  onAddTopic(d: DomainElet): void {
    let topic = new TopicElet();
    topic.domainId = d.id as string;
    const dialogRef = this.dialog.open(DialogTopicComponent,
      { width: '360px', data: topic, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save' && result?.data) {
        const data: TopicElet = result?.data;
        const domains = this.domains.filter(x => x.id == d.id);
        if (domains && domains.length > 0) {
          domains[0].topics.splice(0, 0, data);
        }
      }
    });
  }

  onTopic(event: TopicEvent): void {
    switch (event.op) {
      case TopicOp.column:
        this.onOpenColumn(event.topic);
        break;
      case TopicOp.logo:
        this.onLogoTopic(event.topic);
        break;
      case TopicOp.update:
        this.onUpdateTopic(event.topic);
        break;
      case TopicOp.delete:
        this.onDeleteTopic(event.topic);
        break;
    }
  }

  onTopicSort(): void {

  }

  onFileChange(e: any): void {
    if (e?.target?.files?.length) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      this.hostServ.logo(this.waitLogoTopic?.id as string, FileCategory.topic_logo, formData).subscribe(
        {
          next: res => {
            if (res.success) {
              this._logoTopic(res.data as string);
            } else {
              const msg = `主题${this.waitLogoTopic?.name}的logo上传失败！！！ ${res.allMessages}`;
              this.notifyServ.notify(msg, 'error');
            }
            this.file = null;
          },
          error: err => {
            const msg = `主题${this.waitLogoTopic?.name}的logo上传失败！！！ ${err}`;
            this.notifyServ.notify(msg, 'error');
            this.file = null;
          }
        }
      )
    }
  }

  onFileClick(): void {
    if (this.waitLogoTopic) {
      this.imageInput.nativeElement.click();
    }
  }

  private onUpdateTopic(t: TopicElet): void {
    const topic = new TopicElet();
    topic.id = t.id;
    topic.name = t.name;
    topic.logo = t.logo;
    topic.domainId = t.domainId;
    topic.order = t.order;
    const dialogRef = this.dialog.open(DialogTopicComponent,
      { width: '360px', data: topic, }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.op === 'save') {
        const data: DomainElet = result?.data;
        t.name = data.name;
      }
    });
  }

  private onDeleteTopic(t: TopicElet): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '260px',
      data: `确定要删除[${t.name}]主题吗？`,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'yes') this._deleteTopic(t);
    });
  }

  private onLogoTopic(t: TopicElet): void {
    this.waitLogoTopic = t;
    this.onFileClick();
  }

  private onOpenColumn(t: TopicElet): void {
    this.router.navigate([`topic/column/${t.id}/${t.name}`]);
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

  private getTopicList(domain: DomainElet): void {

    this.hostServ.getTopicList(domain.id as string).subscribe({
      next: res => {
        domain.topics = res.data;
      },
      error: err => {
        const msg = `领域数据加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _deleteDomain(d: DomainElet): void {
    this.hostServ.deleteDomain(d.id as string).subscribe({
      next: res => {
        if (res.success) {
          this.domains = this.domains.filter(x => x.id != d.id);
          this.notifyServ.notify(`删除领域[${d.name}]成功！！！`, 'success');
        } else {
          const msg = `删除领域[${d.name}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `删除领域[${d.name}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _deleteTopic(t: TopicElet): void {
    this.hostServ.deleteTopic(t.id as string).subscribe({
      next: res => {
        if (res.success) {
          const domains = this.domains.filter(x => x.id == t.domainId);
          if (domains && domains.length > 0) {
            domains[0].topics = domains[0].topics.filter(x => x.id != t.id);
          }
          this.notifyServ.notify(`删除主题[${t.name}]成功！！！`, 'success');
        } else {
          const msg = `删除主题[${t.name}]失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `删除主题[${t.name}]失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _logoTopic(logo: string): void {
    this.hostServ.addTopicLogo(this.waitLogoTopic?.id as string, logo).subscribe({
      next: res => {
        if (res.success) {
          if (this.waitLogoTopic) this.waitLogoTopic.logo = logo;
          this.notifyServ.notify(`主题logo[${this.waitLogoTopic?.name}]信息上传成功！！！`, 'success');
        } else {
          const msg = `主题logo[${this.waitLogoTopic?.name}]信息上传失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `主题logo[${this.waitLogoTopic?.name}]信息上传失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

}
