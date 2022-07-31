import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResetDto } from 'src/@shared/models/paging.model';

@Component({
  selector: 'app-dialog-reset',
  templateUrl: './dialog-reset.component.html',
  styleUrls: ['./dialog-reset.component.scss']
})
export class DialogResetComponent implements OnInit {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogResetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResetDto,) {
    this.form = new FormGroup({
      oldPsd: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
      newPsd: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
      confirmPsd: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
    });
  }

  ngOnInit() {
  }

  onSaveClick(): void {
    const oldPsd = this.form.controls['oldPsd'].value;
    const newPsd = this.form.controls['newPsd'].value;
    // this.hostServ.reset(oldPsd, newPsd).subscribe({
    //   next: res => {
    //     if (res.success) {
    //       this.dialogRef.close({ op: 'save', newPsd: this.form.controls['newPsd'].value });
    //     } else {
    //       const msg = `重置密码失败！！！ ${res.allMessages}`;
    //       this.notifyServ.notify(msg, 'error');
    //     }
    //   },
    //   error: err => {
    //     const msg = `重置密码失败！！！ ${err}`;
    //     this.notifyServ.notify(msg, 'error');
    //   }
    // });
  }

  onCloseClick(): void {
    this.dialogRef.close({ op: 'close' });
  }

}
