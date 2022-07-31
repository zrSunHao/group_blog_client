import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-domain',
  templateUrl: './dialog-domain.component.html',
  styleUrls: ['./dialog-domain.component.scss']
})
export class DialogDomainComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogDomainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }

}
