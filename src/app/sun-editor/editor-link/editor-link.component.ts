import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorService, DocumentNode, DocumentLinkNode } from '../editor.service';

@Component({
  selector: 'app-editor-link',
  templateUrl: './editor-link.component.html',
  styleUrls: ['./editor-link.component.scss']
})
export class EditorLinkComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();
  @ViewChild('input', { static: false })
  input!: ElementRef;
  edit: boolean = false;
  focus: boolean = false;
  links: DocumentLinkNode[] = [];

  constructor(public service: EditorService) { }

  ngOnInit() {
    this.onStatusChange();
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
    this.links = [];
    let rows = this.node.content.split('\n')
    rows = rows.filter(x => x);
    if (rows.length < 1) return;
    rows.forEach(x => {
      const bs = x.split('|');
      let b = new DocumentLinkNode();
      if (bs.length >= 1) b.name = bs[0];
      if (bs.length > 1) b.url = bs[1];
      this.links.push(b);
    });
  }

}
