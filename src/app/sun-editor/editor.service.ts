import { Injectable } from '@angular/core';

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

export class DocumentNode {
  type: DocumentNodeType = DocumentNodeType.other;
  content: string = '';
  url: string = '';
  remark: string = '';
  children: DocumentNode[] = [];
}

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor() { }

}
