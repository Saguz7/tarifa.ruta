export type Maybe<T> = T | null;
export namespace InsertTarjeton {
  export type Variables = {
    concesion: string;
    plantilla: string;
    solicitud: SolicitudInput;
    lineaCaptura: LineaCapturaInput;
    hojaValorada: HojaValoradaInput;
    token: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    InsertTarjeton: Maybe<InsertTarjeton>;
  };

  export type InsertTarjeton = {
    __typename?: "newTarjeton";

    descripcion: Maybe<string>;
    concesion: Maybe<string>;
    plantilla: Maybe<string>;
    solicitud: Maybe<SolicitudInput>;
    lineaCaptura: Maybe<LineaCapturaInput>;
    hojaValorada: Maybe<HojaValoradaInput>;
    token: string;


  };
}

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
import {HojaValoradaInput} from '../models/vo/hojavaloradainput';
import {LineaCapturaInput} from '../models/vo/lineacapturainput';
import {SolicitudInput} from '../models/vo/solicitudinput';

import gql from "graphql-tag";
@Injectable({
  providedIn: "root"
})
export class InsertTarjetonGQL extends Apollo.Mutation<
  InsertTarjeton.Mutation,
  InsertTarjeton.Variables
> {
  document: any = gql`
  mutation newTarjeton(
  $concesion: ID
  $plantilla: ID
  $solicitud: SolicitudInput
  $lineaCaptura: LineaCapturaInput
  $hojaValorada: HojaValoradaInput
  $token: String
) {
  crearTarjeton(
    concesion: $concesion
    plantilla: $plantilla
    solicitud: $solicitud
    lineaCaptura: $lineaCaptura
    hojaValorada: $hojaValorada
    token: $token
  ) {
    id
    concesion {
      id
      acuerdo
      fechaAcuerdo
      fechaVencimiento
      fechaCaptura
      vigencia
      observaciones
      observacionesActa
      ruta
      fechaInicio
      unidadesAmparadas
      modalidad {
        id
        nombre
        descripcion
        estatus
        abreviatura
      }
      sitio {
        id
        nombre
        estatus
      }
      nuc
      estatus
      concesionario {
        id
        tipoPersona
        nombre
        primerApellido
        segundoApellido
        curp
        rfc
        razonSocial
        localidad {
          id
          nombre
          municipio {
            id
            nombre
          }
        }
      }
      condiciones {
        vigente
        bloqueado
      }
    }
    plantilla {
      id
      nombre
      descripcion
      localidad {
        id
        nombre
        municipio {
          id
          nombre
        }
      }
      modalidad {
        id
        nombre
        descripcion
        estatus
        abreviatura
      }
      periodico {
        id
        descripcion
        fechaPublicacion
        tomo
        numero
        estatus
        createdAt
      }
      estatus
      createdAt
    }
    solicitud {
      id
      folio
      fecha
      estatus
      createdAt
    }
    movimiento {
      id
      descripcion
      id_usuario
      descripcion_usuario
      centro_trabajo
      region
      estatus
      createdAt
    }
    lineaCaptura {
      id
      lineaCaptura
      folioPago
      totalAmparados
      fechaPago
      totalPago
      estatus
      createdAt
    }
    hojaValorada {
      id
      folio
      estatus
      createdAt
    }
    estatus
    createdAt
  }
}
  `;
}
