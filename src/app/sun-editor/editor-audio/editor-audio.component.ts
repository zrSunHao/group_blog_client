import { Component, Input, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-audio',
  templateUrl: './editor-audio.component.html',
  styleUrls: ['./editor-audio.component.scss']
})
export class EditorAudioComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
