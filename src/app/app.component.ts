import { Component } from '@angular/core';
import { DOCUMENT_DATA } from './help';
import { DocumentNode, DocumentNodeType } from './sun-editor/editor.service';
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
  items: DocumentNode[] = DOCUMENT_DATA;

  public constructor(public service: TreeService) {
    this.service.nodes = this.nodes;
    this.service.onMove.subscribe({ next: (node: TreeNode) => { console.log(node) }, error: (err: any) => { console.log(err) } })
    this.service.onSelected.subscribe({ next: (node: TreeNode) => { console.log(node) }, error: (err: any) => { console.log(err) } })
  }

  save() {

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

