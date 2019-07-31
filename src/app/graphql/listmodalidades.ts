import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Modalidad {
  id: number;
  nombre: string;
  descripcion: string;
  abreviatura: string;
}
export interface Response {
  modalidades: Modalidad[];
}


@Injectable({
  providedIn: 'root',
})
export class AllModalidadesGQL extends Query<Response> {
  document = gql`
  query listModalidades{
  modalidades{
    id,
    nombre,
    descripcion,
    abreviatura
  }
}
  `;
}
