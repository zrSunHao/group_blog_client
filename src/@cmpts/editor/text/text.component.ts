import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DocumentNode, DocumentNodeType, EditorService } from '../editor.service';

export interface Command {
  key: string;
  value: string | null;
}

export interface Operate {
  name: string;
  commands: Command[];
}

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() node: DocumentNode = new DocumentNode();
  status = false
  operates: Operate[] = [
    { name: '红色', commands: [{ key: 'foreColor', value: 'red' }] },
    { name: '绿色', commands: [{ key: 'foreColor', value: 'limegreen' }] },
    { name: '蓝色', commands: [{ key: 'foreColor', value: 'deepskyblue' }] },
    { name: '橙色', commands: [{ key: 'foreColor', value: 'orange' }] },
    { name: '加粗', commands: [{ key: 'bold', value: null }] },
    { name: '倾斜', commands: [{ key: 'italic', value: null }] },
    { name: '大字', commands: [{ key: 'fontSize', value: '4' }] },
    { name: '下划线', commands: [{ key: 'underline', value: null }] },
    { name: '上角标', commands: [{ key: 'superscript', value: null }] },
    { name: '下角标', commands: [{ key: 'subscript', value: null }] },
    { name: '刷', commands: [{ key: 'foreColor', value: 'silver' }, { key: 'fontSize', value: '3' }] },
  ]

  @ViewChild('text', { static: false })
  editor!: ElementRef;
  nodeType = DocumentNodeType;

  constructor(public service: EditorService) { }

  ngOnInit() {
    this.node.call((msf: string) => {
      if (this.editor) this.editor.nativeElement.scrollIntoView();
    })
  }

  ngAfterViewInit() {
    this.editor.nativeElement.innerHTML = this.node.content;
    this.editor.nativeElement.addEventListener("paste", (e: any) => {
      // cancel paste
      e.preventDefault();
      // get text representation of clipboard
      var text = (e.originalEvent || e).clipboardData.getData('text/plain');
      // insert text manually
      document.execCommand("insertHTML", false, text);
    });
    setInterval(() => {
      if (this.status) this.node.content = this.editor.nativeElement.innerHTML;
    }, 500)
  }

  onSetStatus(op: boolean): void {
    if (!this.service.canEdit) return;
    if (op) {
      this.editor.nativeElement.contentEditable = "true";
      this.editor.nativeElement.focus();
      this.status = op;
    } else {
      this.editor.nativeElement.contentEditable = "false";
      this.status = op;
      this.node.content = this.editor.nativeElement.innerHTML;
    }

  }

  onOperate(event: any, op: Operate) {
    event.preventDefault && event.preventDefault();
    this.editor.nativeElement.focus();
    op.commands.forEach(cmd => {
      if (cmd.value) document.execCommand(cmd.key, false, cmd.value);
      else document.execCommand(cmd.key, false);
    });
  }

}
