import { Component, Input, OnInit } from '@angular/core';
import { DocumentNode, DocumentNodeType } from 'src/@cmpts/editor/editor.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {

  nodeType = DocumentNodeType;
  @Input() nodes: DocumentNode[] = [];

  constructor() { }

  ngOnInit() {
  }

}
