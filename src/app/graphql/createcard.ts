export type Maybe<T> = T | null;
export namespace InsertTarjeton {
  export type Variables = {
    descripcion: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    InsertTarjeton: Maybe<InsertTarjeton>;
  };

  export type InsertTarjeton = {
    __typename?: "newTarjeton";

    descripcion: Maybe<string>;


  };
}

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";
@Injectable({
  providedIn: "root"
})
export class InsertTarjetonGQL extends Apollo.Mutation<
  InsertTarjeton.Mutation,
  InsertTarjeton.Variables
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
