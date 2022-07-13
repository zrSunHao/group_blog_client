import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-quote',
  templateUrl: './editor-quote.component.html',
  styleUrls: ['./editor-quote.component.scss']
})
export class EditorQuoteComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
