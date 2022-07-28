import { Component, Input, OnInit } from '@angular/core';
import { DocumentNodeType } from '../editor.service';

@Component({
  selector: 'app-operate',
  templateUrl: './operate.component.html',
  styleUrls: ['./operate.component.scss']
})
export class OperateComponent implements OnInit {

  @Input() nodeType: DocumentNodeType = DocumentNodeType.other;
  DocumentNodeType = DocumentNodeType;

  constructor() { }

  ngOnInit() {
  }

}
