import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login/login.component';
import {CoreModule} from "./core/core.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TarifaComponent } from './tarifa/tarifa.component';
import {CalendarModule} from 'primeng/calendar';
import * as $ from 'jquery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlantillaComponent } from './plantilla/plantilla.component';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TarifaComponent,
    PlantillaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
