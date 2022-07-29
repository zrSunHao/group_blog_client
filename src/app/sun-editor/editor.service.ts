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
  public Headlines = [DocumentNodeType.h2, DocumentNodeType.h3, DocumentNodeType.h4, DocumentNodeType.h5, DocumentNodeType.h6];
  public canBack: boolean = false;
  private BackupCount = 5;
  private BackupKeyPrefix = 'editor_backup_';
  private BackupKeys: string[] = [];

  onToggle: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();
  onSelected: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();

  constructor() {
    for (let index = 0; index < this.BackupCount; index++) {
      this.BackupKeys.push(`${this.BackupKeyPrefix}${index + 1}`)
    }
    for (const key of this.BackupKeys) {
      localStorage.removeItem(key);
    }
  }

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
  public dropToNode(dropNode: DocumentNode) {
    if (!this.dragNode || this.dragNode == dropNode) return;

    const dragParent = this.getNodeParent(this.dragNode);
    const dropParent = this.getNodeParent(dropNode);
    // case 1：托h 放h 若在同一个父h之下，托h置于放h之后
    if (this.Headlines.indexOf(this.dragNode.type) != -1 && this.Headlines.indexOf(dropNode.type) != -1) {
      if (dragParent != dropParent) return;
      this.backup();
      if (!dropParent) {
        this.nodes = this.nodes.filter(x => x != this.dragNode);
        let index = this.nodes.indexOf(dropNode);
        this.nodes.splice(index + 1, 0, this.dragNode);
      } else {
        if (dragParent) dragParent.children = dragParent.children.filter(x => x != this.dragNode);
        let index = dropParent.children.indexOf(dropNode);
        dropParent.children.splice(index + 1, 0, this.dragNode);
      }
      return;
    }

    // case 2：托e 放h 托e置于放h子元素集合最后
    if (this.Headlines.indexOf(this.dragNode.type) == -1 && this.Headlines.indexOf(dropNode.type) != -1) {
      this.backup();
      if (dragParent) dragParent.children = dragParent.children.filter(x => x != this.dragNode);
      dropNode.children.push(this.dragNode);
      return;
    }

    // case 3：托e 放e 托e置于放e之后
    if (this.Headlines.indexOf(this.dragNode.type) == -1 && this.Headlines.indexOf(dropNode.type) == -1) {
      this.backup();
      if (dragParent) dragParent.children = dragParent.children.filter(x => x != this.dragNode);
      if (dropParent) {
        let index = dropParent.children.indexOf(dropNode);
        dropParent.children.splice(index + 1, 0, this.dragNode);
      }
      return;
    }
  }

  public getNodeParent(child: DocumentNode): DocumentNode | null {
    let parent: DocumentNode | null = null;
    for (const node of this.nodes) {
      if (node == child) break;
      parent = this.getParent(child, node);
      if (parent) break;
    }
    return parent;
  }

  // 备份数据
  public backup() {
    let index = 1;
    for (const key of this.BackupKeys) {
      if (index == this.BackupKeys.length) {
        const json = JSON.stringify(this.nodes);
        localStorage.setItem(`${this.BackupKeyPrefix}${index}`, json);
        break;
      }
      const up = localStorage.getItem(`${this.BackupKeyPrefix}${index + 1}`);
      if (up) localStorage.setItem(`${this.BackupKeyPrefix}${index}`, up);
      index++;
    }
    this.canBack = true;
  }

  // 回退数据
  public fallback() {
    const json = localStorage.getItem(`${this.BackupKeyPrefix}${this.BackupCount}`);
    if (!json) {
      this.canBack = false;
      return;
    }
    let data = JSON.parse(json) as DocumentNode[];
    this.nodes = [];
    this.nodes = this.convertNodes(data);
    for (let index = this.BackupKeys.length; index > 0; index--) {
      if (index == 1) localStorage.removeItem(`${this.BackupKeyPrefix}1`)
      const down = localStorage.getItem(`${this.BackupKeyPrefix}${index - 1}`);
      if (!down) localStorage.removeItem(`${this.BackupKeyPrefix}${index}`);
      else localStorage.setItem(`${this.BackupKeyPrefix}${index}`, down);
    }
  }

  public convertNodes(nodes: DocumentNode[]): DocumentNode[] {
    const values: DocumentNode[] = [];
    for (const node of nodes) {
      const ch = this.parse(node);
      values.push(ch);
    }
    return values;
  }

  public nodeFactory(type: DocumentNodeType): DocumentNode {
    let node = new DocumentNode(type);
    node.data = {};
    if (type == DocumentNodeType.img) node.data = { height: '20rem', position: 'center' };
    if (type == DocumentNodeType.table) node.data = { position: 'center' };
    node.children = [];
    return node;
  }

  public insertNode(preNode: DocumentNode, node: DocumentNode) {
    this.backup();
    const parent = this.getNodeParent(preNode);
    if (!parent && node.type == DocumentNodeType.h2) {
      const index = this.nodes.indexOf(preNode);
      if (index != -1) this.nodes.splice(index + 1, 0, node);
    }
    if (parent) {
      const index = parent.children.indexOf(preNode);
      if (index != -1) parent.children.splice(index + 1, 0, node);
    }
  }

  public insertNotHeadPeerNode(preNode: DocumentNode, nodeType: DocumentNodeType) {
    const node = this.nodeFactory(nodeType);
    this.insertNode(preNode, node);
  }

  public removeNode(node: DocumentNode) {
    const parent = this.getNodeParent(node);
    this.backup();
    if (!parent) {
      this.nodes = this.nodes.filter(x => x != node);
    } else {
      parent.children = parent.children.filter(x => x != node);
    }
  }

  private getParent(child: DocumentNode, current: DocumentNode): DocumentNode | null {
    if (!current.children) return null;
    if (current.children.indexOf(child) != -1) {
      return current;
    } else {
      let parent: DocumentNode | null = null;
      for (const node of current.children) {
        parent = this.getParent(child, node);
        if (parent) return parent;
      }
      return null;
    }
  }

  private parse(node: DocumentNode): DocumentNode {
    const value = this.convertNotChild(node);
    let children: DocumentNode[] = [];
    for (const item of node.children) {
      const ch = this.parse(item);
      children.push(ch);
    }
    value.children = children;
    return value;
  }

  private convertNotChild(node: DocumentNode): DocumentNode {
    let data = new DocumentNode();
    data.content = node.content;
    data.open = node.open;
    data.type = node.type;
    data.url = node.url;
    data.remark = node.remark;
    data.order = node.order;
    data.data = node.data;
    data.children = [];
    return data;
  }
}
