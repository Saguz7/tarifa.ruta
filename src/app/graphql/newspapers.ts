import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Periodico {
  id: number;
  descripcion: string;
  fecha_publicacion: string;
  tomo: string;
numero: number;
estatus:string;
createdAt:string;
}
export interface Response {
  periodicos: Periodico[];
}


@Injectable({
  providedIn: 'root',
})
export class AllPeriodicosGQL extends Query<Response> {
  document = gql`
  query listPeriodicos{
periodicos{
  id,
  descripcion,
  fecha_publicacion,
  tomo,
  numero,
  estatus,
  createdAt
}
}
  `;
}
