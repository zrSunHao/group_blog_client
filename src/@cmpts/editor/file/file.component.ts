import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileCategory } from 'src/@resource/model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();
  @ViewChild("fileInput", { static: false })
  fileInput!: ElementRef;
  @ViewChild('view', { static: false })
  view!: ElementRef;
  file: any;
  edit: boolean = false;
  focus: boolean = false;

  constructor(public service: EditorService,
    private notifyServ: NotifyService) { }

  ngOnInit() {
    this.onStatusChange();
    this.node.call((msf: string) => {
      if (this.view) this.view.nativeElement.scrollIntoView();
    })
  }

  onFileClick(): void {
    this.fileInput.nativeElement.click();
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
              const msg = `文件上传失败！！！ ${res.allMessages}`;
              this.notifyServ.notify(msg, 'error');
            }
            this.file = null;
          },
          error: err => {
            const msg = `文件上传失败！！！ ${err}`;
            this.notifyServ.notify(msg, 'error');
            this.file = null;
          }
        }
      )
    }
  }

  private onStatusChange() {
    if (!this.node.content) this.edit = true;
    else {
      if (this.focus) this.edit = true;
      else {
        this.edit = false;
      }
    }
  }
}
