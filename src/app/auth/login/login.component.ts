import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authSVC: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl("", { validators: Validators.required })
    });
  }

  onLogin() {
    this.authSVC.login({ email: this.loginForm.value.email, password: this.loginForm.value.password });
    //(<FormControl>this.loginForm.controls("email")).errors('required')
  }
}
