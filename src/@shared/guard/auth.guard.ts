import { RoleType } from 'src/@shared/models/paging.model';
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AUTH_KEY, LoginRes } from "src/@security/auth.service";
import { NotifyService } from "../services/notify.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private notifySrv: NotifyService,
        private router: Router,) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return new Observable((observer) => {
            const json = localStorage.getItem(AUTH_KEY);
            if (json) {
                const res = JSON.parse(json) as LoginRes;
                const roles: RoleType[] = route.data["roles"]
                if (res && roles.findIndex(x => x == res.role) >= 0) {
                    observer.next(true);
                    observer.complete();
                    return;
                }
            }
            this.notifySrv.notify('权限不足', 'warning');
            observer.next(false);
            this.router.navigate([`/notfound/`]);
            observer.complete();
        });
    }

}