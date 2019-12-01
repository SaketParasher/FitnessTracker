import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  maxDate = new Date();
  constructor() {}

  ngOnInit() {
    let currentDate = new Date();
    this.maxDate.setFullYear(currentDate.getFullYear() - 18);
  }

  onSignup(signupForm: NgForm) {
    console.log(signupForm);
  }
}
