/**
 * Created by xavi on 2/17/17.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Injectable()
export class AuthorizatedAfterLoginGuard implements CanActivate {

  constructor(private router: Router,
              private storageService: StorageService) { }

  canActivate() {



     if (this.storageService.isAuthenticated()) {
       if(this.storageService.isExpired()){
            this.storageService.logout();
            window.location.href = "/login";
         }
         window.location.href = "/tarifa";

        return false;
    }else{
    return true;
    }

    // not logged in so redirect to login page
    window.location.href = "/login";
    return false;
  }
}
