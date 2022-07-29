import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  message: string = '';

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,) {
    this.message = data;
  }

  ngOnInit() {
    console.log(this.message);
  }

  onAgreeClick(): void {
    this.dialogRef.close('yes');
  }

  onCloseClick(): void {
    this.dialogRef.close('no');
  }

}
