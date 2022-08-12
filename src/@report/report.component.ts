import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentNode, EditorService } from 'src/@cmpts/editor/editor.service';
import { ResponseResult } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { NoteContentM } from 'src/@topic/model';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  noteId: string = '';
  noteName: string = '';
  type: string = 'my';

  public constructor(public serv: EditorService,
    private router: Router,
    private route: ActivatedRoute,
    private notifyServ: NotifyService,
    public hostServ: ReportService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.noteId = params['id'];
      this.noteName = params['name'];
      this.type = params['type'];
      this.serv.noteId = this.noteId;
      this.serv.printMode = true;
      this.serv.editEnable(false);
      if (this.type == 'my') {
        this._getMyContent();
        this.serv.init();
      }
      else {
        this.serv.opened(this.noteId);
        this._getOpenedNoteContent();
      }
    });
  }

  private _getMyContent(): void {
    this.hostServ.getMyNoteContent(this.noteId).subscribe({
      next: res => {
        this._render(res);
      },
      error: err => {
        const msg = `笔记内容加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _getOpenedNoteContent(): void {
    this.hostServ.getOpenedNoteContent(this.noteId).subscribe({
      next: res => {
        this._render(res);
      },
      error: err => {
        const msg = `笔记内容加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _render(res: ResponseResult<NoteContentM>): void {
    if (!res.success) {
      const msg = `笔记内容加载失败！！！ ${res.allMessages}`;
      this.notifyServ.notify(msg, 'error');
      return;
    }
    const data = res.data as NoteContentM;
    if (data.content) {
      let nodes = JSON.parse(data.content) as DocumentNode[];
      this.serv.nodes = this.serv.convertNodes(nodes)

      setTimeout(() => {
        for (const item of this.serv.nodes) {
          if (this.serv.Headlines.indexOf(item.type) != -1) item.open = true;
        }
      }, 100);
    }
  }

}
