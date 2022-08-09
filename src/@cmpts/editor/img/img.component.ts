import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileCategory } from 'src/@resource/model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { EditorService, DocumentNode, LooseObject } from '../editor.service';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @ViewChild("imageInput", { static: false })
  imageInput!: ElementRef;
  @ViewChild('view', { static: false })
  view!: ElementRef;
  file: any;

  @Input() node: DocumentNode = new DocumentNode();
  containerStyle: LooseObject = { 'justify-content': 'flex-start' }; //flex-start center flex-end
  imgStyle: LooseObject = { 'max-height': '20rem', };

  constructor(public service: EditorService,
    private notifyServ: NotifyService) { }

  ngOnInit() {
    this.onStatusChange();
    this.node.call((msf: string) => {
      if (this.view) this.view.nativeElement.scrollIntoView();
    })
  }

  onFileClick(): void {
    this.imageInput.nativeElement.click();
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
              const msg = `图片上传失败！！！ ${res.allMessages}`;
              this.notifyServ.notify(msg, 'error');
            }
            this.file = null;
          },
          error: err => {
            const msg = `图片上传失败！！！ ${err}`;
            this.notifyServ.notify(msg, 'error');
            this.file = null;
          }
        }
      )
    }
  }

  onLeft() {
    this.node.data['position'] = 'left';
    this.containerStyle['justify-content'] = 'flex-start';
  }

  onCenter() {
    this.node.data['position'] = 'center';
    this.containerStyle['justify-content'] = 'center';
  }

  onRight() {
    this.node.data['position'] = 'right';
    this.containerStyle['justify-content'] = 'flex-end';
  }

  onBigHeight() {
    this.node.data['height'] = '30rem';
    this.imgStyle = { 'max-height': '30rem', };
  }

  onMiddleHeight() {
    this.node.data['height'] = '20rem';
    this.imgStyle = { 'max-height': '20rem', };
  }

  onSamllHeight() {
    this.node.data['height'] = '10rem';
    this.imgStyle = { 'max-height': '10rem', };
  }


  private onStatusChange() {
    if (this.node.data['height']) {
      this.imgStyle['max-height'] = this.node.data['height'];
    } else {
      this.imgStyle = { 'max-height': '20rem', };
    }

    if (this.node.data['position']) {
      switch (this.node.data['position']) {
        case 'left':
          this.containerStyle['justify-content'] = 'flex-start';
          break;
        case 'center':
          this.containerStyle['justify-content'] = 'center';
          break;
        case 'right':
          this.containerStyle['justify-content'] = 'flex-end';
          break;
        default:
          this.containerStyle['justify-content'] = 'flex-start';
          break;
      }
    } else {
      this.containerStyle = { 'justify-content': 'flex-start' };
    }
  }

}
