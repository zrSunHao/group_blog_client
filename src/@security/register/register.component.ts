import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from 'src/@shared/services/notify.service';
import { AuthService, LoginDto } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: UntypedFormGroup;
  constructor(private router: Router,
    private notifyServ: NotifyService,
    private hostServ: AuthService,) {
    this.form = new UntypedFormGroup({
      userName: new UntypedFormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]{5,15}$/)]),
      password: new UntypedFormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
      confirmPsd: new UntypedFormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,17}$/)]),
    })
  }

  ngOnInit() {
  }

  register(): void {
    const dto: LoginDto = { userName: '', password: ''};
    dto.userName = this.form.controls['userName'].value;
    dto.password = this.form.controls['password'].value;
  }

}
