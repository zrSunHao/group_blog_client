import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileCategory } from 'src/@resource/model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { EditorService, DocumentNode, DocumentNodeType } from '../editor.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  @ViewChild("audioInput", { static: false })
  audioInput!: ElementRef;
  @ViewChild('view', { static: false })
  view!: ElementRef;
  file: any;
  nodeType = DocumentNodeType;

  @Input() node: DocumentNode = new DocumentNode();

  constructor(public service: EditorService,
    private notifyServ: NotifyService) { }

  ngOnInit() {
    this.node.call((msf: string) => {
      if (this.view) this.view.nativeElement.scrollIntoView();
    })
  }

  onFileClick(): void {
    this.audioInput.nativeElement.click();
  }

  onFileChange(e: any): void {
    if (e?.target?.files?.length) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      this.service.uploadfile(this.service.noteId, FileCategory.note_img, formData).subscribe(
        {
          next: res => {
            if (res.success) {
              this.node.url = res.data as string;
              this.node.content = e.target.files[0].name;
            } else {
              const msg = `音频上传失败！！！ ${res.allMessages}`;
              this.notifyServ.notify(msg, 'error');
            }
            this.file = null;
          },
          error: err => {
            const msg = `音频上传失败！！！ ${err}`;
            this.notifyServ.notify(msg, 'error');
            this.file = null;
          }
        }
      )
    }
  }

}
