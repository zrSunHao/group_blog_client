import { Component, Input, OnInit } from '@angular/core';
import { DocumentNode, EditorService } from '../editor.service';

@Component({
  selector: 'app-editor-tree',
  templateUrl: './editor-tree.component.html',
  styleUrls: ['./editor-tree.component.scss']
})
export class EditorTreeComponent implements OnInit {

  @Input() node: DocumentNode[] = [];

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
