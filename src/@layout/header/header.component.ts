import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

export class PageElement {
  name: string = '';
  icon: string = '';
  checked: boolean = false;
  address: string = '';
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: string = 'zhangsan';
  pages: PageElement[] = [
    { name: '专栏', icon: 'dashboard', checked: true, address: 'blog' },
    { name: '用户管理', icon: 'group', checked: false, address: 'group' },
  ];

  constructor(private router: Router,
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        for (const page of this.pages) {
          if (this.router.url.indexOf(page.address) == 1) page.checked = true;
          else page.checked = false;
        }
      });
  }

  onGroupPage() {
    this.router.navigate(['group']);
  }

  onMainrPage() {
    this.router.navigate(['column']);
  }

  onPsdReset(): void {

  }

  onLogoutClick(): void {
    // this.hostServ.logout().subscribe({
    //   next: res => {
    //     this.hostServ.clear();
    //     this.router.navigate(['/security/login']);
    //   },
    //   error: err => {
    //     this.hostServ.clear();
    //     this.router.navigate(['/security/login']);
    //   }
    // })
  }

}
