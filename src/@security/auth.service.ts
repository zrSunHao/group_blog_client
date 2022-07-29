import { Injectable } from '@angular/core';

export class LoginDto {
  userName: string = '';
  password: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

}
