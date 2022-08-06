import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResetDto } from 'src/@shared/models/paging.model';
import { NotifyService } from 'src/@shared/services/notify.service';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-dialog-reset',
  templateUrl: './dialog-reset.component.html',
  styleUrls: ['./dialog-reset.component.scss']
})
export class DialogResetComponent implements OnInit {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogResetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResetDto,
    private notifyServ: NotifyService,
    private hostServ: GroupService) {
    this.form = new FormGroup({
      newPsd: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
      confirmPsd: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
    });
  }

  ngOnInit() {
  }

  onSaveClick(): void {
    this.data.newPsd = this.form.controls['newPsd'].value;
    this.hostServ.reset(this.data).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`重置账号[${this.data.userName}]密码成功！！！`, 'success');
          this.dialogRef.close({ op: 'save' });
        } else {
          const msg = `重置账号[${this.data.userName}]密码失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `重置账号[${this.data.userName}]密码失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  onCloseClick(): void {
    this.dialogRef.close({ op: 'close' });
  }

}
