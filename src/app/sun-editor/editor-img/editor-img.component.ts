import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorService, DocumentNode, LooseObject } from '../editor.service';

@Component({
  selector: 'app-editor-img',
  templateUrl: './editor-img.component.html',
  styleUrls: ['./editor-img.component.scss']
})
export class EditorImgComponent implements OnInit {

  @ViewChild("imageInput", { static: false })
  imageInput!: ElementRef;
  file: any;

  @Input() node: DocumentNode = new DocumentNode();
  containerStyle: LooseObject = { 'justify-content': 'flex-start' }; //flex-start center flex-end
  imgStyle: LooseObject = { 'max-height': '20rem', };

  constructor(public service: EditorService) { }

  ngOnInit() {
    this.onStatusChange();
  }

  onAvatarClick(): void {
    this.imageInput.nativeElement.click();
  }

  onFileChange(e: any): void {
    if (e?.target?.files?.length) {
      // const formData = new FormData();
      // formData.append('avatar', e.target.files[0]);
     this.node.url = 'assets/imgs/bg_4.png';
     this.node.content = e.target.files[0].name;
     console.log(e.target.files[0])
    }
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
