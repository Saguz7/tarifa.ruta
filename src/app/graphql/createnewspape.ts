export type Maybe<T> = T | null;
export namespace InsertPeriodico {
  export type Variables = {
    descripcion: string;
    fechaPublicacion: Date;
    tomo: string;
    numero: number;
    token: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    InsertPeriodico: Maybe<InsertPeriodico>;
  };

  export type InsertPeriodico = {
    __typename?: "newPeriodico";

    descripcion: Maybe<string>;
    fechaPublicacion: Maybe<Date>;
    tomo: Maybe<string>;
    numero: Maybe<number>;
    token: Maybe<string>;


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
  mutation newPeriodico($descripcion: String,$fechaPublicacion: Date,$tomo: String,$numero: Int,$token: String) {
  crearPeriodico(descripcion: $descripcion,fechaPublicacion: $fechaPublicacion,tomo: $tomo,numero: $numero,token: $token) {
    id,
    descripcion,
    fechaPublicacion,
    tomo,
    numero,
    estatus,
    createdAt
  }
}
  `;
}
