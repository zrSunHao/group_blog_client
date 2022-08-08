import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NotifyService } from 'src/@shared/services/notify.service';
import { DialogResetComponent } from '../dialog-reset/dialog-reset.component';
import { ResetDto, RoleType } from 'src/@shared/models/paging.model';
import { AuthService, AUTH_KEY, LoginRes } from 'src/@security/auth.service';

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

  userName: string = 'zhanghao';
  pages: PageElement[] = [
    { name: '组内分享', icon: 'school', checked: true, address: 'blog' },
    { name: '笔记管理', icon: 'widgets', checked: false, address: 'topic' },
    { name: '我的收藏', icon: 'star', checked: false, address: 'star' },
    { name: '文件查询', icon: 'dashboard', checked: false, address: 'resource' },
  ];

  constructor(private router: Router,
    private dialog: MatDialog,
    private notifyServ: NotifyService,
    private hostServ: AuthService) {
  }

  ngOnInit() {
    const json = localStorage.getItem(AUTH_KEY);
    if (json) {
      const res = JSON.parse(json) as LoginRes;
      if (res) this.userName = res.userName;
      if (res && (res.role == RoleType.manager || res.role == RoleType.superManager)) {
        this.pages.push({ name: '用户管理', icon: 'group', checked: false, address: 'group' },);
      }
    }
    for (const page of this.pages) {
      if (this.router.url.indexOf(page.address) == 1) page.checked = true;
      else page.checked = false;
    }
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        for (const page of this.pages) {
          if (this.router.url.indexOf(page.address) == 1) page.checked = true;
          else page.checked = false;
        }
      });
  }

  onSkipPage(address: string) {
    this.router.navigate([address]);
  }

  onPsdReset(): void {
    const user = new ResetDto();
    user.userName = this.userName;
    const dialogRef = this.dialog.open(DialogResetComponent,
      { width: '360px', data: user, }
    );
  }

  onLogoutClick(): void {
    this.router.navigate(['/security/login']);
    this.hostServ.logout().subscribe({
      next: res => {
        localStorage.removeItem(AUTH_KEY)
        this.router.navigate(['/security/login']);
      },
      error: err => {
        localStorage.removeItem(AUTH_KEY)
        this.router.navigate(['/security/login']);
      }
    })
  }

}
