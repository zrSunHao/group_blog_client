import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentNode, EditorService } from 'src/@cmpts/editor/editor.service';
import { GetDocumentData } from 'src/@cmpts/editor/help';
import { ResponseResult } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { NoteContentM } from 'src/@topic/model';
import { ReadService } from './read.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  noteId: string = '';
  noteName: string = '';
  type: string = 'opened';

  public constructor(public serv: EditorService,
    private router: Router,
    private route: ActivatedRoute,
    private notifyServ: NotifyService,
    public hostServ: ReadService) {

  }

  ngOnInit() {
    this.serv.nodes = [];
    this.route.params.subscribe(params => {
      this.noteId = params['id'];
      this.noteName = params['name'];
      this.serv.noteId = this.noteId;
      this.serv.printMode = false;
      this.serv.editEnable(false);
      this.serv.opened(this.noteId);
      this._getOpenedNoteContent();
    });
  }

  onPrintClick() {
    let url = `${location.protocol}//${location.host}/#report/my/${this.noteId}/${this.noteName}`;
    window.open(url, '_blank');
  }

  onBackClick() {
    history.back();
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
          const isH = this.serv.Headlines.indexOf(item.type) != -1;
              let iscH = false;
              for (const c of item.children) {
                const cH = this.serv.Headlines.indexOf(c.type) != -1;
                if (cH) iscH = true;
              }
              if (isH && iscH) item.open = true;
        }
      }, 100);
    }
  }

}
