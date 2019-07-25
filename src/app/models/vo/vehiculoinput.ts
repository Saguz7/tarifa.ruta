export class VehiculoInput {
  serie: String;
  motor: String;
  repuve: String;
  cilindros: number;
  puertas: number;
  personas: number;
  anioModelo: number;
  marca: number;
  modelo: String;
  color: String;

    constructor(
      serie?: String,
      motor?: String,
      repuve?: String,
      cilindros?: number,
      puertas?: number,
      personas?: number,
      anioModelo?: number,
      marca?: number,
      modelo?: String,
      color?: String
    ) {}
}
