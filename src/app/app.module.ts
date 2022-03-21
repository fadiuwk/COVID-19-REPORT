import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ReportComponent } from './report/report.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProtectionComponent } from './protection/protection.component';
import { ServicesComponent } from './services/services.component'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ReportComponent,
    ContactsComponent,
    ProtectionComponent,
    ServicesComponent , 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule ,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
