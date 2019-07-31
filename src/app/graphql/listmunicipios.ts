import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Municipio {
  id: number;
  nombre: string;
}
export interface Response {
  municipios: Municipio[];
}


@Injectable({
  providedIn: 'root',
})
export class AllMunicipiosGQL extends Query<Response> {
  document = gql`
  query listMunicipios{
municipios{
  id,
  nombre
}
}
  `;
}
