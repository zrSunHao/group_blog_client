import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorService, DocumentNode, DocumentNodeType } from '../editor.service';

@Component({
  selector: 'app-editor-headline',
  templateUrl: './editor-headline.component.html',
  styleUrls: ['./editor-headline.component.scss']
})
export class EditorHeadlineComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();
  @ViewChild('input', { static: false })
  input!: ElementRef;

  @ViewChild('view', { static: false })
  view!: ElementRef;

  nodeType = DocumentNodeType;
  edit: boolean = false;
  focus: boolean = false;

  constructor(public service: EditorService) { }

  ngOnInit() {
    this.onStatusChange();
    this.node.call((msf:string)=>{
      if(this.view) this.view.nativeElement.scrollIntoView();
    })
  }

  onInputFocus() {
    this.focus = true;
    this.onStatusChange();
    setTimeout(() => {
      if (this.input) {
        this.input.nativeElement.focus();
      }
    }, 150);
  }

  onInputBlur() {
    this.focus = false;
    this.onStatusChange();
  }

  private onStatusChange() {
    if (!this.node.content) this.edit = true;
    else {
      if (this.focus) this.edit = true;
      else this.edit = false;
    }
  }

}
