import {NgModule, Optional, SkipSelf} from '@angular/core';
 import {StorageService} from "./services/storage.service";

import {AuthorizatedGuard} from "./guards/authorizated.guard";
import {AuthorizatedAdminGuard} from "./guards/authorizatedAdmin.guard";
import {AuthorizatedAfterLoginGuard} from "./guards/authorizatedafterlogin.guard";
import {AuthorizatedCreacionGuard} from "./guards/authorizedcreacion.guard";
import {ConvertNSService} from "./services/convertns.service";

@NgModule({
  declarations: [  ],
  imports: [],
  providers: [
    StorageService,
    AuthorizatedGuard,
    AuthorizatedAdminGuard,
    AuthorizatedAfterLoginGuard,
    AuthorizatedCreacionGuard,
    ConvertNSService
  ],
  bootstrap: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
