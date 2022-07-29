import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  constructor(public service: EditorService) { }

  ngOnInit() {
    this.onStatusChange();
    this.node.call((msf:string)=>{
      if(this.view) this.view.nativeElement.scrollIntoView();
    })
  }

  onFileClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(e: any): void {
    if (e?.target?.files?.length) {
      // const formData = new FormData();
      // formData.append('avatar', e.target.files[0]);
      this.node.url = 'assets/imgs/bg_4.png';
      this.node.content = e.target.files[0].name;
      //console.log(e.target.files[0])
      this.onStatusChange();
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
