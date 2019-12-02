import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Angular Modules
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MAterialModule } from "./material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

// Custom Modules
import { AppRoutingModule } from "./app-routing.module";

// Custom COmponents
import { AppComponent } from "./app.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { TainingComponent } from "./taining/taining.component";
import { CurrentTrainingComponent } from "./taining/current-training/current-training.component";
import { NewTrainingComponent } from "./taining/new-training/new-training.component";
import { PastTrainingComponent } from "./taining/past-training/past-training.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    NavbarComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
