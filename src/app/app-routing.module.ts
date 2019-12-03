import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { TainingComponent } from "./taining/taining.component";
import { CurrentTrainingComponent } from "./taining/current-training/current-training.component";
import { NewTrainingComponent } from "./taining/new-training/new-training.component";
import { PastTrainingComponent } from "./taining/past-training/past-training.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "training", component: TainingComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
