import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

import { AuthService, LoginDto } from '../auth.service';
import { NotifyService } from 'src/@shared/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(private router: Router,
    private notifyServ: NotifyService,
    private hostServ: AuthService) {
    this.form = new UntypedFormGroup({
      userName: new UntypedFormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]{5,15}$/)]),
      password: new UntypedFormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
    });
  }

  ngOnInit() {
  }

  login(): void {
    const dto: LoginDto = { userName: '', password: ''};
    dto.password = this.form.controls['password'].value;
    dto.userName = this.form.controls['userName'].value;
    
  }



}
