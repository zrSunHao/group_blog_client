import { EventEmitter, Injectable } from '@angular/core';

export enum DocumentNodeType {
  h2 = 2,
  h3 = 3,
  h4 = 4,
  h5 = 5,
  h6 = 6,
  p = 10,
  img = 11,
  list = 12,
  code = 13,
  link = 14,
  quote = 15,
  table = 16,
  audio = 17,
  video = 18,
  file = 19,
  other = 0,
}

export interface LooseObject {
  [key: string]: string
}

interface NodeCallback {
  (message: string): void;
}

export class DocumentNode {
  type: DocumentNodeType = DocumentNodeType.other;
  content: string = '';
  url: string = '';
  remark: string = '';
  order: number = 1;
  data: LooseObject = {};
  open: boolean = false;
  children: DocumentNode[] = [];

  constructor(type: DocumentNodeType = DocumentNodeType.other, content: string = '', url: string = '', data: LooseObject = {}) {
    this.type = type;
    this.content = content;
    this.url = url;
    this.data = data;
  }

  private callback: NodeCallback | undefined;
  call(callback: NodeCallback): void {
    this.callback = callback;
  }

  //外部调用回调函数
  public notify(msg: string) {
    if (this.callback) this.callback(msg);
  }

}

export class DocumentLinkNode {
  name: string = '';
  url: string = '';
}

export enum DocumentOperateType {
  edit = 1,
  copy = 2,
  paste = 3,
  delete = 4,
  dialog = 10,
  upload = 11,
  download = 12,
  other = 0,
}

export class NodeTypeItem {
  type: DocumentNodeType = DocumentNodeType.other;
  name: string = '';
  icon: string = '';
}

export class OperateItem {
  type: DocumentOperateType = DocumentOperateType.other;
  name: string = '';
  icon: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  public nodes: DocumentNode[] = [];
  public selectedNode: DocumentNode | null = null;
  public dragNode: DocumentNode | null = null;
  public NodeType = DocumentNodeType;
  public Headlines = [DocumentNodeType.h2, DocumentNodeType.h3, DocumentNodeType.h4, DocumentNodeType.h5, DocumentNodeType.h6]

  onMove: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();
  onToggle: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();
  onSelected: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();

  constructor() { }

  public selectNode(node: DocumentNode) {
    this.selectedNode = node;
    this.onSelected.emit(node);
  }

  /**
   * 移动结点
   * h系列元素不能改变层级
   * @param node 
   * @returns 
   */
  public dropToNode(node: DocumentNode) {
    if (!this.dragNode || this.dragNode == node) return;
    this.remove(this.dragNode, this.nodes)
    this.onMove.emit(this.dragNode);
  }

  public getNodeParent(child: DocumentNode): DocumentNode | null {
    let parent: DocumentNode | null = null;
    for (const node of this.nodes) {
      if (node == child) break;
      this.getParent(child, node, parent);
      if (parent) break;
    }
    return parent;
  }

  private getParent(child: DocumentNode, current: DocumentNode, parent: DocumentNode | null = null) {
    if (!current.children) return;
    if (current.children.indexOf(child) != -1) {
      parent = current;
      return;
    } else {
      for (const node of current.children) this.getParent(child, node, parent);
    }
  }

  private remove(target: DocumentNode, nodes: DocumentNode[]) {
    if (!nodes || nodes.length < 1) return;
    nodes.forEach((x, idx) => {
      if (x == target) {
        nodes.splice(idx, 1);
        if (this.selectedNode == target) this.selectedNode = null;
        return;
      } else this.remove(target, x.children)
    });
  }



}
