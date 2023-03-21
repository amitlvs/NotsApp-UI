import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent, HomeComponent, SendOtpComponent, DashboardComponent, VerifyOtpComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
