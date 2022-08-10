import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { AuthService, AUTH_KEY, LoginM, LoginRes } from '../auth.service';
import { NotifyService } from 'src/@shared/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router,
    private notifyServ: NotifyService,
    private hostServ: AuthService) {
    this.form = new FormGroup({
      userName: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]{5,15}$/)]),
      password: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
    });
  }

  ngOnInit() {
    const json = localStorage.getItem(AUTH_KEY);
    if (json) {
      const res = JSON.parse(json) as LoginRes;
      if (res) this.router.navigate(['/']);
    }
  }

  login(): void {
    const dto: LoginM = { userName: '', password: '' };
    dto.password = this.form.controls['password'].value;
    dto.userName = this.form.controls['userName'].value;
    this.hostServ.login(dto).subscribe({
      next: res => {
        if (res.success) {
          const loginRes = res.data as LoginRes;
          localStorage.setItem(AUTH_KEY, JSON.stringify(loginRes));
          //window.location.reload();
          this.router.navigate(['/']);
        } else {
          const msg = `登录失败！！！ ${res.allMessages}`;
          this.notifyServ.notify(msg, 'error');
        }
      },
      error: err => {
        const msg = `登录失败！！！ ${err}`;
        this.notifyServ.notify(msg, 'error');
      }
    });
  }
}
