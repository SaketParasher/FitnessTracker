import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// importing enviornment
import { environment } from "../environments/environment";

// Angular Modules
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MAterialModule } from "./material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

// Custom Modules
import { AppRoutingModule } from "./app-routing.module";

// Custom Components
import { AppComponent } from "./app.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { TainingComponent } from "./taining/taining.component";
import { CurrentTrainingComponent } from "./taining/current-training/current-training.component";
import { NewTrainingComponent } from "./taining/new-training/new-training.component";
import { PastTrainingComponent } from "./taining/past-training/past-training.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavComponent } from "./navigation/sidenav/sidenav.component";

import { StopTrainingDialog } from "./taining/current-training/stop-training.component";

// Custom Services
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { TrainingService } from "./taining/training.service";

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
    SidenavComponent,
    StopTrainingDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MAterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, AuthGuard, TrainingService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingDialog]
})
export class AppModule {}
