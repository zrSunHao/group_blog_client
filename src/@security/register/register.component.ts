import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from 'src/@shared/services/notify.service';
import { AuthService, LoginM, LoginRes } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private router: Router,
    private notifyServ: NotifyService,
    private hostServ: AuthService,) {
    this.form = new FormGroup({
      userName: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]{5,15}$/)]),
      password: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
      confirmPsd: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
    })
  }

  ngOnInit() {
  }

  register(): void {
    const dto: LoginM = { userName: '', password: '' };
    dto.userName = this.form.controls['userName'].value;
    dto.password = this.form.controls['password'].value;
    this.hostServ.register(dto).subscribe({
      next: res => {
        if (res.success) {
          const msg = `注册成功！！！`;
          this.notifyServ.notify(msg, 'success');
          this.router.navigate(['/security/login']);
        } else {
          const msg = `注册失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `注册失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }

}
