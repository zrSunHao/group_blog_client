import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorService, DocumentNode, LooseObject } from '../editor.service';

@Component({
  selector: 'app-editor-table',
  templateUrl: './editor-table.component.html',
  styleUrls: ['./editor-table.component.scss']
})
export class EditorTableComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();
  @ViewChild('input', { static: false })
  input!: ElementRef;
  @ViewChild('view', { static: false })
  view!: ElementRef;
  edit: boolean = false;
  focus: boolean = false;
  ths: string[] = [];
  rows: Array<string[]> = [];
  containerStyle: LooseObject = { 'justify-content': 'flex-start' }; //flex-start center flex-end

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
        this.onStyleChange();
      }
    }
  }

  private onParseContent() {
    this.ths = [];
    this.rows = [];
    let rows = this.node.content.split('\n')
    rows = rows.filter(x => x);
    if (rows.length < 1) return;
    if (rows.length > 0) {
      const bs = rows[0].split('|');
      if (bs.length > 0) this.ths = [...bs];
    }
    if (rows.length > 1) {
      rows.forEach((x, index) => {
        if (index > 0) {
          const bs = x.split('|');
          if (bs.length > 0) this.rows.push(bs);
        }
      })
    }
  }

  private onStyleChange() {
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
