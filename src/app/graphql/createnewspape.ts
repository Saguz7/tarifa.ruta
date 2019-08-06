export type Maybe<T> = T | null;
export namespace InsertPeriodico {
  export type Variables = {
    descripcion: string;
    fecha_publicacion: Date;
    tomo: string;
    numero: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    InsertPeriodico: Maybe<InsertPeriodico>;
  };

  export type InsertPeriodico = {
    __typename?: "newPeriodico";

    descripcion: Maybe<string>;
    fecha_publicacion: Maybe<Date>;
    tomo: Maybe<string>;
    numero: Maybe<number>;


  };
}

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";
@Injectable({
  providedIn: "root"
})
export class InsertPeriodicoGQL extends Apollo.Mutation<
  InsertPeriodico.Mutation,
  InsertPeriodico.Variables
> {
  document: any = gql`
  mutation newPeriodico($descripcion:String,$fecha_publicacion:Date,$tomo:String,$numero:Int){
  crearPeriodico(descripcion:$descripcion,fecha_publicacion:$fecha_publicacion,tomo:$tomo,numero:$numero){
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
