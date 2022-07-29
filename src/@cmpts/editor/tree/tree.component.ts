import { Component, Input, OnInit } from '@angular/core';
import { DocumentNode, DocumentNodeType, EditorService } from '../editor.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() nodes: DocumentNode[] = [];
  NodeType = DocumentNodeType;
  Headlines = [DocumentNodeType.h2, DocumentNodeType.h3, DocumentNodeType.h4, DocumentNodeType.h5, DocumentNodeType.h6]

  constructor(public service: EditorService) { }

  ngOnInit() {
    this.nodes.forEach(x => {
      x.open = false;
    })
  }

  toggle(node: DocumentNode, event: any) {
    node.open = !node.open;
    event.stopPropagation();
  }

  onClicked(node: DocumentNode) {
    this.service.selectedNode = node;
    this.service.selectNode(node);
    node.notify('');
  }

  onDragStart(node: DocumentNode, event: DragEvent) {
    this.service.dragNode = node;
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDrop(node: DocumentNode, event: any) {
    this.service.dropToNode(node);
  }

}
