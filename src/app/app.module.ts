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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TarifaComponent,
    PlantillaComponent,
    OnlynumberDirective,
    SpecialNumberAndDecimalDirective,
    CreatePlantillaComponent,
    CreateDiarioOficialComponent
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
