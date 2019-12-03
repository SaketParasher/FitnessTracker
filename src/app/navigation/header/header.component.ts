import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;
  isAuthorised: boolean = false;
  @Output()
  emitToggle = new EventEmitter<any>();

  constructor(private authSVC: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authSVC.emitAuthentication.subscribe(authData => this.isAuthorised = authData);
  }

  onToggle() {
    this.emitToggle.emit();

  }
  logout() {
    this.authSVC.logout();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
