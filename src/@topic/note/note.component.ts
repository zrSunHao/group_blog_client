import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentNode, DocumentNodeType, EditorService } from 'src/@cmpts/editor/editor.service';
import { GetDocumentData } from 'src/@cmpts/editor/help';
import { NotifyService } from 'src/@shared/services/notify.service';
import { NoteContentM } from '../model';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  noteId: string = '';
  noteName: string = '';

  public constructor(public serv: EditorService,
    private router: Router,
    private route: ActivatedRoute,
    private notifyServ: NotifyService,
    public hostServ: TopicService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.noteId = params['id'];
      this.noteName = params['name'];
      this.serv.noteId = this.noteId;
      this.serv.editEnable(false);
      this._getContent();
    });
  }

  onEditEnable() {
    this.serv.editEnable(true);
  }

  onAddH2() {
    let h2 = this.serv.nodeFactory(DocumentNodeType.h2);
    h2.content = '新标题';
    this.serv.nodes.push(h2);
  }

  onReadOnly() {
    this.serv.editEnable(false);
  }

  onSave() {
    this._saveContent();
  }

  onPrintClick() {
    let url = `${location.protocol}//${location.host}/#report/my/${this.noteId}/${this.noteName}`;
    window.open(url, '_blank');
  }

  onBackClick() {
    history.back();
  }

  private _getContent(): void {
    this.hostServ.getNoteContent(this.noteId).subscribe({
      next: res => {
        const data = res.data as NoteContentM;
        if (data.content) {
          let nodes = JSON.parse(data.content) as DocumentNode[];
          console.log(nodes)
          this.serv.nodes = this.serv.convertNodes(nodes)

          setTimeout(() => {
            for (const item of this.serv.nodes) {
              if (this.serv.Headlines.indexOf(item.type) != -1) item.open = true;
            }
          }, 100);
        }
      },
      error: err => {
        const msg = `笔记内容加载失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  private _saveContent(): void {
    let data = new NoteContentM();
    data.id = this.noteId;
    data.content = JSON.stringify(this.serv.nodes);
    this.hostServ.saveNoteContent(data).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`保存成功！！！`, 'success');
        } else {
          const msg = `保存失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `保存失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

}
