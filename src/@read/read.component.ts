import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentNode, EditorService } from 'src/@cmpts/editor/editor.service';
import { GetDocumentData } from 'src/@cmpts/editor/help';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  star: boolean = false;
  nodes: DocumentNode[] = GetDocumentData();

  public constructor(public serv: EditorService,private router: Router) {
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

  onFavoriteClick() {
    this.star = true;
  }

  onCancelClick() {
    this.star = false;
  }

  onPrintClick() {
    this.router.navigate(['report']);
  }

  onBackClick() {
    history.back();
  }

}
