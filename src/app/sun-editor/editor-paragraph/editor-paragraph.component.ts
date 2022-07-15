import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorService, DocumentNode, DocumentNodeType } from '../editor.service';

interface LooseObject {
  [key: string]: string
}

class PElement {
  text: string = '';
  style: LooseObject = {};
}

@Component({
  selector: 'app-editor-paragraph',
  templateUrl: './editor-paragraph.component.html',
  styleUrls: ['./editor-paragraph.component.scss']
})
export class EditorParagraphComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();
  @ViewChild('input', { static: false })
  input!: ElementRef;

  nodeType = DocumentNodeType;
  edit: boolean = false;
  focus: boolean = false;
  elements: PElement[] = [];

  constructor(public service: EditorService) { }

  ngOnInit() {
    this.node.level = 1;
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
        this.elements = this.onParseContent();
      }
    }
  }

  private onParseContent(): PElement[] {
    const eles: PElement[] = [];
    if (!this.node.content) return eles;
    const reg = /\$\{(.+?)\}/g;
    const rs = this.node.content.match(reg);
    if (!rs) return eles;
    console.log(rs)
    let text = this.node.content;
    const symbol = 'xsxxsxxsx';
    const fix = '#|';
    rs.forEach(x => {
      text = text.replace(reg, `${fix}${symbol}${fix}`);
    })
    const ses: PElement[] = [];
    rs.forEach(x => {
      x = x.replace('${', '').replace('}', '');
      const ss = x.split('|');
      if (!ss) ses.push({ text: x, style: {} });
      else if (ss.length < 2) ses.push({ text: ss[0], style: {} });
      else {
        const e = new PElement();
        e.text = ss[0];
        e.style = this.onParseStyle(ss[1]);
        ses.push(e);
      }
    })
    let index = 0;
    const ts = text.split(fix);
    ts.forEach(x => {
      if (x == symbol && ses.length >= index + 1) {
        eles.push(ses[index]);
        index++;
      } else {
        eles.push({ text: x, style: {} });
      }
    })
    console.log(eles)
    return eles;
  }
  //${名称|color:red;background:green;font-weight:bold;}

  private onParseStyle(msg: string): any {
    let style: LooseObject = {};
    if (!msg) return style;
    msg = msg.replace('；', ';').replace('：', ':').replace(' ', '');
    const widgets = msg.split(';');
    if (!widgets) return style;
    widgets.forEach(x => {
      if (x && x.indexOf(':') > 0) {
        const ts = x.split(':');
        if (ts.length >= 2) style[`${ts[0]}`] = ts[1];
      }
    });
    return style;
  }
}
