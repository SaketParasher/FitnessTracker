import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authSVC: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, Router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> | UrlTree {

        let isAuthorized = this.authSVC.isAuth();
        if (isAuthorized) {
            return true;
        }
        return this.router.createUrlTree(['/login']);
    }

}