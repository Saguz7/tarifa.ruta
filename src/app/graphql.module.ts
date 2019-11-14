import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule { 
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const options1: any = { uri: environment.URITarifas };
    apollo.createDefault({
      link: httpLink.create(options1),
      cache: new InMemoryCache()
    });

    const options2: any = { uri: environment.URIServicios };
    apollo.createNamed('endpoint2', {
      link: httpLink.create(options2),
      cache: new InMemoryCache()
    });

    const options3: any = { uri: environment.URISicac };
    apollo.createNamed('backsicac', {
      link: httpLink.create(options3),
      cache: new InMemoryCache()
    });
  }
}
