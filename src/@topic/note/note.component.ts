import { Component, OnInit } from '@angular/core';
import { DocumentNode, DocumentNodeType, EditorService } from 'src/@cmpts/editor/editor.service';
import { GetDocumentData } from 'src/@cmpts/editor/help';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  nodes: DocumentNode[] = GetDocumentData();

  public constructor(public serv: EditorService) {
    serv.nodes = this.nodes;
    serv.editEnable(false);
    setTimeout(() => {
      for (const item of this.nodes) {
        if (serv.Headlines.indexOf(item.type) != -1) item.open = true;
      }
    }, 100);
  }

  ngOnInit() {
  }

  onEditEnable() {
    this.serv.editEnable(true);
  }

  onAddH2() {
    let h2 = this.serv.nodeFactory(DocumentNodeType.h2);
    h2.content = '新标题';
    this.serv.nodes.push(h2);
  }

  onTempSave() {

  }

  onSave() {
    this.serv.editEnable(false);
  }

  onBackClick() {
    history.back();
  }

}
