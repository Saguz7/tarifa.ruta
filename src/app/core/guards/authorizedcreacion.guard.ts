
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {StorageService} from "../services/storage.service";
 import {User} from "../../core/models/user.model";

@Injectable()
export class AuthorizatedCreacionGuard implements CanActivate {
  //Para conocer los datos del usuario
  public user: User;
  constructor(private router: Router,
              private storageService: StorageService) { }

  canActivate() {


     this.user = this.storageService.getCurrentUser();
     if (this.storageService.isAuthenticated() && this.storageService.getCurrentUser().id_rol == 3) {
      // logged in so return true
    //  this.router.navigate(['/permiso']);
    if(this.storageService.isExpired()){
         this.storageService.logout();
         window.location.href = "/login";
      }
      return true;

    }
    else{
      this.router.navigate(['/tarifa']);
     }
    // not logged in so redirect to login page
  //  this.router.navigate(['/']);
    return false;
  }
}
