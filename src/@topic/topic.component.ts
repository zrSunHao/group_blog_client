import { Component, OnInit } from '@angular/core';
import { DocumentNode, EditorService } from 'src/@cmpts/editor/editor.service';
import { GetDocumentData } from 'src/@cmpts/editor/help';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  nodes: DocumentNode[] = GetDocumentData();

  public constructor(public serv: EditorService) {
    serv.nodes = this.nodes;
    setTimeout(() => {
      for (const item of this.nodes) {
        if (serv.Headlines.indexOf(item.type) != -1) item.open = true;
      }
    }, 100);

  }

  ngOnInit() {
  }

}
