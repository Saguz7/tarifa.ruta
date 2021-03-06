export type Maybe<T> = T | null;
export namespace InsertPlantilla {
  export type Variables = {
    plantilla: Plantilla;
    rutas: Array<Ruta>;
    token: string;

  };

  export type Mutation = {
    __typename?: "Mutation";
    InsertPlantilla: Maybe<InsertPlantilla>;
  };

  export type InsertPlantilla = {
    __typename?: "newPlantilla";
    plantilla: Maybe<Plantilla>;
    rutas: Maybe<Array<Ruta>>;
    token: Maybe<string>;
  };
}

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
import {Plantilla} from "../models/vo/plantilla";
import {Ruta} from "../models/vo/ruta";

import gql from "graphql-tag";
@Injectable({
  providedIn: "root"
})
export class InsertPlantillaGQL extends Apollo.Mutation<
  InsertPlantilla.Mutation,
  InsertPlantilla.Variables
> {
  document: any = gql`
  mutation newInt($plantilla:PlantillaInput,$rutas:[IntInput],$token:String){
  crearPlantillaRuta(plantilla:$plantilla,rutas:$rutas,token:$token){
    estatus,
    createdAt
  }
}
  `;
}
