import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FileCategory } from 'src/@resource/model';
import { AUTH_KEY, LoginRes } from 'src/@security/auth.service';
import { ResponseResult } from 'src/@shared/models/paging.model';
import { environment } from 'src/environments/environment';

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

  public nodes: DocumentNode[] = []; // 初始化时须外部赋值
  public noteId: string = ''; // 初始化时须外部赋值
  public selectedNode: DocumentNode | null = null;
  public canEdit: boolean = true;
  public printMode: boolean = false;
  public dragNode: DocumentNode | null = null;
  public NodeType = DocumentNodeType;
  public Headlines = [DocumentNodeType.h2, DocumentNodeType.h3, DocumentNodeType.h4, DocumentNodeType.h5, DocumentNodeType.h6];

  onToggle: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();
  onSelected: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();

  public fileBaseUrl: string = '';
  private resourceUrl = environment.hostUrl + 'resource';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(public http: HttpClient) {
  }

  public init() {
    let key: string = '';
    const json = localStorage.getItem(AUTH_KEY);
    if (json) {
      const res = JSON.parse(json) as LoginRes;
      if (res) key = res.key;
    }
    this.fileBaseUrl = `${this.resourceUrl}/GetFileByName?key=${key}&name=`;
  }

  public getUserName(): string {
    const json = localStorage.getItem(AUTH_KEY);
    if (!json) return ''
    const res = JSON.parse(json) as LoginRes;
    if (res) return res.userName;
    else return ''
  }

  public opened(noteId: string) {
    this.fileBaseUrl = `${this.resourceUrl}/GetNoteFileByName?noteId=${noteId}&name=`;
  }

  public editEnable(enable: boolean) {
    this.canEdit = enable;
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
    if (!this.canEdit || !this.dragNode || this.dragNode == dropNode) return;

    const dragParent = this.getNodeParent(this.dragNode);
    const dropParent = this.getNodeParent(dropNode);
    // case 1：托h 放h 若在同一个父h之下，托h置于放h之后
    if (this.Headlines.indexOf(this.dragNode.type) != -1 && this.Headlines.indexOf(dropNode.type) != -1) {
      if (dragParent != dropParent) return;
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

    // case 2：托h 放e 若在同一个父h之下，托h置于放e之后
    if (this.Headlines.indexOf(this.dragNode.type) != -1 && this.Headlines.indexOf(dropNode.type) == -1) {
      if (!dragParent || !dropParent) return;
      if (dragParent != dropParent) return;
      dragParent.children = dragParent.children.filter(x => x != this.dragNode);
      let index = dropParent.children.indexOf(dropNode);
      dropParent.children.splice(index + 1, 0, this.dragNode);
    }

    // case 3：托e 放h 托e置于放h子元素集合最后
    if (this.Headlines.indexOf(this.dragNode.type) == -1 && this.Headlines.indexOf(dropNode.type) != -1) {
      if (dragParent) dragParent.children = dragParent.children.filter(x => x != this.dragNode);
      dropNode.children.push(this.dragNode);
      return;
    }

    // case 4：托e 放e 托e置于放e之后
    if (this.Headlines.indexOf(this.dragNode.type) == -1 && this.Headlines.indexOf(dropNode.type) == -1) {
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
    if (!this.canEdit) return;
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
    if (!this.canEdit) return;
    const node = this.nodeFactory(nodeType);
    this.insertNode(preNode, node);
  }

  public removeNode(node: DocumentNode) {
    if (!this.canEdit) return;
    const parent = this.getNodeParent(node);
    if (!parent) {
      this.nodes = this.nodes.filter(x => x != node);
    } else {
      parent.children = parent.children.filter(x => x != node);
    }
  }



  public uploadfile(ownerId: string, category: FileCategory, formData: FormData): Observable<ResponseResult<string>> {
    const url = `${this.resourceUrl}/Save?ownerId=${ownerId}&category=${category}`;
    return this.http.post<ResponseResult<string>>(url, formData)
      .pipe(catchError(this.handleError));
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



  private handleError(error: HttpErrorResponse) {
    const msg = `${error.status}  ${error.message}`
    return throwError(() => msg);
  }
}
