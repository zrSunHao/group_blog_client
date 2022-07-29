import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();
  @ViewChild('input', { static: false })
  input!: ElementRef;
  @ViewChild('view', { static: false })
  view!: ElementRef;
  edit: boolean = false;
  focus: boolean = false;
  list: string[] = [];

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
      else {
        this.edit = false;
        this.onParseContent();
      }
    }
  }

  private onParseContent() {
    this.list = [];
    if (!this.node.content) return;
    let bs = this.node.content.split('\n');
    this.list = bs.filter(x => x);
  }
}
