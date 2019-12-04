import { Injectable } from "@angular/core";
import { AuthData } from "./AuthData.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { TrainingService } from "../taining/training.service";

import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()
export class AuthService {
  private user: User;
  private isAuthenticated = false;
  emitAuthentication: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trSVC: TrainingService
  ) {}

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(success => {
        console.log("User Registered");
        console.log(success);
        this.onSucessAuth();
      })
      .catch(err => {
        console.log("Error while registering User");
        console.log(err);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(success => {
        console.log("User Logined");
        console.log(success);
        this.onSucessAuth();
      })
      .catch(err => {
        console.log("Error while Logging In User");
        console.log(err);
      });
  }

  logout() {
    this.trSVC.cancelAllSubscriptions();
    this.isAuthenticated = false;
    this.emitAuthentication.next(false);
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }

  onSucessAuth() {
    this.isAuthenticated = true;
    this.emitAuthentication.next(true);
    this.router.navigate(["/training"]);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
