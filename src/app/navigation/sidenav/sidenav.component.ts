import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Output()
  emitClose = new EventEmitter<any>();
  isAuthenticated: boolean = false;
  authSubscription: Subscription;

  constructor(private authSVC: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authSVC.emitAuthentication.subscribe(authData => this.isAuthenticated = authData);
  }

  onToggle() {
    this.emitClose.emit();
  }

  logout() {
    this.onToggle();
    this.authSVC.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
