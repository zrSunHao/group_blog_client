import { Component } from '@angular/core';
import { DOCUMENT_DATA, GetDocumentData } from './help';
import { DocumentNode, DocumentNodeType, EditorService } from './sun-editor/editor.service';
import { TREENODES } from './sun-tree/model';
import { TreeNode, TreeService } from './sun-tree/tree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog-app';
  nodes: TreeNode[] = TREENODES;
  items: DocumentNode[] = GetDocumentData();

  public constructor(public service: TreeService, public serv: EditorService) {
    this.service.nodes = this.nodes;
    this.service.onMove.subscribe({ next: (node: TreeNode) => { console.log(node) }, error: (err: any) => { console.log(err) } })
    this.service.onSelected.subscribe({ next: (node: TreeNode) => { console.log(node) }, error: (err: any) => { console.log(err) } })
    serv.nodes = this.items;
    setTimeout(() => {
      for (const item of this.items) {
        if (serv.Headlines.indexOf(item.type) != -1) item.open = true;
      }
    }, 100);

  }

  onAddNode() {
    this.service.addNode();
  }
  onUpdateNode() {
    this.service.updateNode();
  }
  onDeleteNode() {
    try {
      this.service.removeNode();
    } catch (error) {
      console.error(error);
    }
  }
}

