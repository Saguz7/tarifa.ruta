 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { TarifaComponent } from './tarifa/tarifa.component';
import { PlantillaComponent } from './plantilla/plantilla.component';

import {AuthorizatedAfterLoginGuard} from "./core/guards/authorizatedafterlogin.guard";
import {AuthorizatedGuard} from "./core/guards/authorizated.guard";
import {AuthorizatedAdminGuard} from "./core/guards/authorizatedAdmin.guard";
import {AuthorizatedCreacionGuard} from "./core/guards/authorizedcreacion.guard";
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';

 const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [ AuthorizatedAfterLoginGuard ] },
  { path: 'tarifa', component: TarifaComponent, canActivate: [ AuthorizatedAdminGuard ]},
  { path: 'crearplantilla', component: PlantillaComponent, canActivate: [ AuthorizatedCreacionGuard ] },
  { path: 'resetpassword', component: ResetPasswordComponent, canActivate: [ AuthorizatedGuard ]},

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
