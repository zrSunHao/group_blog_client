import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorService, DocumentNode, DocumentNodeType } from '../editor.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {

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
    this.node.call((msf: string) => {
      if (this.view) this.view.nativeElement.scrollIntoView();
    })
  }

  onInputFocus() {
    if (!this.service.canEdit) return;
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

  addPeerNode() {
    const node = this.service.nodeFactory(this.node.type);
    this.service.insertNode(this.node, node);
  }

  addSubHeadline() {
    let type = DocumentNodeType.h2;
    switch (this.node.type) {
      case DocumentNodeType.h2:
        type = DocumentNodeType.h3;
        break;
      case DocumentNodeType.h3:
        type = DocumentNodeType.h4;
        break;
      case DocumentNodeType.h4:
        type = DocumentNodeType.h5;
        break;
      case DocumentNodeType.h5:
        type = DocumentNodeType.h6;
        break;
    }
    const node = this.service.nodeFactory(type);
    this.service.backup();
    this.node.children.push(node);
  }

  addChild(type: DocumentNodeType) {
    const node = this.service.nodeFactory(type);
    this.service.backup();
    this.node.children.push(node);
  }

  private onStatusChange() {
    if (!this.node.content) this.edit = true;
    else {
      if (this.focus) this.edit = true;
      else this.edit = false;
    }
  }

}
