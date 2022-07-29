import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-icon-snack-bar',
  templateUrl: './icon-snack-bar.component.html',
  styleUrls: ['./icon-snack-bar.component.scss']
})
export class IconSnackBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
