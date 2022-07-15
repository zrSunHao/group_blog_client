import { Component, Input, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-quote',
  templateUrl: './editor-quote.component.html',
  styleUrls: ['./editor-quote.component.scss']
})
export class EditorQuoteComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
