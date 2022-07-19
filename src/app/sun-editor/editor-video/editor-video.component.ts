import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-video',
  templateUrl: './editor-video.component.html',
  styleUrls: ['./editor-video.component.scss']
})
export class EditorVideoComponent implements OnInit {

  @ViewChild("videoInput", { static: false })
  videoInput!: ElementRef;
  file: any;

  @Input() node: DocumentNode = new DocumentNode();

  constructor(public service: EditorService) { }

  ngOnInit() {

  }

  onAvatarClick(): void {
    this.videoInput.nativeElement.click();
  }

  onFileChange(e: any): void {
    if (e?.target?.files?.length) {
      // const formData = new FormData();
      // formData.append('avatar', e.target.files[0]);
      this.node.url = 'assets/files/PrettBoy.mp4';
      this.node.content = e.target.files[0].name;
      console.log(e.target.files[0])
    }
  }

}
