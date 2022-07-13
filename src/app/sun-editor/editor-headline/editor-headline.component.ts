import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-headline',
  templateUrl: './editor-headline.component.html',
  styleUrls: ['./editor-headline.component.scss']
})
export class EditorHeadlineComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
