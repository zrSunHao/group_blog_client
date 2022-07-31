import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorService, DocumentNode, LooseObject } from '../editor.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

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
