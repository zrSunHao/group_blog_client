import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onNoteClick(note: any) {
    this.router.navigate(['topic/note']);
  }

}
