import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login/login.component';
import { CoreModule } from "./core/core.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TarifaComponent } from './tarifa/tarifa.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { PaymentsComponent } from './payments/payments.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';

import {CalendarModule} from 'primeng/calendar';
import * as $ from 'jquery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePlantillaComponent } from './createplantilla/createplantilla.component';
import { CreateDiarioOficialComponent } from './creatediariooficial/creatediariooficial.component';
import { OnlynumberDirective  } from './only-numeric.directive';
import { SpecialNumberAndDecimalDirective  } from './specialnumericdecimal.directive';

import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';


import { PaymentsModule } from 'semovi-payments';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TarifaComponent,
    PlantillaComponent,
    OnlynumberDirective,
    SpecialNumberAndDecimalDirective,
    CreatePlantillaComponent,
    CreateDiarioOficialComponent,
    PaymentsComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
