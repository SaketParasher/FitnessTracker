import { Component, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "ClientPanel";
  openSideNav = false;

  @ViewChild('sidenav', { static: false })
  viewSideNav;

  closeSidebar() {
    this.viewSideNav.close();
  }
  toggleSidebar() {
    this.viewSideNav.toggle();
  }
}
