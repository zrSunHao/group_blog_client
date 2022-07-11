import { EventEmitter, Injectable } from '@angular/core';

export class TreeNode {
  id: string = '';
  name: string = 'node';
  children: TreeNode[] = [];
  parentId: string | null = '';
  open: boolean = false;
  data: any | null = null;
}

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor() { }

  nodes: TreeNode[] = [];
  selectedNode: TreeNode | null = null;
  dragNode: TreeNode | null = null;
  index: number = 10;

  onMove: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  onToggle: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  onSelected: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  addNode() {
    const id = this.index.toString();
    this.index++;
    const node = { id: id, name: `node-${id}`, open: false, data: null, children: [], parentId: '' };
    if (this.selectedNode) {
      node.parentId = this.selectedNode.id;
      this.selectedNode.children = [...this.selectedNode.children, node];
      this.selectedNode.children.sort((one, two) => (one.name.localeCompare(two.name)));
      this.selectedNode.open = true;
    }
    else this.nodes.push(node);
  }

  updateNode() {
    if (this.selectedNode) {
      this.selectedNode.name = `修改 - ${this.index}`;
      this.index++;
      //父结点的子结点排序
    }
  }

  removeNode() {
    if (!this.selectedNode) throw ('未选择要删除的结点！');
    else this.remove(this.selectedNode, this.nodes);
  }

  selectNode(node: TreeNode) {
    this.selectedNode = node;
    this.onSelected.emit(node);
  }

  toggleNode(node: TreeNode) {
    this.onToggle.emit(node);
  }

  dropToNode(node: TreeNode) {
    if (this.dragNode && this.dragNode.parentId != node.id) {
      const children: TreeNode[] = [];
      this.getAllChildren(this.dragNode, children);
      if (children.indexOf(node) != -1) return; // 判断是否是其子孙节点

      this.remove(this.dragNode, this.nodes)
      this.dragNode.parentId = node.id;
      this.dragNode.open = false;
      node.children.push(this.dragNode);
      node.children.sort((one, two) => (one.name.localeCompare(two.name)));
      node.open = true;

      this.onMove.emit(this.dragNode);
    }
  }

  private remove(target: TreeNode, nodes: TreeNode[]) {
    if (!nodes || nodes.length < 1) return;
    nodes.forEach((x, idx) => {
      if (x.id === target.id) {
        nodes.splice(idx, 1);
        this.selectedNode = null;
        return;
      } else this.remove(target, x.children)
    });
  }

  private getAllChildren(node: TreeNode, all: TreeNode[]) {
    if (!node.children || node.children.length < 1) return;
    node.children.forEach(x => {
      all.push(x);
      this.getAllChildren(x, all);
    })
  }

}
