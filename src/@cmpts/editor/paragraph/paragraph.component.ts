import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorService, DocumentNode, DocumentNodeType, LooseObject } from '../editor.service';

class PElement {
  text: string = '';
  type: PEType = PEType.span;
  style: LooseObject = {};
}

enum PEType {
  span = 0,
  sub = 1,
  sup = 2
}

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();
  @ViewChild('input', { static: false })
  input!: ElementRef;
  @ViewChild('view', { static: false })
  view!: ElementRef;

  nodeType = DocumentNodeType;
  edit: boolean = false;
  focus: boolean = false;
  elements: PElement[] = [];
  peType = PEType;

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
    const reg = /\[(.+?)\]/g;
    const rs = this.node.content.match(reg);
    if (!rs) {
      const e = new PElement();
      e.text = this.node.content;
      e.style = {};
      eles.push(e);
      return eles;
    }
    let text = this.node.content;
    const symbol = 'xsxxsxxsx';
    const fix = '#|';
    rs.forEach(x => {
      text = text.replace(reg, `${fix}${symbol}${fix}`);
    })
    const ses: PElement[] = [];
    console.log(text)
    rs.forEach(x => {
      x = x.replace('[', '').replace(']', '');
      const ss = x.split('|');
      if (!ss) ses.push({ text: x, style: {}, type: PEType.span });
      else if (ss.length < 2) ses.push({ text: ss[0], style: {}, type: PEType.span });
      else {
        const e = new PElement();
        e.text = ss[0];
        if (ss[1].indexOf('sup') != -1) e.type = PEType.sup;
        else if (ss[1].indexOf('sub') != -1) e.type = PEType.sub;
        else e.type = PEType.span;
        e.style = this.onParseStyle(ss[1], e.type);
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
        eles.push({ text: x, style: {}, type: PEType.span });
      }
    })
    return eles;
  }
  //${名称|color:red;background:green;font-weight:bold;}
  // [名称|cg,fl,fb] cr/cg/cb [名称|sub] [名称|sup]
  private onParseStyle(msg: string, type: PEType): any {
    let style: LooseObject = {};
    if (!msg || type != PEType.span) return style;
    msg = msg.replace('，', ',').replace('：', ':').replace(' ', '');
    const widgets = msg.split(',');
    if (!widgets) return style;
    widgets.forEach(x => {
      // if (x && x.indexOf(':') > 0) {
      //   const ts = x.split(':');
      //   if (ts.length >= 2) style[`${ts[0]}`] = ts[1];
      // }
      switch (x) {
        case 'fl':
          style[`text-decoration`] = 'underline';
          style[`text-underline-offset`] = '0.25rem';
          break;
        case 'fb':
          style[`font-weight`] = 'bold';
          break;
        case 'cr':
          style[`color`] = 'red';
          style[`font-weight`] = 'bold';
          break;
        case 'cg':
          style[`color`] = 'limegreen';
          style[`font-weight`] = 'bold';
          break;
        case 'cb':
          style[`color`] = 'deepskyblue';
          style[`font-weight`] = 'bold';
          break;
        default:
          break;
      }
    });
    console.log(type, widgets)
    return style;
  }
}
