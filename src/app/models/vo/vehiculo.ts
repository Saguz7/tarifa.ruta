export class Vehiculo {
    serie: String;
    n_motor: String;
    repuve: String;
    cilindros: number;
    puertas: number;
    personas: number;
    id_anio: number;
    id_tipo_vehiculo: number;
    id_marca: number;

    modelo: String;
    color: String;
    estatus: boolean;

    constructor(
      serie?: String,
      n_motor?: String,
      repuve?: String,
      cilindros?: number,
      puertas?: number,
      personas?: number,
      id_anio?: number,
      id_tipo_vehiculo?: number,
      id_marca?: number,
      modelo?: String,
      color?: String,
      estatus?: boolean
    ) {}
}
