import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

  constructor(private router: Router,
  ) { }

  ngOnInit() {
  }

  confirm(): void {
    this.router.navigateByUrl('/security/login/');
  }

}
