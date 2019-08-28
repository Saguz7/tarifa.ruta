import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {

  // private readonly URI1: string = 'http://tarifas.dt.gql.semovioaxaca.gob.mx/graphql';
  // private readonly URI2: string = 'http://servicios.ui.gql.semovioaxaca.gob.mx/graphql';
  // private readonly URI3: string = 'http://sicac.ui.gql.semovioaxaca.gob.mx/graphql';


  private readonly URI1: string = 'http://172.80.13.12:10009/graphql';
   private readonly URI2: string = 'http://172.80.13.12:10007/graphql';
   private readonly URI3: string = 'http://172.80.13.12:5000/graphql';
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const options1: any = { uri: this.URI1 };
    apollo.createDefault({
      link: httpLink.create(options1),
      cache: new InMemoryCache()
    });

    const options2: any = { uri: this.URI2 };
    apollo.createNamed('endpoint2', {
      link: httpLink.create(options2),
      cache: new InMemoryCache()
    });

    const options3: any = { uri: this.URI3 };
    apollo.createNamed('backsicac', {
      link: httpLink.create(options3),
      cache: new InMemoryCache()
    });
  }
}
