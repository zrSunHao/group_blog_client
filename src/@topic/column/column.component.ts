import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onNoteClick(note: any) {
    this.router.navigate(['topic/note']);
  }

  onBackClick(){
    console.log(1111111)
    this.router.navigate(['topic/']);
  }

}
