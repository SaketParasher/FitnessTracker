import { Injectable } from "@angular/core";
import { AuthData } from "./AuthData.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    private user: User;
    emitAuthentication: Subject<boolean> = new Subject<boolean>();

    constructor(private router: Router) { }

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.onSucessAuth();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.onSucessAuth();
    }

    logout() {
        this.user = null;
        this.emitAuthentication.next(false);
        this.router.navigate(['/login'])
    }

    onSucessAuth() {
        this.emitAuthentication.next(true);
        this.router.navigate(['/training']);
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }
}