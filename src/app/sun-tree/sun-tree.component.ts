import { Component, Input, OnInit } from '@angular/core';
import { TreeNode, TreeService } from './tree.service';

@Component({
  selector: 'app-sun-tree',
  templateUrl: './sun-tree.component.html',
  styleUrls: ['./sun-tree.component.scss']
})
export class SunTreeComponent implements OnInit {

  @Input() nodes: TreeNode[] = [];

  constructor(public service: TreeService) { }

  ngOnInit() {
  }

  toggle(node: TreeNode, event: any) {
    node.open = !node.open;
    event.stopPropagation();
    this.service.toggleNode(node);
  }

  onClicked(node: TreeNode) {
    this.service.selectedNode = node;
    this.service.selectNode(node);
  }

  onDragStart(node: TreeNode, event: DragEvent) {
    this.service.dragNode = node;
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDrop(node: TreeNode, event: any) {
    this.service.dropToNode(node);
  }
}
