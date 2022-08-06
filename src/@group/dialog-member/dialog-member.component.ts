import { OptionItem, RoleType } from 'src/@shared/models/paging.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyService } from 'src/@shared/services/notify.service';
import { GroupService } from '../group.service';
import { UserElet } from '../model';

@Component({
  selector: 'app-dialog-member',
  templateUrl: './dialog-member.component.html',
  styleUrls: ['./dialog-member.component.scss']
})
export class DialogMemberComponent implements OnInit {

  form: FormGroup;
  roleOps: OptionItem[] = [
    { key: RoleType.odinary, value: '普通用户' },
    { key: RoleType.manager, value: '管理员' },
    { key: RoleType.superManager, value: '超级管理员' },
  ];


  constructor(
    private dialogRef: MatDialogRef<DialogMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserElet,
    private notifyServ: NotifyService,
    private hostServ: GroupService) {
    this.form = new FormGroup({
      role: new FormControl<RoleType>(RoleType.odinary, [Validators.required,]),
      limited: new FormControl<boolean>(false, [Validators.required,]),
      remark: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(256)]),
    });
  }

  ngOnInit() {
    this.form.controls['role'].setValue(this.data.role);
    this.form.controls['limited'].setValue(this.data.limited);
    this.form.controls['remark'].setValue(this.data.remark);
  }

  onSaveClick(): void {
    this.data.role = this.form.controls['role'].value;
    this.data.limited = this.form.controls['limited'].value;
    this.data.remark = this.form.controls['remark'].value;
    this.hostServ.update(this.data).subscribe({
      next: res => {
        if (res.success) {
          this.notifyServ.notify(`更新账号[${this.data.userName}]信息成功！！！`, 'success');
          this.dialogRef.close({ op: 'save' });
        } else {
          const msg = `更新账号[${this.data.userName}]信息失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `更新账号[${this.data.userName}]信息失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

  onCloseClick(): void {
    this.dialogRef.close({ op: 'close' });
  }


}
